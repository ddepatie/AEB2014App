'use strict';

// Protractor configuration
exports.config = {
  //specs: ['modules/*/tests/e2e/*.js']
  baseUrl: 'http://localhost:3000/',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine',
  specs: ['modules/*/tests/e2e/*.js']
};
