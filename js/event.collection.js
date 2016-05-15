(function(window){
	'use strict'
	
	var events = {
		list: {},
		get: function(id) {
			return list.id;
		},
		add: function(eventObj) {
			var id = new Date.getTime();
			var obj = eventObj.event + '/' + eventObj.date + '/' + eventObj.names + '/' + eventObj.description;
			localStorage.setItem(id, obj);
			list.id = obj;
		},
		remove: function(id) {
			localStorage.removeItem(id);
		}
	};
	window.app = window.app || {};
	window.app.events = events;
})(window);