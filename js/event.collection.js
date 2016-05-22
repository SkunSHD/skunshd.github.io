(function(window){
	'use strict'
	
	var collection = {
		list: [],
		
		getThisMonthEvents: function(array) {
			var ms = new Date().getTime();
			var key = this.makeMonthId(ms);
			
			return array[key];
		},
		
		checkEvents: function() {
			this.list = this.getAllEvents();
			return this.list;
		},
		
		add: function() {
			
		},
		
		remove: function(id) {

		},
		
		makeMonthId: function (eventObj) {
			var lsId = new Date(eventObj.date);
			lsId.setDate(1);
			lsId.setHours(0, 0, 0, 0);
			lsId = lsId.getTime();
			return lsId;
		},
		
		getAllEvents: function () {
			var result = [];
			var lsArr = app.storage.getAllData();
			
			for (var i = 0; i<lsArr.length; i++) {
				var id = lsArr[i].key;
				
				if (!new Date(id)) continue;				
				var strValue = lsArr[i].value;
				if (strValue.indexOf('"') == -1) continue;

				var objValue = JSON.parse(strValue, function(key, value) {
					if (key == 'date') return new Date(value);
					return value;
				});
				
				result.push( {key: id, value: objValue} );
			}
			
			return result;
		}
	};
	
	window.app = window.app || {};
	window.app.collection = collection;
})(window);