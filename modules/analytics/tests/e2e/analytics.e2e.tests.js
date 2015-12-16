'use strict';
jasmine.getEnv().defaultTimeoutInterval = 100000;

describe('Analytics E2E Tests:', function() {
	describe('Test Analytics page', function() {

		it('Guests should be required to sign in to view analytics', function() {
			browser.get('http://localhost:3000/admin/analytics');
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/authentication/signin');
		});


		it('Admins should be able to view the analytics', function() {
			element(by.id('username')).clear();
			element(by.id('password')).clear();
			element(by.id('username')).sendKeys('admin');
			element(by.id('password')).sendKeys('Password1!');
			browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();

			expect(browser.get('http://localhost:3000/admin/analytics'));
		  browser.get('http://localhost:3000/api/auth/signout');
		});

	});
});
