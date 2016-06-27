/* global app, $on */
(function() {
    'use strict';

    /**
     * calendar - app
     *
     * @description
     *  Single instance of calendar application. It is an object literal because we need only one exemplar of it.
     *
     * @type {{init: init}}
     */
    var calendar = {
        init: function() {
			// Header
			this.header = new app.Header();
			this.header.init();

			// Main page
            app.main.init();
        }
    };

    window.addEventListener('load', calendar.init(), false);

})();