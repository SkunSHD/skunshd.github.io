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
			
			var assembled = this.assemble(model, template);
            var container = document.getElementById('container');
            // container.innerHTML = _.template(template)();
			container.innerHTML = assembled;
        },
		
		assemble: function(model, template) {
			var allMonthsEventsList = app.collection.checkEvents(model);
			var thisMonthEventsList = app.collection.getThisMonthEvents(allMonthsEventsList);
			
			var docFrag = document.createDocumentFragment();
			var ol = document.createElement('ol');
			thisMonthEventsList.forEach(function(e){
				var li = document.createElement("li");
				li.textContent = e;
				docFrag.appendChild(li);
			});
			
			ol.appendChild(docFrag);
			return ol;
		}
		
    };

    window.app = window.app || {};
    window.app.main = main;

})(window);