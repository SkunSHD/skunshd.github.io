/* global app, $on */
(function() {
    'use strict';

    function MyApp() {}

    MyApp.prototype.init = function() {
	
        this.showDateMethods = app.ShowDateMethods;
        this.showDateMethods.showDate();

        // this.calendar = new app.Calendar();
        // this.calendar.createCalendar();
		
		this.view = new app.View();
		this.view.createCalendar();

        this.search = new app.Search();
        this.search.start();
    }

    var myApplication = new MyApp();

    window.addEventListener('load', myApplication.init(), false);

})();