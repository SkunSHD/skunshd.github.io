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
		=	'<td class="pre-post" id=" <%= fistDateInTable %> ">'
		+		'<% if (tagsName) { %> <%= tagsName %> <% } %>'
		+		'<span> <%= fistDateInTabl %> </span>'
		+	'</td>';
	}
	
	
	window.app = window.app || {};
	window.app.Template = Template;
	
})(window);