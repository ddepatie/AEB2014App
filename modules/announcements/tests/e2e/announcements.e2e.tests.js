'use strict';

describe('Announcements E2E Tests:', function() {
	describe('Test Announcements page', function() {

				it('Guests should be able to view announcements', function() {
					expect(browser.get('http://localhost:3000/announcements'));
				});

				it('Guests should be able to sign in to an account', function() {
					browser.get('http://localhost:3000/authentication/signin');
					element(by.id('username')).clear();
		      element(by.id('password')).clear();
					element(by.id('username')).sendKeys('notadmin');
					element(by.id('password')).sendKeys('Password1!');
					browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();

					expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');
				});

				it('Users should be able to view announcements', function() {
				  expect(browser.get('http://localhost:3000/announcements'));
				});

				it('Users should not be able to create announcements', function() {
					browser.get('http://localhost:3000/admin/announcements');
					expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/forbidden');
					browser.get('http://localhost:3000/api/auth/signout');
				});

				it('Admins should be able to create announcements', function() {
					browser.get('http://localhost:3000/authentication/signin');

					element(by.id('username')).clear();
					element(by.id('password')).clear();
					element(by.id('username')).sendKeys('admin');
					element(by.id('password')).sendKeys('Password1!');
					browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();

					expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');

					browser.get('http://localhost:3000/admin/announcements');
					element(by.id('title')).clear();
					element(by.id('announcement-text')).clear();
					element(by.id('title')).sendKeys("Admin automated announcement");
					element(by.id('announcement-text')).sendKeys("Protractor announcement!");

					expect(browser.driver.findElement(by.xpath("//input[@type='submit']")).click());
				  browser.get('http://localhost:3000/api/auth/signout');
				});

			});
		});
