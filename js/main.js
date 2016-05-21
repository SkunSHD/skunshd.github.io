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
			
            var container = document.getElementById('container');
            container.innerHTML = _.template(template)();
			this.assemble(model);
        },
		
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
		
    };

    window.app = window.app || {};
    window.app.main = main;

})(window);