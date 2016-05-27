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

            //all templates
            this.templates = app.templates;

            //header
            this.header = app.header;
            //init header event listeners
            this.header.init();
			
            //storage object
            this.storage = app.storage;
			this.storage.init();
			
            //event model
            this.eventModel = new app.Model( {storage: this.storage} );

			// collection
			this.collection = app.collection;
			
			//header
            this.main = app.main;
            //init header event listeners
            this.main.init(this.templates.main, this.eventModel);
        }
    };

    window.addEventListener('load', calendar.init(), false);

})();