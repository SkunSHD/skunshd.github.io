(function (window) {
	'use strict'
	
	/**
	* Sets up defaults for all the Template methods such as a default template
	*
	* @constructor
	*/
	
	function Template() {
		this.defaultTemplate
		=	'<col> <col> <col> <col> <col> <col> <col>';
		
		this.anotherMonth
		=	'<td class="pre-post" id="<%= id %>">'
		+		'<% if (tagName) { %> <%= tagName %>, <% }; %>'
		+		'<span><%= day %></span>'
		+	'</td>';
		
		
		this.thisMonth
		=	'<td class="<%= className %>" id="<%= id %>" >'
		+		'<%= day %>'
		+		'<div id="event-container">'
		+			'<h5><%= event %></h5>'
		+			'<p class="event-names"><%= names %></p>'
		+			'<p class="event-description"><%= description %></p>'
		+		'</div>'
		+	'</td>';
		
		this.justMonthTemplate
		=	'<td id="<%= id %>" class="<%= className %>">'
		+	'<%= day %>'
		+	'</td>';

		this.nextLine
		=	'</tr><tr>';
	}
	
	
	window.app = window.app || {};
	window.app.Template = Template;
	
})(window);