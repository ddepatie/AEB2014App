'use strict';

//Setting up route
angular.module('searches').config(['$stateProvider',
	function($stateProvider) {
		// Searches state routing
		$stateProvider.
		state('searches', {
			abstract: true,
			url: '/searches',
			template: '<ui-view/>'
		}).
		state('searches.list', {
			url: '',
			templateUrl: 'modules/searches/views/list-searches.client.view.html'
		}).
		state('searches.create', {
			url: '/create',
			templateUrl: 'modules/searches/views/create-search.client.view.html'
		}).
		state('searches.view', {
			url: '/:searchId',
			templateUrl: 'modules/searches/views/view-search.client.view.html'
		}).
		state('searches.edit', {
			url: '/:searchId/edit',
			templateUrl: 'modules/searches/views/edit-search.client.view.html'
		});
	}
]);