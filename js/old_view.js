(function (window) {
	'use strict';

	function View(template) {
	
	}
		
	View.prototype.showTable = function () {
		// Methods.closePopupWindow();

		var monthOutLS = localStorage.getItem('month');
		
		var calendarElem = document.getElementById('calendar');

		if (calendarElem.firstChild && calendarElem.firstChild.tagName == 'DIV') calendarElem.firstChild.remove();
		
		// date out localStorage
		var d = window.app.Store.getLocalDateObj();

		//current date
		var today = new Date();

		var tagsName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sanday"];
		// var table = '<col> <col> <col> <col> <col> <col> <col>';
		var table = template.defaultTemplate;

		// for count days in first line(with day name)
		var dayFlag = 0;

		// filling first line with previous month days
		// -> 29 30 31 <- | 1  2  3  4
		var firstDateInTable = daysAgo(d, getDayName(d));
		for (var i = 0; i < getDayName(d); i++) {
			// table += '<td class="pre-post" id="' + firstDateInTable + '">' + tagsName[i] + ', <span>' + firstDateInTable++ + '</span></td>';
			var templateAnotherMonth = template.anotherMonth;
			var data = {
				id : firstDateInTable,
				tagName : tagsName[i],
				day : firstDateInTable++
			}
			var compiled = _.template(templateAnotherMonth);
			table += compiled(data);
			dayFlag++;
		}
		
		// filling main table
		while (d.getMonth() == monthOutLS) {
			// days with notes
			if (window.app.storage.getData(d)) {
			
				var allInfo = window.app.storage.getData(d);
				var arrInfo = allInfo.split('/');
				var event, names, description, heighlichtClass, heuteTag = '';

				event = window.app.Methods.textCut(arrInfo[0]);
				names = window.app.Methods.textCut(arrInfo[1]);
				description = window.app.Methods.textCut(arrInfo[2]);

				// heightlicht today check
				window.app.Methods.formatDate(d) == window.app.Methods.formatDate(today) ? heighlichtClass = 'today' : heighlichtClass = 'td-with-note';
				// first week check and add week names
				if (dayFlag < 7) {
					heuteTag = tagsName[getDayName(d)] + ', ';
					dayFlag++;
				}

				// table += '<td class="' + heighlichtClass + '" id="' + window.app.Methods.formatDate(d) + '">' + heuteTag + d.getDate() + '<div id="event-container">' +
					// '<h5>' + event + '</h5>' + '<p class="event-names">' + names + '</p>' + '<p class="event-description">' + description + '</p>' + '</div>' + '</td>';
				var monthWithEventTemplate = template.thisMonth;
				var compile = _.template(monthWithEventTemplate);
		
				var data = {
					className : heighlichtClass,
					id : window.app.Methods.formatDate(d),
					day : heuteTag + d.getDate(),
					event : event,
					names : names,
					description : description
				}
				
				table += compile(data);
				// days without notes
			} else {
				// window.app.Methods.formatDate(d) == window.app.Methods.formatDate(today) ? heighlichtClass = 'class ="today"' : heighlichtClass = '';
				window.app.Methods.formatDate(d) == window.app.Methods.formatDate(today) ? heighlichtClass = 'today' : heighlichtClass = '';
				// first week check and add week names
				heuteTag = '';
				if (dayFlag < 7) {
					heuteTag = tagsName[getDayName(d)] + ', ';
					dayFlag++;
				}
				// table += '<td id="' + window.app.Methods.formatDate(d) + '" ' + heighlichtClass + '>' + heuteTag + d.getDate() + '</td>';
				var justMonthTemplate = template.justMonthTemplate;
				var compile = _.template(justMonthTemplate);
				var data = {
					className : heighlichtClass,
					id : window.app.Methods.formatDate(d),
					day : heuteTag + d.getDate()
				}
				table += compile(data);
			}

			if (getDayName(d) % 7 == 6) { // Sonntag is last day - go in next line
				// table += '</tr><tr>';
				table += template.nextLine;
			}
			d.setDate(d.getDate() + 1);
		}

		// add next week days
		if (getDayName(d) != 0) {
			for (var i = getDayName(d), k = 1; i < 7; i++, k++) {
				// table += '<td class="pre-post" id="' + k + '"><span>' + k + '</span></td>';
				var compiled = _.template(template.anotherMonth);
				table += compiled( {id: k, tagName: '', day: k});
			}
		}
		// get day name: 0(Montag) bis 6(Sonntag)
		function getDayName(date) {
			if (date > 0) {
				var day = date.getDay();
				if (day == 0) day = 7;
				return day - 1;
			}
		}

		// close table
		// table += '</tr>';
		table += template.endTable;
		
		var tableElem = document.createElement('table');
		tableElem.innerHTML = table;

		// put table in div
		if (calendarElem.firstElementChild) {
			calendarElem.replaceChild(tableElem, calendarElem.firstChild);
		} else {
			calendarElem.appendChild(tableElem);
		}
		// Days ago
		function daysAgo(date, days) {
			var dateCopy = new Date(date);
			dateCopy.setDate(date.getDate() - days);
			return dateCopy.getDate();
		}
	
		// add opportunity to select cells
		// new SelectedCell();
	}
	<!-- END OF CALLENDAR METHOD-->
	/*
	
	this.nextMonthOrYear = function () {
		if (document.querySelector('.table')) {
			var month = parseInt(localStorage.getItem('month'));

			month += 1;
			if (month == 11) {
				month = 0;
				plusYear();
			}

			var monthStr = month.toString();
			localStorage.setItem('month', month);
		}

		function plusYear(num) {
			var year = parseInt(localStorage.getItem('year'));
			if (num) year += num;
			else year += 1;
			localStorage.setItem('year', year);
		}

		if (document.querySelector('.table')) this.createCalendar();
		if (document.querySelector('.calendar-list-month')) plusYear();
		if (document.querySelector('.calendar-list-year')) {
			plusYear(12);
			new MonthYearView().showYearList();
		}
		window.app.ShowDateMethods.showDate();
	}

	this.previousMonthOrYear = function () {
		if (document.querySelector('.table')) {
			var month = parseInt(localStorage.getItem('month'));

			month -= 1;
			if (month == -1) {
				month = 11;
				minusYear();
			}

			var monthStr = month.toString();
			localStorage.setItem('month', month);
		}

		function minusYear(num) {
			var year = parseInt(localStorage.getItem('year'));
			if (num) year -= num;
			else year -= 1;
			localStorage.setItem('year', year);
		}

		if (document.querySelector('.table')) this.createCalendar();
		if (document.querySelector('.calendar-list-month')) minusYear();
		if (document.querySelector('.calendar-list-year')) {
			minusYear(12);
			new MonthYearView().showYearList();
		}
		window.app.ShowDateMethods.showDate();
	}
	}
	*/
		
	// <!-- VIEW OBJECT CLOSED-->
	
	window.app = window.app || {};
	window.app.View = View;
})(window);