'use strict';

describe('Feedback E2E Tests:', function() {
	describe('Test Feedback page', function() {
		it('Should not include new Feedback', function() {
			browser.get('http://localhost:3000/#!/feedback');
			expect(element.all(by.repeater('feedback in feedback')).count()).toEqual(0);
		});
	});
});
