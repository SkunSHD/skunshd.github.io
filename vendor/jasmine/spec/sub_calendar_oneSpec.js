describe ('Calendar', function () {	describe ('Should be', function () {		it ('returned calendar object with date', function () {			expect(app.subcalone.createCalendar(2016, 5).label).toBe('June 2016');		});		it ('returned calendar HTML O-List Element', function () {			expect(app.subcalone.createCalendar(2016, 5).calendar().toString()).toBe('[object HTMLOListElement]');		});	});	});