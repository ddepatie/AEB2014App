'use strict';

describe('Saved docs E2E Tests:', function() {
	describe('Test Saved docs page', function() {
		it('Should not include new Saved docs', function() {
			browser.get('http://localhost:3000/#!/saved-docs');
			expect(element.all(by.repeater('savedDoc in savedDocs')).count()).toEqual(0);
		});
	});
});
