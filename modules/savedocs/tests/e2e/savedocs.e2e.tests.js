'use strict';

describe('Savedocs E2E Tests:', function() {
	describe('Test Savedocs page', function() {
		it('Should not include new Savedocs', function() {
			browser.get('http://localhost:3000/#!/savedocs');
			expect(element.all(by.repeater('savedoc in savedocs')).count()).toEqual(0);
		});
	});
});
