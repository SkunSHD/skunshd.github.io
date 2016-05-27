(function(window){
	'use strict'
	
	var collection = {
		// list = [monthMS: [{event.model} , ...], ... ]
		list: [],
		
		checkEvents: function(model) {
			this.list = this.getAllEvents(model);
			return this.list;
		},
	
		getThisMonthEvents: function(array) {
			// alert(array.key);
			var ms = new Date().getTime();
			var key = this.makeMonthId(ms);
			for(var i=0; i<array.length; i++) {
				if (array[i].key == key) return array[i].value;
			}
			return [];
		},
		
		add: function() {
			
<<<<<<< HEAD
			// for (var p = 0; p < some.length; p++) {
				// if(typeof some[p].key.getDate == 'function') alert(some);
			// }
			
			// this.putSomethingInLs(model);]
			
			// model.save(new Date() );

		},
		
		add: function() {
			
		},
			
		//This method need to do test array, as like from lS tooked
		putSomethingInLs: function(model) {
			var key = new Date().getTime();
		
			// var value = '{ "events": [';
			// for( var i = 0; i < 31; i++) {
				// value += '{"event": "event test", "date": "' + new Date() + '", "names": "names test", "description": "description test"}';
				// if(i != 30) value += ',';
			// }
			// value += ']}';
			var array = {events: []};
			
			var result = JSON.parse(value);
			alert(result.events[30].event);
			// model.save(key, value);
			// alert(model.getAll().length);
		},
		
		remove: function(id) {
			// localStorage.removeItem(id);
=======
		},
		
		remove: function(id) {

		},
		
		makeMonthId: function (ms) {
			var lsId = new Date(ms);
			lsId.setDate(1);
			lsId.setHours(0, 0, 0, 0);
			lsId = lsId.getTime();
			return lsId;
		},
		
		getAllEvents: function (model) {
			var result = [];
			//  lsArr = [ ms: [{event: '', date: ''}, ...], ms: [{},{}], ... ] 
			var lsArr = app.storage.getAllData();
			for (var i = 0; i<lsArr.length; i++) {
				var monthMS = lsArr[i].key;
				
				if (!new Date(monthMS)) continue;				
				var strEventsArray = lsArr[i].value;
				if (strEventsArray.indexOf('"') == -1) continue;

				//  strEventsArray = [ {event: '', date: ''}, {}, {}]
				var objEventsArray = JSON.parse(strEventsArray);

				var modelArray = this.createModels(objEventsArray, model);

				// result = [monthMS: [{event.model} , ...], ... ]
				result.push( {key: monthMS, value: modelArray} );
			}
			
			return result;
		},
		
		createModels: function (array, model) {
			var result = [];
			for(var i=0; i<array.length; i++) {
				if (array[i]) {
					var eventObj = new model.constructor(array[i]);
					result.push(eventObj);					
				} else {
					result.push('');
				}
			}
			return result;
>>>>>>> develop
		}
	};
	
	window.app = window.app || {};
	window.app.collection = collection;
})(window);