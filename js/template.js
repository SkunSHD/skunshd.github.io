(function (window) {
	'use strict';
	
	/**
	* template - {object literal}
    * @description
    *  Contains html templates
	*/
	
	var templates = {
		// main: ''
			// + '<li class="calendar-left-side calendar-list-item calendar-list-item">'
			// + '</li>',
		
		main: ''
            + '<table>'
            +   '<col> <col> <col> <col> <col> <col> <col>'
            +   '<tr>'
            +       '<td></td>'
            +       '<td></td>'
            +       '<td></td>'
            +       '<td></td>'
            +       '<td></td>'
            +       '<td></td>'
            +       '<td></td>'
            +   '</tr>'
            + '</table>',

		anotherMonthCell: ''
            + '<td class="pre-post" id="<%= id %>">'
            +		'<% if (tagName) { %> <%= tagName %>, <% }; %>'
            +		'<span><%= day %></span>'
            +	'</td>',
		
		
		thisMonthCell: ''
            + '<td class="<%= className %>" id="<%= id %>" >'
            +		'<%= day %>'
            +		'<div id="event-container">'
            +			'<h5><%= event %></h5>'
            +			'<p class="event-names"><%= names %></p>'
            +			'<p class="event-description"><%= description %></p>'
            +		'</div>'
            +	'</td>',
		
		justMonthCell: ''
            + '<td id="<%= id %>" <% if (className) { %> class="<%= className %>" <% }; %> >'
            +	'<%= day %>'
            +	'</td>'
	}
	
	
	window.app = window.app || {};
	window.app.templates = templates;
	
})(window);