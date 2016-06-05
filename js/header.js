(function(window) {
	'use strict';	

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
	}
	
	Header.prototype.search = function () {
		alert('Search');
	}
	
	Header.prototype.refresh = function () {
		// localStorage.clear();
		alert('Refresh');
	}
	
	window.app = window.app || {};
	window.app.Header = Header;
	
})(window);