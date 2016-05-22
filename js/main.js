(function(window) {
    'use strict';

    var main = {
        init: function(template) {
            //this is our main template.
            //todo 1: check if we have saved events
            //todo 2: calculate current month and show as many cells as we have days and pass there saved events if we have any
            //todo 3: listen to a click on a cell and show addEvent dialog (same as in header)
            //todo 4: listen to arrows to toggle between months
            //todo 5: listen to 'today' button
			
			var assembled = this.assemble(template);
            var container = document.getElementById('container');
			container.appendChild(assembled);
        },
		
		// модель пока что здесь не нужна
		assemble: function(template) {
			var allMonthsEventsList = app.collection.checkEvents();
			var thisMonthEventsList = app.collection.getThisMonthEvents(allMonthsEventsList);
			alert(thisMonthEventsList.length);
			var arr = new Array(31);
			
			var docFrag = '';
			for(var i=0; i<arr.length; i++) {
				// Чтобы вставлять дни с событем и без в template, нужно написать отдельный метод для сборки объектов под шаблон.
				// Метод должен поставить:
				// число месяца
				// название дня недели, НО только для первой недели месяца
				// заполненные атрибуты события (event, date, names и/или desctiption)
				
				docFrag += _.template(template)({date: i+1});
			}
			
			var ol = document.createElement('ol');
			ol.innerHTML = docFrag;
			
			return ol;
			
			// thisMonthEventsList.forEach(function(e) {
				// var li = document.createElement("li");
				// li.textContent = e;
				// li.className = 'calendar-left-side calendar-list-item calendar-list-';
				// docFrag.appendChild(li);
			// });
			
		}
		
    };

    window.app = window.app || {};
    window.app.main = main;

})(window);