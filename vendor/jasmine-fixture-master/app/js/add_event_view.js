(function (window) {
    'use strict';

    function AddEventView() {}

    AddEventView.prototype.showForm = function (event) {
        var form = this.render();
        this.setCoords(form, event);
        document.body.appendChild(form);
    };

    AddEventView.prototype.setCoords = function (formWindow, event) {
        var target = event.target;
        var box = target.getBoundingClientRect();
        var offsetHeight = 310;
        var offsetWidth = 280;

        var top = box.top + document.body.scrollTop;
        var left = box.left + target.offsetWidth;

        if (box.top + document.body.scrollTop + offsetHeight > document.body.scrollHeight) {
            top = document.body.scrollHeight - offsetHeight - 30;
        }
        if (document.body.clientWidth < box.left + target.offsetWidth + offsetWidth) {
            left = box.left - offsetWidth - 30;
        }

        formWindow.firstChild.style.top = top + 'px';
        formWindow.firstChild.style.left = left + 'px';
    };

    AddEventView.prototype.showErrors = function (arr) {
        var form = document.forms.popup;
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].name == 'title') {
                    form.event.value = 'Title is required';
                } else if (arr[i].name == 'date') {
                    form.date.value = 'Date is required';
                }
            }
        }
    };

    AddEventView.prototype.render = function () {
        var template = app.templates.popup;
        var elem = document.createElement('div');
        elem.innerHTML = template;
        this.initListeners(elem);
        return elem;
    };

    AddEventView.prototype.initListeners = function (elem) {
        var btn = elem.querySelector('.add-button');
        btn.addEventListener('click', this.sendForm.bind(this), false);

        var clsCross = elem.querySelector('.close-button');
        var clsBtn = elem.querySelector('.cancel-button');

        clsCross.addEventListener('click', this.close, false);
        clsBtn.addEventListener('click', this.close, false);
    };

    AddEventView.prototype.sendForm = function () {
        var self = this;
        var model = new app.Model();
        model.validate(document.forms.popup, self.showErrors);
    };

    AddEventView.prototype.close = function () {
        document.body.removeChild(document.body.lastChild);
    };

    window.app = window.app || {};
    window.app.addEventView = AddEventView;
	
})(window);