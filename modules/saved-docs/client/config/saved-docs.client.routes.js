'use strict';

//Setting up route
angular.module('saved-docs').config(['$stateProvider',
	function($stateProvider) {
		// Saved docs state routing
		$stateProvider.
		state('saved-docs', {
			abstract: true,
			url: '/saved-docs',
			template: '<ui-view/>'
		}).
		state('saved-docs.list', {
			url: '',
			templateUrl: 'modules/saved-docs/client/views/list-saved-docs.client.view.html'
		}).
		state('saved-docs.create', {
			url: '/create',
			templateUrl: 'modules/saved-docs/client/views/create-saved-doc.client.view.html'
		}).
		state('saved-docs.view', {
			url: '/:savedDocId',
			templateUrl: 'modules/saved-docs/client/views/view-saved-doc.client.view.html'
		}).
		state('saved-docs.edit', {
			url: '/:savedDocId/edit',
			templateUrl: 'modules/saved-docs/client/views/edit-saved-doc.client.view.html'
		});
	}
]);