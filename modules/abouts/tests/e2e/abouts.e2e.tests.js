'use strict';

describe('Abouts E2E Tests:', function() {
	describe('Test Abouts page', function() {
		it('Should not include new Abouts', function() {
			browser.get('http://localhost:3000/#!/abouts');
			expect(element.all(by.repeater('about in abouts')).count()).toEqual(0);
		});
	});
});
