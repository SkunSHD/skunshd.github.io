(function (window) {
	'use strict'
	
	var subcalone = (function () {
		var cache = cache || {};
		
		var generateCalendar = function (year, month) {
			var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			var daysInMonths = [31, (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			var haveDays = true;
			var day = 1, i, j;
			var calendar = [];
			var postFirstDay = 1;

			var getStartDay = function () {
				var sd = new Date(year, month, day).getDay();
				sd == 0 ? sd = 6 : sd -= 1;
				return sd;
			};

			var startDay = getStartDay();
			var preFirstDay = getDateAgo(new Date(year, month, day), startDay).getDate();

			if (cache[year]) {
				if (cache[year][month]) {
					return cache[year][month];
				}
			} else {
				cache[year] = {};
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
			
			calendar = addDaysNames(calendar);

			cache[year][month] = {
				calendar: function () {
					return calendar.cloneNode(true)
				},
				label: months[month] + " " + year
			};
			return cache[year][month];
		};
		
		var addDaysNames = function (parNode) {
			var tagsName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sanday"];
			for (var i = 0; i < 7; i++) {
				parNode.children[i].textContent += ', ' + tagsName[i];
			}
			return parNode;
		};

		var getDateAgo =  function (date, days) {
			var dateCopy = new Date(date);
			dateCopy.setDate(dateCopy.getDate() - days);
			return dateCopy;
		};
		
		var createCalendar = function (year, month) {
			return generateCalendar(year, month);
		};
		
		return {
			createCalendar: createCalendar
		};
		
	})();
	
	window.app = window.app || {};
	window.app.subcalone = subcalone;
	
})(window);