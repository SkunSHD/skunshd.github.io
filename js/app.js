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
		
			// function checkLocalStorage()
			// {
			   // try {
				  // return 'localStorage' in window && window['localStorage'] !== null && localStorage != undefined;
			   // } catch (e) {
				  // return e;
			   // }
			// }
			// alert('alert ' + checkLocalStorage());

            //all templates
            //todo: no need to assign it to this.templtes because template are already accessible via app namespace
            //you can get a template like this window.app.templates.popup anywhere
            this.templates = app.templates;
			
			//add_event
			// this.addEvent = new app.addEvent(this.templates.popup, app.Model);
			
			// header
            //No need to pass popup template here.
			this.header = new app.Header(this.templates.popup);
			this.header.init();
			
            // old header
            // this.header = app.header;
            // this.header.init(this.addEvent);
			
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