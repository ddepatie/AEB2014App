'use strict';

describe('Analytics E2E Tests:', function() {
	describe('Test Analytics page', function() {
		it('Should not include new Analytics', function() {
			browser.get('http://localhost:3000/#!/analytics');
			expect(element.all(by.repeater('analytic in analytics')).count()).toEqual(0);
		});
	});
});
