(function(window) {
    'use strict';

    var main = {
		
		newCal: function() {
			var wrap, label, todayBtn,
			months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
	 
			function init(newWrap) { 
				wrap = document.getElementById('content');
				todayBtn = document.getElementById('button-today');
				label = document.querySelector('.date-indicator');
				
				wrap.querySelector("#button-previous").addEventListener('click', function () { switchMonth(false); }); 
				wrap.querySelector("#button-next").addEventListener('click', function () { switchMonth(true);  }); 
	
				todayBtn.addEventListener('click', function () { switchMonth(null, new Date().getMonth(), new Date().getFullYear()); } ); 
				todayBtn.click();
				
				label.addEventListener('click', function () { switchMonth(null, new Date().getMonth(), new Date().getFullYear()); } ); 
			} 
	 
			function switchMonth(next, month, year) {
				var curr = label.textContent.trim().split(" "), calendar, tempYear =  parseInt(curr[1], 10);
				if (!month) {
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
				
				var container = document.getElementById('container');
				container.removeChild(document.querySelector('.curr'));
				container.appendChild(calendar.calendar());
						
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
				
				createCal.cache[year][month] = { calendar : function () { return calendar.cloneNode(true) }, label : months[month] + " " + year }; 
				return createCal.cache[year][month];
				
			}
			
			createCal.cache = {};
			
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