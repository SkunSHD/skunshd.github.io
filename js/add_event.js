(function(window) {
	'use strict';
	
	function AddEvent (template) {
		// don't wotk
		this.template = template;
	}
	
	AddEvent.prototype.showForm = function () {
		// I don't now how to avoid creation of element 'div'. How to make alive string that I take from tamplates
		var wrapper = document.createElement('div');
		wrapper.innerHTML = app.templates.popup;
		document.body.appendChild(wrapper);
		
		var closePopup = document.querySelector('close-button');
		closePopup.addEventListener('click', this.hideForm, false);
	}
	
	AddEvent.prototype.hideForm = function () {
		alert('close');
	}
	
	window.app = window.app || {};
	window.app.addEvent = AddEvent;
	
})(window);