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
			var ms = new Date().getTime();
			var key = this.makeMonthId(ms);
			for(var i=0; i<array.length; i++) {
				if (array[i].key == key) return array[i].value;
			}
			return [];
		},
		
		add: function() {
			
		},
		
		remove: function(id) {
			
		},
		
		makeMonthId: function (ms) {
			var lsId = new Date(ms);
			lsId.setDate(1);
			lsId.setHours(0,0,0,0);
			lsId = lsId.getTime();
			return lsId;
		},
		
		getAllEvents: function (model) {
			var result = [];
			//  lsArr = [ ms: [{title: '', date: ''}, ...], ms: [{},{}], ... ] 
			var lsArr = app.storage.getAllData();
			
			for (var i = 0; i<lsArr.length; i++) {
				var monthMS = lsArr[i].key;
				if (!new Date(monthMS)) continue;				
				var strEventsArray = String(lsArr[i].value);
				if (strEventsArray.indexOf('"') == -1) continue;
				
				//  strEventsArray = [ {title: '', date: ''}, {}, {}]
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
		}
	};
	
	window.app = window.app || {};
	window.app.collection = collection;
})(window);