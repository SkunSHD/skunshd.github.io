(function(window) {
	'use strict'
	
	var calendar = {
		events: window.app.events,
		init: function() {
			//после загрузки DOM слушаем события
			var el = document.querySelector('.add_btn'); 
			el.addEventListener('click', showDialog, false);
		},
		showDialog: function () {
			//показываем диалог
			//слушаем submit формы и по submit вызываем функцию add() для создания объекта события 
			//перестаем слушать submit формы
			var e2 = document.querySelector('.add-event-window');
			alert(1);
			e2.hasAttribute('hidden') ? e2.removeAttribute('hidden') : e2.setAttribute('hidden');
			removeEventListener(btn_submit, listener, false);
		},
		add: function(formData) {
			var event = new Event(formData);
			if(event.valid()) {
				this.events.add(event);//добавляем в коллекцию
			} else {
				//show errors in the form}
			}
		}
	}
	window.app.calendar = calendar;
})(window);