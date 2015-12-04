'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('health', {
      url: '/health',
      templateUrl: 'modules/core/client/views/health.client.view.html'
    })
    .state('economy', {
      url: '/economy',
      templateUrl: 'modules/core/client/views/economy.client.view.html'
    })
    .state('technology', {
      url: '/technology',
      templateUrl: 'modules/core/client/views/technology.client.view.html'
    })
    .state('development', {
      url: '/development',
      templateUrl: 'modules/core/client/views/development.client.view.html'
    })
    .state('environment', {
      url: '/environment',
      templateUrl: 'modules/core/client/views/environment.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
