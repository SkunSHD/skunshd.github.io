(function (window) {
    'use strict';
	
	var calendar = (function () {
		var generateCalendar = window.app.subcalone.createCalendar;
		
		var wrap, todayBtn, label, container, months, target, cache = cache || {};

		var init = function () {
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            wrap = document.getElementById('content');
            todayBtn = document.getElementById('button-today');
            label = document.querySelector('#date-indicator');

            //cache to use it later without looking up again
            container = document.getElementById('container');

            registerEvents();
        };
		
		var registerEvents = function() {

            wrap.querySelector('#button-previous').addEventListener('click', function () {
                switchMonth('prev');
            });
            wrap.querySelector('#button-next').addEventListener('click', function () {
                switchMonth('next');
            });

            todayBtn.addEventListener('click', function () {
                switchMonth('today');
            });

            //show today by default
            switchMonth('today');

            label.addEventListener('click', function () {
                switchMonthsList('label');
            });
        };
		
		var switchMonth = function (context) {
			var next, month, year;
			switch(context) {
				case 'next':
				next = true;
				break;
				case 'prev':
				next = false;
				break;
				case 'today':
				next = null;
				month = new Date().getMonth();
				year = new Date().getFullYear();
				break;
				case 'select month':
				next = null;
				month = months.indexOf(target.textContent);
				year = label.textContent.trim();
				break;
			}
			
            if (!month && !year && document.querySelector('.curr-months')) {
                switchMonthsList(context);
                return;
            } else if (!month && !year && document.querySelector('.curr-years')) {
                switchYearsList(next, null);
                return;
            }

            var curr = label.textContent.trim().split(" ");
            var tempYear = parseInt(curr[1], 10);
            var cal;

            if (!month && month != '0') {
                if (next) {
                    if (curr[0] === "December") {
                        month = 0;
                    } else {
                        month = months.indexOf(curr[0]) + 1;
                    }
                } else {
                    if (curr[0] === "January") {
                        month = 11;
                    } else {
                        month = months.indexOf(curr[0]) - 1;
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
            cal = generateCalendar(year, month);

            container.removeChild(wrap.querySelector('.curr-days') || wrap.querySelector('.curr-months') || wrap.querySelector('.curr-years'));
            container.appendChild(cal.calendar());
            label.textContent = cal.label;
        };
		
		var switchMonthsList = function (context) {
			var year, tempYear, monthsList, next;
			switch (context) {
				case 'label':
				year = label.textContent.trim().split(" ")[1] || label.textContent.trim();
				break;
				case 'select year':
				year = target.textContent;
				break;
				case 'next':
				next = true;
				break;
				case 'prev':
				next = false;
				break;
			};
			
            if (document.querySelector('.curr-years') && context == 'label') {
                return;
            } else if (document.querySelector('.curr-months') && context == 'label') {
                switchYearsList(null, year);
                return;
            }

            tempYear = parseInt(label.textContent.trim(), 10);

            if (!year) {
                if (next) {
                    year = tempYear + 1;
                } else if (!next) {
                    year = tempYear - 1;
                }
            }

            monthsList = createMonthsList();

            var tempEl = document.querySelector('.curr-days') || document.querySelector('.curr-months') || document.querySelector('.curr-years');
            tempEl.parentNode.replaceChild(monthsList.monthsList(), tempEl);

            label.textContent = year;

            var addedMonthsList = document.querySelector('.curr-months');
            addedMonthsList.addEventListener('click', monthsHandler, false);
        };

        var monthsHandler = function (event) {
            event = event || window.event;
            target = event.target || event.srcElement;
            switchMonth('select month');
        };

        var createMonthsList = function () {
            var year = label.textContent.trim().split(' ')[1], curr, resMonList, tempEl;

            if (cache['months-list']) {
                return cache['months-list'];
            } else {
                cache['months-list'] = {};
            }

            resMonList = _.template(app.templates.monthLi)({arr: months});
            resMonList = '<ol class="curr-months">' + resMonList + '</ol>';
            tempEl = document.createElement('div');
            tempEl.innerHTML = resMonList;
            resMonList = tempEl.firstChild;
            resMonList = resMonList.cloneNode(true);

            cache['months-list'] = { monthsList: function () {
                return resMonList
            } };
            return cache['months-list'];
        };
		
		var switchYearsList = function (next, year) {
            if (!year) {
                var tempYear = label.textContent.split(' - ')[0];
                tempYear = +tempYear + 6;
                if (next) {
                    year = tempYear + 12;
                } else {
                    year = tempYear - 12;
                }
            }
            var start = +year - 6, end = +year + 5;

            var yearsList = createYearsList(year);

            var tempEl = document.querySelector('.curr-days') || document.querySelector('.curr-months') || document.querySelector('.curr-years');
            tempEl.parentNode.replaceChild(yearsList.yearsList(), tempEl);

            label.textContent = start + ' - ' + end;

            var addedYearsist = document.querySelector('.curr-years');
            addedYearsist.addEventListener('click', yearsHandler, false);
        };

        var yearsHandler = function (event) {
            event = event || window.event;
            target = event.target || event.srcElement;
            switchMonthsList('select year');
        };

        var createYearsList = function (year) {
            cache['years-list'] = cache['years-list'] || {};

            if (cache['years-list'][year]) {
                return cache['years-list'][year];
            } else {
                cache['years-list'][year] = {};
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

            cache['years-list'][year] = { yearsList: function () {
                return resYearsList
            } };
            return cache['years-list'][year];
        };

		return {
			init: init
		};

	})();

    window.app = window.app || {};
    window.app.calendar = calendar;

})(window);	