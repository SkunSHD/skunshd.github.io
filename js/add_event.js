(function(window) {
	'use strict';
	
	function AddEvent (template) {
		// don't work
        //now it works
		this.template = template;

        //but there is no need to pass template here
        //todo: 1 this.templates = app.templates.popup
	}

    //todo: 2 - you do not need this method showForm
    //todo 3: add a render() method and return template from it. If you need dynamic data in template, compile template using underscore
    //todo: 4 setup an event listener on submit button
    //todo: you will need here also an event model. Use it to validate the form via model.validate() method. Return errors to callback function.
    //e.g. this.model.validate(formData, function(errors) {
    // if(errors) {
    // show errors
    // }
    // })
    //
    //in teh model validate method look like this
    //validate: function(formData, callback) {
    //var errors = [];
    //if(formData.title === '') {
    // errors.push({name: 'title', message: 'Title is required'});
    // }
    //....
    //...
    //
    // if(callback) {
    // callback(errors);
    // }
    // }



	AddEvent.prototype.showForm = function () {
		// I don't now how to avoid creation of element 'div'. How to make alive string that I take from tamplates
		var wrapper = document.createElement('div');
		wrapper.innerHTML = app.templates.popup;
		document.body.appendChild(wrapper);
		
		var closePopup = document.querySelector('close-button');
		closePopup.addEventListener('click', this.hideForm, false);
	};
	
	AddEvent.prototype.hideForm = function () {
		alert('close');
	};
	
	window.app = window.app || {};
	window.app.addEvent = AddEvent;
	
})(window);