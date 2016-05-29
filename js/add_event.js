(function(window) {
	'use strict';
	
	function AddEvent (template, model) {
		this.template = template;
		this.model = model;
	}
	
	AddEvent.prototype.showForm = function () {
		
	}
	
	AddEvent.prototype.hideForm = function () {
		
	}
	
	window.app = window.app || {};
	window.app.addEvent = AddEvent;
	
})(window);