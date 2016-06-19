(function (window) {
    'use strict';

    var calendar = {
        init: function () {
            this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            this.wrap = document.getElementById('content');
            this.todayBtn = document.getElementById('button-today');
            this.label = document.querySelector('.date-indicator');

            //cache to use it later without looking up again
            this.container = document.getElementById('container');

            this.registerEvents();
        },

        registerEvents: function() {
            //store reference to proper context
            var _self = this;

            this.wrap.querySelector('#button-previous').addEventListener('click', function () {
                _self.switchMonth(false);
            });
            this.wrap.querySelector('#button-next').addEventListener('click', function () {
                _self.switchMonth(true);
            });

            this.todayBtn.addEventListener('click', function () {
                _self.switchMonth(null, new Date().getMonth(), new Date().getFullYear());
            });

            //show today by default
            _self.switchMonth(null, new Date().getMonth(), new Date().getFullYear());

            this.label.addEventListener('click', function () {
                _self.switchMonthsList(null, _self.label.textContent.trim().split(" ")[1] || _self.label.textContent.trim(), 'label');
            });
        },

        switchMonth: function (next, month, year) {
            if (!month && !year && document.querySelector('.curr-months')) {
                this.switchMonthsList(next, null, 'arrow');
                return;
            } else if (!month && !year && document.querySelector('.curr-years')) {
                this.switchYearsList(next, null, 'arrow');
                return;
            }

            var curr = this.label.textContent.trim().split(" ");
            var tempYear = parseInt(curr[1], 10);
            var cal;

            if (!month && month != '0') {
                if (next) {
                    if (curr[0] === "December") {
                        month = 0;
                    } else {
                        month = this.months.indexOf(curr[0]) + 1;
                    }
                } else {
                    if (curr[0] === "January") {
                        month = 11;
                    } else {
                        month = this.months.indexOf(curr[0]) - 1;
                    }
                }
            }
            if (!year) {
                if (next && month === 0) {
                    year = tempYear + 1;
                } else if (!next && month === 11) {
                    year = tempYear - 1;
                } else {
                    year = tempYear;
                }
            }
            // create new calendar, delete old one, insert new one, insert label
            cal = this.generateCalendar(year, month);

            this.container.removeChild(this.wrap.querySelector('.curr-days') || this.wrap.querySelector('.curr-months') || this.wrap.querySelector('.curr-years'));
            this.container.appendChild(cal.calendar());
            this.label.textContent = cal.label;
        },

        generateCalendar: function (year, month) {
            var day = 1, i, j;
            var haveDays = true;
            var daysInMonths = [31, (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var calendar = [];
            var postFirstDay = 1;
            this.cache = {};

            var getStartDay = function () {
                var sd = new Date(year, month, day).getDay();
                sd == 0 ? sd = 6 : sd -= 1;
                return sd;
            };

            var startDay = getStartDay();
            var preFirstDay = this.getDateAgo(new Date(year, month, day), startDay).getDate();

            if (this.cache[year]) {
                if (this.cache[year][month]) {
                    return this.cache[year][month];
                }
            } else {
                this.cache[year] = {};
            }

            i = 0;
            while (haveDays) {
                calendar[i] = [];
                for (j = 0; j < 7; j++) {
                    if (i === 0) {
                        if (j < startDay) {
                            calendar[i][j] = preFirstDay++;
                        } else if (j === startDay) {
                            calendar[i][j] = day++;
                            startDay++;
                        }
                    } else if (day <= daysInMonths[month]) {
                        calendar[i][j] = day++;
                    } else {
                        calendar[i][j] = postFirstDay++;
                        haveDays = false;
                    }
                    if (day > daysInMonths[month]) {
                        haveDays = false;
                    }
                }
                i++;
            }
            if (calendar[5]) {
                for (i = 0; i < calendar[5].length; i++) {
                    if (calendar[5][i] !== "") {
                        calendar[4][i] = "<span>" + calendar[4][i] + "</span><span>" + calendar[5][i] + "</span>";
                    }
                }
                calendar = calendar.slice(0, 5);
            }

            for (i = 0; i < calendar.length; i++) {
                calendar[i] = _.template(app.templates.li)({arr: calendar[i]});
            }

            calendar = '<ol class="curr-days">' + calendar.join("") + "</ol>";
            var tempWrap = document.createElement('div');
            tempWrap.innerHTML = calendar;
            calendar = tempWrap.firstChild;

            // adding class 'nil' to empty li elements and 'today' for today day
            for (i = 0; i < calendar.childNodes.length; i++) {
                if (calendar.children[i].textContent == '') {
                    calendar.children[i].className += ' nil';
                }
                if (calendar.children[i].textContent === new Date().getDate().toString()) {
                    calendar.children[i].className += ' today';
                }
            }

            calendar = this.addDaysNames(calendar);

            this.cache[year][month] = { calendar: function () {
                return calendar.cloneNode(true)
            }, label: this.months[month] + " " + year };
            return this.cache[year][month];
        },

        addDaysNames: function (parNode) {
            var tagsName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sanday"];
            for (var i = 0; i < 7; i++) {
                parNode.children[i].textContent += ', ' + tagsName[i];
            }
            return parNode;
        },

        getDateAgo: function (date, days) {
            var dateCopy = new Date(date);
            dateCopy.setDate(dateCopy.getDate() - days);
            return dateCopy;
        },

        switchMonthsList: function (next, year, context) {
            if (document.querySelector('.curr-years') && context == 'label') {
                return;
            } else if (document.querySelector('.curr-months') && context == 'label') {
                this.switchYearsList(null, year);
                return;
            }

            var tempYear = parseInt(this.label.textContent.trim(), 10), monthsList;

            if (!year) {
                if (next) {
                    year = tempYear + 1;
                } else if (!next) {
                    year = tempYear - 1;
                }
            }

            monthsList = this.createMonthsList();

            var tempEl = document.querySelector('.curr-days') || document.querySelector('.curr-months') || document.querySelector('.curr-years');
            tempEl.parentNode.replaceChild(monthsList.monthsList(), tempEl);

            this.label.textContent = year;

            var addedMonthsList = document.querySelector('.curr-months');
            addedMonthsList.addEventListener('click', this.monthsHandler.bind(this), false);
        },

        monthsHandler: function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            this.switchMonth(null, this.months.indexOf(target.textContent), this.label.textContent.trim());
        },

        createMonthsList: function () {
            this.cache = {};
            var year = this.label.textContent.trim().split(' ')[1], curr, resMonList, tempEl;

            if (this.cache['months-list']) {
                return this.cache['months-list'];
            } else {
                this.cache['months-list'] = {};
            }

            resMonList = _.template(app.templates.monthLi)({arr: this.months});
            resMonList = '<ol class="curr-months">' + resMonList + '</ol>';
            tempEl = document.createElement('div');
            tempEl.innerHTML = resMonList;
            resMonList = tempEl.firstChild;
            resMonList = resMonList.cloneNode(true);

            this.cache['months-list'] = { monthsList: function () {
                return resMonList
            } };
            return this.cache['months-list'];
        },

        switchYearsList: function (next, year, context) {
            if (!year) {
                var tempYear = this.label.textContent.split(' - ')[0];
                tempYear = +tempYear + 6;
                if (next) {
                    year = tempYear + 12;
                } else {
                    year = tempYear - 12;
                }
            }
            var start = +year - 6, end = +year + 5;

            var yearsList = this.createYearsList(year);

            var tempEl = document.querySelector('.curr-days') || document.querySelector('.curr-months') || document.querySelector('.curr-years');
            tempEl.parentNode.replaceChild(yearsList.yearsList(), tempEl);

            this.label.textContent = start + ' - ' + end;

            var addedYearsist = document.querySelector('.curr-years');
            addedYearsist.addEventListener('click', this.yearsHandler.bind(this), false);
        },

        yearsHandler: function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            this.switchMonthsList(null, target.textContent);
        },

        createYearsList: function (year) {
            this.cache = {};

            if (this.cache[year]) {
                return this.cache[year];
            } else {
                this.cache[year] = {};
            }

            var resYearsList = new Array(12), start, i;
            start = year - 6;

            for (i = 0; i < resYearsList.length; i++) resYearsList[i] = start + i;

            resYearsList = _.template(app.templates.monthLi)({arr: resYearsList});

            resYearsList = '<ol class="curr-years">' + resYearsList + '</ol>';
            var tempEl = document.createElement('div');
            tempEl.innerHTML = resYearsList;
            resYearsList = tempEl.firstChild;
            resYearsList = resYearsList.cloneNode(true);

            this.cache[year] = { yearsList: function () {
                return resYearsList
            } };
            return this.cache[year];
        }
    };

    var calendar_api = {
        init: calendar.init.bind(calendar)
    };

    window.app = window.app || {};
    window.app.calendar = calendar_api;

})(window);