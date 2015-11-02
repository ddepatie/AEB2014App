'use strict';

describe('Docs E2E Tests:', function() {
	describe('Test Docs page', function() {
		it('Should not include new Docs', function() {
			browser.get('http://localhost:3000/#!/docs');
			expect(element.all(by.repeater('doc in docs')).count()).toEqual(0);
		});
	});
});
