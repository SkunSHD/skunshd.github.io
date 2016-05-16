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
            var container = document.getElementById('container');
            container.innerHTML = _.template(template)();
			
			this.checkEvents();
        },
		
		assemble: function(dateObj) {
			
		},
		
		checkEvents: function(dateObj) {
			// once appeals by a key month in the lS and pulls all the events of the month
			// returns an array
			alert(app.Model.save);
		},
		
		monthCapacity: function(dateObj) {		
			var result = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
			return result.getDate();
		}
    };

    window.app = window.app || {};
    window.app.main = main;

})(window);