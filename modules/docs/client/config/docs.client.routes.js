'use strict';

//Setting up route
angular.module('docs').config(['$stateProvider',
	function($stateProvider) {
		// Docs state routing
		$stateProvider.
		state('docs', {
			abstract: true,
			url: '/docs',
			template: '<ui-view/>'
		}).
		state('docs.list', {
			url: '',
			templateUrl: 'modules/docs/client/views/list-docs.client.view.html'
		}).
		state('docs.create', {
			url: '/create',
			templateUrl: 'modules/docs/client/views/create-doc.client.view.html',
			data: {
	          roles: ['admin']
	        }
		}).
		state('docs.view', {
			url: '/:docId',
			templateUrl: 'modules/docs/client/views/view-doc.client.view.html',
		}).
		state('docs.edit', {
			url: '/:docId/edit',
			templateUrl: 'modules/docs/client/views/edit-doc.client.view.html',
			data: {
	          roles: ['admin']
	        }
		}).
		state('results', {
			url: '/results',
			templateUrl: 'modules/docs/client/views/show-results.client.view.html'
		}).
		state('results-init', {
			url: '/results/:filterId',
			templateUrl: 'modules/docs/client/views/show-results.client.view.html'
		});
	}
]);
