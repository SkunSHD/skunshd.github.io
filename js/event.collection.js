(function(window){
	'use strict'
	
	var collection = {
		list: {},
		
		get: function(id) {
			return this.list.id;
		},
		
		checkEvents: function(model) {
			// hear puted test array with Date key
			// this.putSomethingInLs(model);
			
			// var some = model.getAll();
			
			// for (var p = 0; p < some.length; p++) {
				// if(typeof some[p].key.getDate == 'function') alert(some);
			// }
			
			this.putSomethingInLs(model);
		},
				
		//This method need to do test array, as like from lS tooked
		putSomethingInLs: function(model) {
			var key = new Date().getTime();
		
			var value = '{ "events": [';
			for( var i = 0; i < 31; i++) {
				value += '{"event": "event test", "date": "' + new Date() + '", "names": "names test", "description": "description test"}';
				if(i != 30) value += ',';
			}
			value += ']}';
			
			var result = JSON.parse(value);
			alert(result.events[30].event);
			// model.save(key, value);
			// alert(model.getAll().length);
		},
		
		add: function(eventObj) {
			// var id = new Date;
			// var obj = eventObj.event + '/' + eventObj.date + '/' + eventObj.names + '/' + eventObj.description;
			// localStorage.setItem(id, obj);
			// this.list.id = obj;
		},
		
		remove: function(id) {
			// localStorage.removeItem(id);
		}
	};
	window.app = window.app || {};
	window.app.collection = collection;
})(window);