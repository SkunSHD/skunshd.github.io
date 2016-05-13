/* global app, $on */
(function() {
    'use strict';

    function MyApp() {}

    MyApp.prototype.init = function() {
		
		this.storage = new app.Store();
		this.model = new app.Model(this.storage);
		this.template = new app.Template();
		
		this.view = new app.View(this.template);
		
		this.controller = new app.Controller(this.model, this.view);

		window.app.calendar.init();
    }

    var myApplication = new MyApp();

    window.addEventListener('load', myApplication.init(), false);

})();