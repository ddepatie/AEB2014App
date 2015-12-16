'use strict';

describe('Docs E2E Tests:', function() {
	describe('Test Docs page', function() {

		it('Guests should be able to view the docs pertaining to a topic (health arbitrarily selected)', function() {
			expect('http://localhost:3000/results/1');
		});

		it('Guests should be able to view a specific doc', function() {
			expect('http://localhost:3000/docs/566f1f6544e1c4a80927911a');
		});

		it('Guests should be able to sign into an account', function() {
			browser.get('http://localhost:3000/authentication/signin');
			element(by.id('username')).clear();
			element(by.id('password')).clear();
			element(by.id('username')).sendKeys('notadmin');
			element(by.id('password')).sendKeys('Password1!');
			browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();

			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');
		});

		it('Users should be able to view the docs pertaining to a topic (environment arbitrarily selected)', function() {
			expect('http://localhost:3000/results/5');
		});

		it('Users should be able to view the list of docs', function() {
			expect('http://localhost:3000/docs');
		});

		it('Users should be able to view a specific doc', function() {
			expect('http://localhost:3000/docs/566f1f6544e1c4a80927911a');
		  browser.get('http://localhost:3000/api/auth/signout');
		});

		it('Admins should be able to view the docs pertaining to a topic (technology arbitrarily selected)', function() {
			browser.get('http://localhost:3000/authentication/signin');
			element(by.id('username')).clear();
			element(by.id('password')).clear();
			element(by.id('username')).sendKeys('admin');
			element(by.id('password')).sendKeys('Password1!');
			browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();

			expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');

			expect('http://localhost:3000/results/3');
		});

		it('Admins should be able to view the list of docs', function() {
	   	expect('http://localhost:3000/docs');
		});

		it('Admins should be able to create new docs', function() {
			browser.get('http://localhost:3000/docs/create');
			element(by.id('title')).clear();
			element(by.id('description')).clear();
			element(by.id('url')).clear();
			element(by.id('thumbnail_image')).clear();

			element(by.id('title')).sendKeys("Florida Oranges");
			element(by.id('description')).sendKeys("In 2013, 71.4 million metric tons of oranges were grown worldwide, production being highest in Brazil and the U.S. states of Florida and California.");
			element(by.id('url')).sendKeys("http://www.floridacitrus.org/wp-content/uploads/GROVE-web-under-construction.jpg");
			element(by.id('type')).$('[value="jpg"]').click();
			element(by.id('thumbnail_image')).sendKeys("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQb77gyvqJ1M7-Lik8-_UV3efvAkTe6ZwqvxTHP9BMUejiuFqbXew");
			expect(browser.driver.findElement(by.xpath("//input[@type='submit']")).click());

	    browser.get('http://localhost:3000/api/auth/signout');
		});

	});
});
