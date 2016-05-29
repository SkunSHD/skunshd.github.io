(function(window) {
	'use strict';
	
	/**
	* @description
	*  This class doing all that concerns a single event.
	*/
	function Model(options) {
		// this.storage, this.event, this.date, this.names, this.description;
		
		for (var key in options) {
			if (key == 'storage') this.storage = options[key];
			if (key == 'event') this.event = options.event;
			if (key == 'names') this.names = options.names;
			if (key == 'description') this.description = options.description;
			if (key == 'date') {
				if (options.date) this.date = new Date(options.date);
				else this.date = new Date();
			}
		}
	}
	
	Model.prototype.save = function () {
		var lsId = this.makeMonthId();
		
		var jsonObj = '';
		var oldMonthArr = this.storage.getData(lsId);
		var preparedObj = {
			event: this.event,
			date: this.date,
			names: this.names,
			description: this.description
		};
		
		if (oldMonthArr) {
			oldMonthArr = JSON.parse(oldMonthArr);
			oldMonthArr[preparedObj.date.getDate()-1] = preparedObj;
			
			jsonObj = JSON.stringify(oldMonthArr);
		} else {
			var daysInMonth = this.monthCapacity(preparedObj);
			var newMonthArr = new Array(daysInMonth);
			newMonthArr[preparedObj.date.getDate()-1] = preparedObj;

			jsonObj = JSON.stringify(newMonthArr);
		}
		
		this.storage.setData(lsId, jsonObj);
	},
	
	Model.prototype.makeMonthId = function () {
		var lsId = new Date(this.date);
		lsId.setDate(1);
		lsId.setHours(0, 0, 0, 0);
		lsId = lsId.getTime();
		return lsId;
	};

	Model.prototype.monthCapacity = function (eventObj) {
		var dateObj = eventObj.date || new Date();
		var result = new Date(dateObj.date.getFullYear(), dateObj.date.getMonth() + 1, 0);
		return result.getDate();
	};
	
	Model.prototype.getTplObj = function () {
		var tplObj = {};
		if (this.date) tplObj.date = this.date.getDate();
		if (this.event) tplObj.event = this.event;
		if (this.names) tplObj.names = this.names;
		if (this.description) tplObj.description = this.description;
		return tplObj;
	}

    Model.prototype.validate = function (attrs) {
        //validate properties
    };
	
	Model.prototype.getbyKey = function (millisec) {
		// create date obj
		// take corresponding event from ls and return
	};
	
	Model.prototype.remove = function (key) {
		this.storage.deleteByKey(key);
	};
	
	Model.prototype.deleteAll = function () {
		this.storage.deleteAll();
	};
	
	window.app = window.app || {};
	window.app.Model = Model;
	
})(window);