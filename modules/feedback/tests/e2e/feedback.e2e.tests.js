'use strict';

describe('Feedback E2E Tests:', function() {
	describe('Test Feedback page', function() {

		it('Guests should be required to sign in to create feedback', function() {
			browser.get('http://localhost:3000/feedback/');
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/authentication/signin');
		});


		it('Guests should be able to sign in to an account', function() {
			element(by.id('username')).clear();
      element(by.id('password')).clear();
			element(by.id('username')).sendKeys('notadmin');
			element(by.id('password')).sendKeys('Password1!');
			browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();

			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/feedback/');
		});

		it('Users should be able to send feedback', function() {
		 browser.get('http://localhost:3000/feedback/create');
		 element(by.id('title')).clear();
		 element(by.id('feedback-text')).clear();
		 element(by.id('title')).sendKeys("User automated feedback text");
		 element(by.id('feedback-text')).sendKeys("Protractor feedback!");

		 expect(browser.driver.findElement(by.xpath("//input[@type='submit']")).click());
		});

		it('Users should not be able to view the feedback list', function() {
			browser.get('http://localhost:3000/feedback');
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/forbidden');
			browser.get('http://localhost:3000/api/auth/signout');
		});

		it('Admins should be able to send feedback', function() {
			browser.get('http://localhost:3000/authentication/signin');

			element(by.id('username')).clear();
			element(by.id('password')).clear();
			element(by.id('username')).sendKeys('admin');
			element(by.id('password')).sendKeys('Password1!');
			browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();

			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');

			browser.get('http://localhost:3000/feedback/create');
			element(by.id('title')).clear();
			element(by.id('feedback-text')).clear();
			element(by.id('title')).sendKeys("Admin automated feedback text");
			element(by.id('feedback-text')).sendKeys("Protractor feedback!");

			expect(browser.driver.findElement(by.xpath("//input[@type='submit']")).click());
		});

		it('Admins should be able to view the feedback list', function() {
			expect(browser.get('http://localhost:3000/feedback'));
			browser.get('http://localhost:3000/api/auth/signout');
		});


	});
});
