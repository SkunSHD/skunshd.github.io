(function(window) {
    'use strict';

    var main = {
        init: function(template, model) {
            //this is our main template.
            //todo 1: check if we have saved events
            //todo 2: calculate current month and show as many cells as we have days and pass there saved events if we have any
            //todo 3: listen to a click on a cell and show addEvent dialog (same as in header)
            //todo 4: listen to arrows to toggle between months
            //todo 5: listen to 'today' button
			
<<<<<<< HEAD
=======
			var assembled = this.assemble(template, model);
>>>>>>> develop
            var container = document.getElementById('container');
			container.appendChild(assembled);
        },
		
<<<<<<< HEAD
		assemble: function(model) {
			var lsEvents = app.collection.checkEvents(model);
			
			
			// actions below are for the ls testing
			var submit = document.querySelector('.add-button');
			submit.addEventListener('click', formAction, false);
			
			function formAction() {
				var form = document.forms.popup;
				
				if(!form) return;
				var eventObj = {
					event: form.event.value,
					date: new Date(),
					names: form.names.value,
					description: form.description.value
				};
				
				model.save(eventObj);
			}
		}
		
=======
		assemble: function(template, model) {
			// todo 1: научить model.save() сохранять объекты model
			
			// тестовое собыьтие
			// model.save({ event: 'Title', date: new Date(), names: 'Cilka, Alex', description: 'opisanie sobitiya' });
			
			var allMonthsEventsList = app.collection.checkEvents(model);
			// alert('allMonthsEventsList: ' + allMonthsEventsList[0].value[22].event);
			
			var thisMonthEventsArray = app.collection.getThisMonthEvents(allMonthsEventsList);
			// alert('match: ' + thisMonthEventsArray);
			
			var docFrag = '';
			
			// Adding pre days
			var counter = this.preMonthDays();
			while (counter.preCheck()) {
				var preDate = counter.getPreDate();
				docFrag += _.template(template)({date: preDate, names: '', description: ''});
			}
			// Adding usual days
			for(var i=0; i<thisMonthEventsArray.length; i++) {
				// как вставить название дня недели ?
				if (thisMonthEventsArray[i]) {
					docFrag += _.template(template)(thisMonthEventsArray[i].getTplObj());
				} else {
					// как избавиться от указания пустых свойств в объекте ниже ?
					docFrag += _.template(template)({date: i+1, names: '', description: ''});
				}
			}
			// Adding post days
			counter.doPostDate();
			while(counter.endCheck()) {
				var postDate = counter.getPostDate();
				// alert(postDate);
				docFrag += _.template(template)({date: postDate, names: '', description: ''});
			}
			
			var ol = document.createElement('ol');
			ol.innerHTML = docFrag;
			
			return ol;	
		},
		
		preMonthDays: function () {
			// Displays the month is in the ls. There it is written at initialization.
			var currentMonthMs = localStorage.getItem('current-month');
			var firstDateCurMonth = new Date(+currentMonthMs);
			
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
					// получить объект даты последнего дня месяца
					this.lastDateCurMonth = this.getLastDate();
					
					// узнать её номер дня недели
					var dayName = this.lastDateCurMonth.getDay() - 1;
					if (dayName == -1) dayName = 6;

					// сделать объект, последнего по порядку, дня в календаре(для мая - это 5 июня)
					this.lastDateInTable = new Date(this.lastDateCurMonth);
					this.lastDateInTable.setDate(this.lastDateCurMonth.getDate() + (6 - dayName));
				},
				
				endCheck: function() {
					if (this.lastDateCurMonth.getDate() == this.lastDateInTable.getDate()) {
						return false;
					}
					return true;
				}
			};
			
			return counter;
		}

>>>>>>> develop
    };

    window.app = window.app || {};
    window.app.main = main;

})(window);