(function (window) {
	'use strict';
	
	/**
	* template - {object literal}
    * @description
    *  Contains html templates
	*/
	
	var templates = {
		main: ''
			+ '<li class="calendar-left-side calendar-list-item">'
			+	'<%-date%>'
			+	'<% if (event) { %> <p><%= event %></p> <% }; %>'
			+	'<% if (names) { %> <p><%= names %></p> <% }; %>'
			+	'<% if (description) { %> <p><%= description %></p> <% }; %>'
			+ '</li>',

		popup: ''
			+	'<div class="add-event-window">'
			+		'<form class="popupform" name="popup">'
			+			'<input class="close-button" type="button" value="x"/>'
			+			'<input class="input-lines" name="event" placeholder="Event"/>'
			+			'<input class="input-lines" name="date" placeholder="Date, Month, Year" />'
			+			'<input class="input-lines" name="names" placeholder="Names of the participants" />'
			+			'<textarea class="input-description" name="description" placeholder="Event description"></textarea>'
			+			'<input type="button" class="add-button" value="Ok" />'
			+			'<input type="button" class="cancel-button" value="Cancel" />'
			+		'</form>'
			+	'</div>'
	}
	
	
	window.app = window.app || {};
	window.app.templates = templates;
	
})(window);