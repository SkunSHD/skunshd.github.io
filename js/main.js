(function(window) {
    'use strict';

    var main = {
        init: function() {
            window.app.calendar.init();
        }
    };

    window.app = window.app || {};
    window.app.main = main;

})(window);