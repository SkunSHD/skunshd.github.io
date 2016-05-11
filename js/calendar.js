(function(window) {
	'use strict'
	
	var calendar = {
		events: window.app.events,
		showDialog: function () {
			//показываем диалог
			var eW = document.querySelector('.add-event-window');
			eW.hasAttribute('hidden') ? eW.removeAttribute('hidden') : eW.setAttribute('hidden');
			
			//слушаем submit формы и по submit вызываем функцию add() для создания объекта события
			var btn_submit = document.querySelector('.add-button');
			btn_submit.addEventListener('click', add, false);
			
			//поместил в метод add: 
			//перестаем слушать submit формы
			//removeEventListener(btn_submit, listener, false);
		},
		add: function(formData) {
			var btn_submit = document.querySelector('.add-button');
			btn_submit.removeEventListener('click', add, false);
			
			var event = new Event(formData);
			if(event.valid()) {
				this.events.add(event);//добавляем в коллекцию
			} else {
				//show errors in the form}
			}
		},
		init: function() {
			//после загрузки DOM слушаем события
			var el = document.querySelector('.add_btn'); 
			el.addEventListener('click', showDialog, false);
		}
	}
	
	
	window.app.calendar = calendar;
})(window);