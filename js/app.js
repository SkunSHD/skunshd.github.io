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
			// header
			this.header = new app.Header();
			this.header.init();
			
            //storage object
			app.storage.init();
			new app.Model( {event: 'new one', date: '', names: 'Baton, Bulcohka', description: 'Sehr guta Mann'} ).save();
			
            //event model
            this.eventModel = new app.Model( {storage: this.storage} );
			// collection
			this.collection = app.collection;
			
			//header
            this.main = app.main;
            //init header event listeners
            this.main.init(this.eventModel);
        }
    };

    window.addEventListener('load', calendar.init(), false);

})();