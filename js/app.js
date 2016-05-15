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

            //header
            this.main = app.main;
            //init header event listeners
            this.main.init(this.templates.main);

            //storage object
            this.storage = app.storage;

            //event model
            this.event = new app.Model(this.storage);
        }
    };

    window.addEventListener('load', calendar.init(), false);

})();