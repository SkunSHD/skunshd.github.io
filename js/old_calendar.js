(function(window) {
	'use strict'
	
	var calendar = {
		// Почему здесь не добавляется object literal?
		events: window.app.events,
		init: function() {
			this.showCurrentDate();
			alert(window.app.Store.getlocalDateObj);
			//после загрузки DOM слушаем события
			var el = document.querySelector('.add_btn'); 
			el.addEventListener('click', this.showDialog, false);
			
			//слушаем submit формы и по submit вызываем функцию add() для создания объекта события
			var btn_submit = document.querySelector('.add-button');
			btn_submit.addEventListener('click', this.add, false);
		},
		showDialog: function () {
			//показываем диалог
			var eW = document.querySelector('.add-event-window');
			eW.hasAttribute('hidden') ? eW.removeAttribute('hidden') : eW.setAttribute('hidden', 'hidden');
			
			//поместил в метод add: 
			//removeEventListener(btn_submit, listener, false);
		},
		add: function() {
			//перестаем слушать submit формы
			var btn_submit = document.querySelector('.add-button');
			btn_submit.removeEventListener('click', this.add, false);
			
			var event = new app.Event(document.forms.popup);
			if(event.valid()) {
				this.events.add(event);//добавляем в коллекцию
				document.forms.popup.event.value = 'Error: event should be a string';
			} else {
				document.forms.popup.event.value = 'Error: event should be a string';
			}
		},
		showCurrentDate: function() {
			var subj = document.querySelector('.date-indicator');
			if(subj) {
				var date = new Date();
				// Почему закоменченная строка ниже не работает?
				// window.app.Store.setData('month', date.getMonth());
				localStorage.setItem('month', date.getMonth());
				localStorage.setItem('year', date.getFullYear());
				subj.innerHTML =  date.toLocaleString('en', {year: 'numeric', month: 'long'});
			}
		}
	}
	
	
	window.app.calendar = calendar;
})(window);