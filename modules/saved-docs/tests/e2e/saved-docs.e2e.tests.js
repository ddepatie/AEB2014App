'use strict';

describe('Saved docs E2E Tests:', function() {
	describe('Test Saved docs page', function() {

		it('Guests should be required to sign in to create feedback', function() {
			browser.get('http://localhost:3000/saved-docs/');
			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/authentication/signin');
		});

		it('Guests should be able to sign in to an account', function() {
			element(by.id('username')).clear();
			element(by.id('password')).clear();
			element(by.id('username')).sendKeys('notadmin');
			element(by.id('password')).sendKeys('Password1!');
			browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();

			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/saved-docs/');
		});

		it('Users should be able to save a document', function() {
      browser.get('http://localhost:3000/docs/566f1f6544e1c4a80927911a');
			expect(element(by.css('[ng-click="sdCtrl.create(doc._id, doc.title, doc.description, doc.type, doc.url, doc.thumbnail_image, doc.tags)"]')).click());
		});

		it('Users should be able to remove a saved document', function() {
			browser.get('http://localhost:3000/docs/566f1f6544e1c4a80927911a');
	  	expect(element(by.css('[ng-click="sdCtrl.removeByDocId(authentication.user._id, doc._id)"]')).click());
		  browser.get('http://localhost:3000/api/auth/signout');
		});

		it('Admins should be able to save a document',function() {
			browser.get('http://localhost:3000/authentication/signin');
			element(by.id('username')).clear();
			element(by.id('password')).clear();
			element(by.id('username')).sendKeys('admin');
			element(by.id('password')).sendKeys('Password1!');
			browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();

			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');

			browser.get('http://localhost:3000/docs/566f1f6544e1c4a80927911a');
			expect(element(by.css('[ng-click="sdCtrl.create(doc._id, doc.title, doc.description, doc.type, doc.url, doc.thumbnail_image, doc.tags)"]')).click());
		});

		it('Admins should be able to remove a saved document', function() {
			browser.get('http://localhost:3000/docs/566f1f6544e1c4a80927911a');
			expect(element(by.css('[ng-click="sdCtrl.removeByDocId(authentication.user._id, doc._id)"]')).click());
			browser.get('http://localhost:3000/api/auth/signout');
		});



	});
});
