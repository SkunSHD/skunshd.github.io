(function(window) {
	'use strict';	

	// todo: create a new view for the dialog. E.g. add_event.js.
	// this view should have its own template and should use event.js (model).
	// You will use this view also in main.js to show a dialog when user clicks on a cell. Assign this view to app.addEvent
		
	 /**
     * header 
     *
     * @description
     *  Handles header view events
     *
     * @type constructor
     */
	function Header () {

	}
	
	Header.prototype.init = function () {
		var add = document.getElementById('add-event');
		add.addEventListener('click', this.add.bind(this), false);

		var refresh = document.getElementById('refresh');
		refresh.addEventListener('click', this.refresh, false);

		var search = document.getElementById('search');
		search.addEventListener('input', this.search, false);
	}
	
	Header.prototype.add = function () {
        //'this' inside this function is different from 'this' inside function Header
		this.addEventView = new app.addEventView();
		this.addEventView.showForm();
		alert('Add');
	}
	
	Header.prototype.search = function () {
		alert('Search');
	}
	
	Header.prototype.refresh = function () {
		alert('Refresh');
	}
	
	window.app = window.app || {};
	window.app.Header = Header;
	
})(window);