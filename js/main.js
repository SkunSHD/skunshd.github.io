(function(window) {
    'use strict';

    var main = {
        init: function(model) {
			this.model = model;
            var container = document.getElementById('container');
			var assembled = this.assemble(model);
			this.addListeners(assembled);
			container.appendChild(assembled);
        },
		
		assemble: function(model) {
			var template = app.templates.main;
			var eventTmp = app.templates.event;
			var allMonthsEventsList = app.collection.checkEvents(model);
			var thisMonthEventsArray = app.collection.getThisMonthEvents(allMonthsEventsList);

			var docFrag = '';
			
			// Adding pre days
			var counter = this.preMonthDays();
			while (counter.preCheck()) {
				var preDate = counter.getPreDate();
				docFrag += _.template(template)({id: '', title: '', date: preDate, names: '', description: ''});
			}
			
			// Adding cells with date
			var getId = counter.getDayId();
			for(var i=0; i<thisMonthEventsArray.length; i++) {
				docFrag += _.template(template)({id: getId(), title: '', date: i+1, names: '', description: ''});
			}
			
			// Adding post days
			counter.doPostDate();
			while(counter.endCheck()) {
				var postDate = counter.getPostDate();
				docFrag += _.template(template)({id: '', title: '', date: postDate, names: '', description: ''});
			}
			
			var ol = document.createElement('ol');
			ol.innerHTML = docFrag;		
			
			// Days name adding here
			if (ol.childNodes.length) {
				var day = [', Monday', ', Tuesday', ', Wednsday', ', Thursday', ', Friday', ', Saturday', ', Sunday' ];
				for (var i = 0; i < 7; i++) {
					ol.children[i].textContent = ol.children[i].textContent + day[i];
				}
			}

			// Adding events
			for (var i=0; i<ol.childNodes.length; i++) {
				if (ol.childNodes[i].id) {
					
					for (var j=0; j<thisMonthEventsArray.length; j++) {
						if (thisMonthEventsArray[j] && ol.childNodes[i].id == thisMonthEventsArray[j].id) {
							ol.children[i].innerHTML = ol.children[i].textContent + _.template(eventTmp)(thisMonthEventsArray[j].getTplObj());
						}
					}		
					
				};
			}
			
			return ol;	
		},
		
		addListeners: function (node) {
			// 'today' button
			var todayBtn = document.getElementById('button-today');
			todayBtn.addEventListener('click', this.goToday, false);
			
			// arrows
			var rightArrowBtn = document.getElementById('button-next');
			rightArrowBtn.addEventListener('click', this.goNextMonth.bind(this), false);

			var leftArrowBtn = document.getElementById('button-previous');
			leftArrowBtn.addEventListener('click', this.goPreviousMonth, false);		
			
			// cells
			var next = node.firstChild;
			var that = this;
			for (var i=0; i<node.childNodes.length; i++) {
				if (next == '[object HTMLLIElement]') {
					next.addEventListener('click', function(event) {that.showPopup(event)}, false);
				}
				next = next.nextSibling; 
			}
		},
		
		goToday: function() {
			alert('today');
		},
		
		goNextMonth: function() {
			// after first click: one time popped up 'next month'
			// after second click: two times popped up 'next month'
			// after third click: four times popped up 'next month'
			// after fourth click: eight times popped up 'next month'
			// ...
			// don't anderstand why?
			this.init(this.model);
			alert('next month');
			
		},
		
		goPreviousMonth: function() {
			alert('previous month');
		},
		
		showPopup: function (event) {
			var view = new app.addEventView();
			view.showForm(event);
		},
		
		preMonthDays: function () {
			// Displays the month is in the ls. There it is written at initialization.
			var currentMonthMs = localStorage.getItem('current-month');
			var firstDateCurMonth = new Date(+currentMonthMs);
			alert(firstDateCurMonth);
			
			// Monday - 0 ... Sunday - 6
			var dayName = firstDateCurMonth.getDay() - 1;
			if (dayName == -1) dayName = 6;
			
			var firstDateInTable = new Date(firstDateCurMonth);
			firstDateInTable.setDate(firstDateInTable.getDate() - dayName);
			
			var counter = {
				firstDateCurMonth: firstDateCurMonth,
				lastDateCurMonth: 0,
				firstDateInTable: firstDateInTable,
				lastDateInTable: 0,
				datePointer: 0,
				
				preCheck: function() {
					if (this.firstDateCurMonth.getDate() == this.firstDateInTable.getDate()) {
						return false;
					}
					return true;
				},
				
				getPreDate: function() {
					this.datePointer = this.firstDateInTable.getDate();
					this.firstDateInTable.setDate(this.firstDateInTable.getDate() + 1);
					return this.datePointer;
				},
				
				getLastDate: function() {
					var lastDate = new Date(firstDateCurMonth);
					lastDate.setMonth(lastDate.getMonth() + 1);
					lastDate.setDate(0);
					return lastDate;
				},
				
				getPostDate: function() {
					this.lastDateCurMonth.setDate( this.lastDateCurMonth.getDate() + 1);
					return this.lastDateCurMonth.getDate();
				},
				
				doPostDate: function() {
					// get date object of last day in month
					this.lastDateCurMonth = this.getLastDate();
					
					// figure out date name of week
					var dayName = this.lastDateCurMonth.getDay() - 1;
					if (dayName == -1) dayName = 6;

					// get date object of last day in table
					this.lastDateInTable = new Date(this.lastDateCurMonth);
					this.lastDateInTable.setDate(this.lastDateCurMonth.getDate() + (6 - dayName));
				},
				
				endCheck: function() {
					if (this.lastDateCurMonth.getDate() == this.lastDateInTable.getDate()) {
						return false;
					}
					return true;
				},
				
				getDayId: function() {
					var curDate = new Date(firstDateCurMonth);
					curDate.setHours(0,0,0,0);
					return function() {
						var curId = curDate.getTime();
						curDate.setDate(curDate.getDate() +1);
						return curId;
					}
				},
				
			};
			
			return counter;
		}
    };

    window.app = window.app || {};
    window.app.main = main;

})(window);