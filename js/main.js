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
			
			var assembled = this.assemble(template, model);
            var container = document.getElementById('container');
			container.appendChild(assembled);
        },
		
		assemble: function(template, model) {
			// todo 1: научить model.save() сохранять объекты model
			// todo 2: написать метод для создания template объектов из model объектов
			
			// тестовое собыьтие
			// model.save({ event: 'Title', date: new Date(), names: 'Cilka, Alex', description: 'opisanie sobitiya' });
			
			var allMonthsEventsList = app.collection.checkEvents(model);
			alert('allMonthsEventsList: ' + allMonthsEventsList.length);
			// alert('allMonthsEventsList: ' + allMonthsEventsList[0].value[22].event);
			
			var thisMonthEventsArray = app.collection.getThisMonthEvents(allMonthsEventsList);
			alert('match: ' + thisMonthEventsArray);
			
			var docFrag = '';
			for(var i=0; i<thisMonthEventsArray.length; i++) {
				// нужно сделать метод для сборки объектов, которые будут вставляться в шаблон
				// метод должен: вставлять название дня недели, НО только для первой недели месяца
				// заполнять атрибуты событий (event, date, names и/или desctiption)
				
				// if (thisMonthEventsArray[i]) assemble template object;
				docFrag += _.template(template)({date: i+1});
			}
			
			var ol = document.createElement('ol');
			ol.innerHTML = docFrag;
			
			return ol;	
		}
		
    };

    window.app = window.app || {};
    window.app.main = main;

})(window);