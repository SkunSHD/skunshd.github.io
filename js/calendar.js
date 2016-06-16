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
            this.todayBtn.click();

            this.label.addEventListener('click', function () {
                _self.switchMonth(null, new Date().getMonth(), new Date().getFullYear());
            });
        },

        switchMonth: function (next, month, year) {
            var curr = this.label.textContent.trim().split(" ");
            var tempYear = parseInt(curr[1], 10);
            var cal;

            if (!month) {
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

            this.container.removeChild(document.querySelector('.curr'));
            this.container.appendChild(cal.calendar());
            this.label.textContent = cal.label;
        },

        generateCalendar: function(year, month) {
            var day = 1, i, j;
            var haveDays = true;
            var daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var calendar = [];
            var startDay = new Date(year, month, day).getDay();
            this.cache = {};

            // mon==0 ... san==6
            if (startDay == 0) startDay = 6;
            else startDay -= 1;
    
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
                        if (j === startDay) {
                            calendar[i][j] = day++;
                            startDay++;
                        }
                    } else if (day <= daysInMonths[month]) {
                        calendar[i][j] = day++;
                    } else {
                        calendar[i][j] = "";
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
            var tmpl = app.templates.li;
            for (i = 0; i < calendar.length; i++) {
                // calendar[i] = "<li class='calendar-left-side calendar-list-item'>" + calendar[i].join("</li><li class='calendar-left-side calendar-list-item'>") + "</li>"; 
                calendar[i] = _.template(tmpl)({arr: calendar[i]});
            }
    
            // calendar = $("<ol>" + calendar.join("") + "</ol>").addClass("curr"); 
            calendar = "<ol>" + calendar.join("") + "</ol>";
            var tempWrap= document.createElement('div');
            tempWrap.innerHTML = calendar;
            calendar = tempWrap.firstChild;
            calendar.className = "curr";
    
            // adding class 'nil' to empty li elements and 'today' for today day
            for (i=0; i<calendar.childNodes.length; i++) {
                if (calendar.children[i].textContent == '') {
                    calendar.children[i].className += ' nil';
                }
                if (calendar.children[i].textContent === new Date().getDate().toString()) {
                    calendar.children[i].className += ' today';
                }
            }

            this.cache[year][month] = { calendar : function () { return calendar.cloneNode(true) }, label : this.months[month] + " " + year };
            return this.cache[year][month];
    
        }
    };

    window.app = window.app || {};
    window.app.calendar = calendar;

})(window);