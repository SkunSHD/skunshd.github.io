(function(window) {
	'use strict';
	
	/**
	* @description
	*  This class doing all that concerns a single event.
	*/
	function Model(options) {
		for (var key in options) {
			if (key == 'event') this.title = options.event;
			if (key == 'names') this.names = options.names;
			if (key == 'description') this.description = options.description;
			if (key == 'date') {
				if (options.date) {
					// alert('not new');
					// alert(options.date);
					this.date = new Date(options.date);
				} else {
					// alert('new');
					this.date = new Date();
				}
			}
		}
		this.id = this.makeDayId();
	}
	
	Model.prototype.save = function () {
		var lsMId = this.makeMonthId();
		
		var jsonObj = '';
		var oldMonthArr = app.storage.getData(lsMId);
		var preparedObj = {
			id: this.id,
			title: this.title,
			date: this.date.getTime(),
			names: this.names,
			description: this.description
		};
		
		if (oldMonthArr) {
			oldMonthArr = JSON.parse(oldMonthArr);
			oldMonthArr[this.date.getDate()-1] = preparedObj;
			jsonObj = JSON.stringify(oldMonthArr);
		} else {
			var daysInMonth = this.monthCapacity(preparedObj);
			var newMonthArr = new Array(daysInMonth);
			newMonthArr[this.date.getDate()-1] = preparedObj;
			jsonObj = JSON.stringify(newMonthArr);
		}
		
		app.storage.setData(lsMId, jsonObj);
	},
	
	Model.prototype.makeDayId = function () {
		var ms = new Date(this.date);
		ms.setHours(0,0,0,0);
		var id = ms.getTime();
		return ms.getTime();
	}
	
	Model.prototype.makeMonthId = function () {
		var lsMId = new Date(this.date);
		lsMId.setDate(1);
		lsMId.setHours(0,0,0,0);
		lsMId = lsMId.getTime();
		return lsMId;
	};

	Model.prototype.monthCapacity = function (eventObj) {
		var dateObj = eventObj.date || new Date();
		var result = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
		return result.getDate();
	};
	
	Model.prototype.getTplObj = function () {
		var tplObj = {};
		tplObj.id = this.id;
		tplObj.date = this.date.getDate();
		tplObj.title = this.title;
		tplObj.names = this.names;
		tplObj.description = this.description;
		return tplObj;
	}

    Model.prototype.validate = function (formData, callback) {
        var errors = [];
		var formData = formData || document.forms.popup;
		if (formData.event.value.trim() === '') errors.push({name: 'title', message: 'Title is required'});
		if (formData.date.value.trim() === '') errors.push({name: 'date', message: 'Date is required'});

		if (callback) callback(errors);
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