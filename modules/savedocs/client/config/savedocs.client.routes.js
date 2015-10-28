'use strict';

//Setting up route
angular.module('savedocs').config(['$stateProvider',
	function($stateProvider) {
		// Savedocs state routing
		$stateProvider.
		state('savedocs', {
			abstract: true,
			url: '/savedocs',
			template: '<ui-view/>'
		}).
		state('savedocs.list', {
			url: '',
			templateUrl: 'modules/savedocs/views/list-savedocs.client.view.html'
		}).
		state('savedocs.create', {
			url: '/create',
			templateUrl: 'modules/savedocs/views/create-savedoc.client.view.html'
		}).
		state('savedocs.view', {
			url: '/:savedocId',
			templateUrl: 'modules/savedocs/views/view-savedoc.client.view.html'
		}).
		state('savedocs.edit', {
			url: '/:savedocId/edit',
			templateUrl: 'modules/savedocs/views/edit-savedoc.client.view.html'
		});
	}
]);