(function(window) {
	'use strict';
	
	function AddEvent (template) {
		this.template = template;
	}
	
	AddEvent.prototype.showForm = function () {
		alert(this.template);
	}
	
	AddEvent.prototype.hideForm = function () {
		
	}
	
	window.app = window.app || {};
	window.app.addEvent = AddEvent;
	
})(window);