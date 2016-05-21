(function (window) {
	'use strict'
	
	function Controller (model, view) {
		var self = this;
		self.model = model;
		self.view = view;
		
	}
	
	window.app = window.app || {};
	window.app.Controller = Controller;
	
})(window);