'use strict';

// Rename this file to local.js for having a local configuration variables that
// will not get commited and pushed to remote repositories.
// Use it for your API keys, passwords, etc.

 // For example:

module.exports = {
  db: {
    uri: 'mongodb://AEB2014:group10cuf@ds041934.mongolab.com:41934/aeb2014',
    options: {
      user: 'admin',
      pass: 'group10cuf'
    }
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || 'APP_ID',
    clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
    callbackURL: '/api/auth/facebook/callback'
  }
};

