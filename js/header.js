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
	function Header (addEvent) {
		this.addEvent = addEvent;
	}
	
	Header.prototype.init = function (addEvent) {
		var add = document.getElementById('add-event');
		add.addEventListener('click', this.add, false);

		var refresh = document.getElementById('refresh');
		refresh.addEventListener('click', this.refresh, false);

		var search = document.getElementById('search');
		search.addEventListener('input', this.search, false);
	}
	
	Header.prototype.add = function () {
		this.addEvent = new this.addEvent();
		this.showForm();
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

// (function(window) {
    // 'use strict';

    // /**
     // * header {object literal}
     // *
     // * @description
     // *  Handles header view events
     // *
     // * @type {{init: init}}
     // */
    // var header = {
        // init: function(addEvent) {
            // var add = document.getElementById('add-event');
            // add.addEventListener('click', this.add, false);

            // var refresh = document.getElementById('refresh');
            // refresh.addEventListener('click', this.refresh, false);

            // var search = document.getElementById('search');
            // search.addEventListener('input', this.search, false);
			
        // },

        // //todo: create a new view for the dialog. E.g. add_event.js.
        // //this view should have its own template and should use event.js (model).
        // //You will use this view also in main.js to show a dialog when user clicks on a cell. Assign this view to app.addEvent
        // add: function() {
            // // alert('add event');
			// var popup = document.querySelector('.add-event-window');
			// popup.hasAttribute('hidden') ? popup.removeAttribute('hidden') : popup.setAttribute('hidden', 'hidden');
        // },

        // refresh: function() {
            // alert('Cleared');
			// localStorage.clear();
        // },

        // search: function(e) {
            // console.log(this.value);
        // }
    // };

    // window.app = window.app || {};
    // window.app.header = header;
// })(window);