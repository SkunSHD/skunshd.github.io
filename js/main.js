(function(window) {
    'use strict';

    var main = {
		
		newCal: function() {
			var wrap, label, todayBtn, monthsList, tempEl,
			months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
	 
			function init(newWrap) { 
				wrap = document.getElementById('content');
				todayBtn = document.getElementById('button-today');
				label = document.querySelector('.date-indicator');
				
				wrap.querySelector("#button-previous").addEventListener('click', function () { switchMonth(false); }); 
				wrap.querySelector("#button-next").addEventListener('click', function () { switchMonth(true);  }); 
	
				todayBtn.addEventListener('click', function () { switchMonth(null, new Date().getMonth(), new Date().getFullYear()); } ); 
				todayBtn.click();

				label.addEventListener('click', function () { switchMonthsList(null, label.textContent.trim().split(" ")[1] || label.textContent.trim(), 'label'); } ); 
			}
			
			function switchMonth(next, month, year) {

				if (!month && !year && document.querySelector('.curr-months')) {
					switchMonthsList(next, null, 'arrow');
					return;
				} else if (!month && !year && document.querySelector('.curr-years')) {
					switchYearsList(next, null, 'arrow');
					return;
				}
				
				var curr = label.textContent.trim().split(" "), calendar, tempYear;
				if (curr[1]) {
					tempYear =  parseInt(curr[1], 10);
				} else if (curr[0]) {
					tempYear =  parseInt(curr, 10);
				}
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
				calendar =  createCal(year, month); 
				
				wrap.children[1].removeChild(wrap.querySelector('.curr-days') || wrap.querySelector('.curr-months') || document.querySelector('.curr-years'));
				document.getElementById('container').appendChild(calendar.calendar());
						
				label.textContent = calendar.label;
			} 
			
	 
			function createCal(year, month) {
				var day = 1, i, j, haveDays = true,  
				daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], 
				calendar = [],
				startDay = new Date(year, month, day).getDay();
				
				// mon==0 ... san==6
				if (startDay == 0) startDay = 6;
				else startDay -= 1;

				if (createCal.cache[year]) {
					if (createCal.cache[year][month]) {
						return createCal.cache[year][month]; 
					}
				} else {
					createCal.cache[year] = {}; 
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
				for (i = 0; i < calendar.length; i++) {
					calendar[i] = _.template(app.templates.li)({arr: calendar[i]});
				}
				
				calendar = '<ol class="curr-days">' + calendar.join("") + '</ol>';
				var tempWrap= document.createElement('div');
				tempWrap.innerHTML = calendar;
				calendar = tempWrap.firstChild;
				
				// adding class 'nil' to empty li elements and 'today' for today day
				for (i=0; i<calendar.childNodes.length; i++) {
					if (calendar.children[i].textContent == '') {
						calendar.children[i].className += ' nil';
					}
					if (calendar.children[i].textContent === new Date().getDate().toString()) {
						calendar.children[i].className += ' today';
					}
				}
				
				createCal.cache[year][month] = { calendar : function () { return calendar.cloneNode(true) }, label : months[month] + " " + year }; 
				return createCal.cache[year][month];
			}
			
			createCal.cache = {};
			
			function switchMonthsList(next, year, context) {
				if (document.querySelector('.curr-months') && context == 'label') {
					switchYearsList(null, year);
					return;
				}
				
				var tempYear = parseInt(label.textContent.trim(), 10);

				if (!year) {
					if (next) {
						year = tempYear + 1; 
					} else if (!next) {
						year = tempYear - 1; 
					}
				}
				
				if (!document.querySelector('.curr-months')) monthsList = createMonthsList();
			
				tempEl = document.querySelector('.curr-days') || document.querySelector('.curr-months') || document.querySelector('.curr-years');
				tempEl.parentNode.replaceChild(monthsList.monthsList(), tempEl);
				
				label.textContent = year;
				
				var addedMonthsList = document.querySelector('.curr-months');
				addedMonthsList.addEventListener('click', monthsHandler, false);
			}
			
			function monthsHandler(e) {
				event = event || window.event;
				var target = event.target || event.srcElement;
				switchMonth(null, months.indexOf(target.textContent), label.textContent.trim());
			}
			
			function createMonthsList() {
				var curr, year = label.textContent.trim().split(' ')[1], resMonList;

				if (createMonthsList.cache['months-list']) {
					return createMonthsList.cache['months-list']; 
				} else {
					createMonthsList.cache['months-list'] = {}; 
				}
				
				resMonList = _.template(app.templates.monthLi)({arr: months});
				resMonList = '<ol class="curr-months">' + resMonList + '</ol>';
				tempEl = document.createElement('div');
				tempEl.innerHTML = resMonList;
				resMonList = tempEl.firstChild;
				resMonList = resMonList.cloneNode(true);
				
				createMonthsList.cache['months-list'] = { monthsList : function () { return resMonList } }; 
				return createMonthsList.cache['months-list'];
			}
			
			createMonthsList.cache = {};
			
			function switchYearsList(next, year, context) {
				if (!year) {
					var tempYear = label.textContent.split(' - ')[0];
					tempYear = +tempYear + 6;
					if (next) {
						year = tempYear + 12;
					} else {
						year = tempYear - 12;
					}
				}
				var start = +year-6, end = +year+5;
				
				var yearsList = createYearsList(year);
				
				tempEl = document.querySelector('.curr-days') || document.querySelector('.curr-months') || document.querySelector('.curr-years');
				tempEl.parentNode.replaceChild(yearsList.yearsList(), tempEl);
				
				label.textContent = start + ' - ' + end;
				
				var addedYearsist = document.querySelector('.curr-years');
				addedYearsist.addEventListener('click', yearsHandler, false);
			}
			
			function yearsHandler(e) {
				event = event || window.event;
				var target = event.target || event.srcElement;
				switchMonthsList(null, target.textContent);
			}
			
			function createYearsList(year) {
				if (createYearsList.cache[year]) {
					return createYearsList.cache[year];
				} else {
					createYearsList.cache[year] = {};
				}
				
				var resYearsList = new Array(12), start, i;
				start = year - 6;
				
				for (i=0; i<resYearsList.length; i++) resYearsList[i] = start + i;
				
				resYearsList = _.template(app.templates.monthLi)({arr: resYearsList});
				
				resYearsList = '<ol class="curr-years">' + resYearsList + '</ol>';
				tempEl = document.createElement('div');
				tempEl.innerHTML = resYearsList;
				resYearsList = tempEl.firstChild;
				resYearsList = resYearsList.cloneNode(true);
				
				createYearsList.cache[year] = { yearsList : function () { return resYearsList } }; 
				return createYearsList.cache[year];
			}
				
			createYearsList.cache = {};
	 
			
			
			return { 
				init : init, 
				switchMonth : switchMonth, 
				createCal   : createCal 
			}; 
		}
    };

    window.app = window.app || {};
    window.app.main = main;

})(window);