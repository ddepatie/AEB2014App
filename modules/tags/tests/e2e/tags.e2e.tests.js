'use strict';

describe('Tags E2E Tests:', function() {
	describe('Test Tags page', function() {
		it('Should not include new Tags', function() {
			browser.get('http://localhost:3000/#!/tags');
			expect(element.all(by.repeater('tag in tags')).count()).toEqual(0);
		});
	});
});
