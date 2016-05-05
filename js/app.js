/* global app, $on */
(function() {
    'use strict';

    function MyApp() {}

    MyApp.prototype.init = function() {
	
        this.showDateMethods = app.ShowDateMethods;
        this.showDateMethods.showDate();
		
		this.template = new app.Template();
		
		this.view = new app.View(this.template);
		this.view.createCalendar();

        this.search = new app.Search();
        this.search.start();
    }

    var myApplication = new MyApp();

    window.addEventListener('load', myApplication.init(), false);

})();