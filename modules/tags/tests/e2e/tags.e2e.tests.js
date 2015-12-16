'use strict';

describe('Tags E2E Tests:', function() {
	describe('Test Tags page', function() {

		it('Guests should be required to sign in to view tags', function() {
			browser.get('http://localhost:3000/admin/tags');
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/authentication/signin');
		});


		it('Admins should be able to view the current tags', function() {
			element(by.id('username')).clear();
			element(by.id('password')).clear();
			element(by.id('username')).sendKeys('admin');
			element(by.id('password')).sendKeys('Password1!');
			browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();

			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/admin/tags');
		});

		it('Admins should be able to create new tags', function() {
			browser.get('http://localhost:3000/admin/tags/create');

			element(by.id('tag')).clear();
			element(by.id('tag')).sendKeys("Protractor tag");
			expect(browser.driver.findElement(by.xpath("//input[@type='submit']")).click());

			browser.get('http://localhost:3000/api/auth/signout');
		});

	});
});
