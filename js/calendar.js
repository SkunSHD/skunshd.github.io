(function(window) {
	'use strict'
	
	var calendar = {
		events: window.app.events,
		init: function() {
			this.showCurrentDate();
			//после загрузки DOM слушаем события
			var el = document.querySelector('.add_btn'); 
			el.addEventListener('click', this.showDialog, false);
		},
		showDialog: function () {
			//показываем диалог
			var eW = document.querySelector('.add-event-window');
			eW.hasAttribute('hidden') ? eW.removeAttribute('hidden') : eW.setAttribute('hidden', 'hidden');
			
			//слушаем submit формы и по submit вызываем функцию add() для создания объекта события
			var btn_submit = document.querySelector('.add-button');
			btn_submit.addEventListener('click', this.add, false);
			
			//поместил в метод add: 
			//перестаем слушать submit формы
			//removeEventListener(btn_submit, listener, false);
		},
		add: function(formData) {
			var btn_submit = document.querySelector('.add-button');
			// btn_submit.removeEventListener('click', add, false);
			
			// var event = new Event(formData);
			// if(event.valid()) {
				// this.events.add(event);//добавляем в коллекцию
			// } else {
				// //show errors in the form}
			// }
		},
		showCurrentDate: function() {
			var subj = document.querySelector('.date-indicator');
			if(subj) {
				var date = new Date();
				localStorage.setItem('month', date.getMonth());
				localStorage.setItem('year', date.getFullYear());
				alert(subj);
				subj.innerHTML =  date.toLocaleString('en', {year: 'numeric', month: 'long'});
			}
		}
	}
	
	
	window.app.calendar = calendar;
})(window);