(function(window){
	'use strict'
	
	var collection = {
		list: [],
		
		getThisMonthEvents: function(array) {
			var ms = new Date().getTime();
			var key = this.makeMonthId(ms);
			
			return array[key];
		},
		
		checkEvents: function(model) {
			this.list = model.getAll();
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
		}
	};
	
	window.app = window.app || {};
	window.app.collection = collection;
})(window);