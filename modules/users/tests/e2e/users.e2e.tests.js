'use strict';

describe('Users E2E Tests:', function () {
  describe('Signin Validation', function () {

    it('Should report missing credentials', function () {
      browser.get('http://localhost:3000/authentication/signin');
      element(by.id('username')).clear();
      element(by.id('password')).clear();
      browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();
      expect(element.all(by.css('.error-text')).get(0).getText()).toBe('Username is required.');
      expect(element.all(by.css('.error-text')).get(1).getText()).toBe('Password is required.');
    });

    it('Admins should be able to view the registered users', function() {
      element(by.id('username')).clear();
      element(by.id('password')).clear();
      element(by.id('username')).sendKeys('admin');
      element(by.id('password')).sendKeys('Password1!');
      browser.driver.findElement(by.xpath("//button[text() = 'Sign in']")).click();
    	expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');

      expect(browser.get('http://localhost:3000/admin/users'));
      browser.get('http://localhost:3000/api/auth/signout');
    });

  });
});
