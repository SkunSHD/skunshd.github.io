(function(window){
	'use strict'
	
	var events = {
		get: function(id) {
			var result = window.app.Model.get(id);
			result = result.split('/');
			return {
				event: result[0],
				date: result[1],
				names: result[2],
				description: result[3]
			};
		},
		add: function(id, data) {
			window.app.Model.set(id, data.event + '/' + data.date + '/' + data.names + '/' + data.description);
		},
		remove: function(id) {
			window.app.Model.remove(id);
		}
	};
	
	window.app.events = event;
})(window);