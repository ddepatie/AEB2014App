'use strict';

describe('Searches E2E Tests:', function() {
	describe('Test Searches page', function() {
		it('Should not include new Searches', function() {
			browser.get('http://localhost:3000/#!/searches');
			expect(element.all(by.repeater('search in searches')).count()).toEqual(0);
		});
	});
});
