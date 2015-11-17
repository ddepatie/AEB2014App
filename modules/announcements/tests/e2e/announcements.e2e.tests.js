'use strict';

describe('Announcements E2E Tests:', function() {
	describe('Test Announcements page', function() {
		it('Should not include new Announcements', function() {
			browser.get('http://localhost:3000/#!/announcements');
			expect(element.all(by.repeater('announcement in announcements')).count()).toEqual(0);
		});
	});
});
