'use strict';

//Setting up route
angular.module('analytics').config(['$stateProvider',
	function($stateProvider) {
		// Analytics state routing
		$stateProvider.
		state('analytics', {
			abstract: true,
			url: '/analytics',
			template: '<ui-view/>'
		}).
		state('analytics.list', {
			url: '',
			templateUrl: 'modules/analytics/client/views/list-analytics.client.view.html'
		}).
		state('analytics.create', {
			url: '/create',
			templateUrl: 'modules/analytics/client/views/create-analytic.client.view.html'
		}).
		state('analytics.view', {
			url: '/:analyticId',
			templateUrl: 'modules/analytics/client/views/view-analytic.client.view.html'
		}).
		state('analytics.edit', {
			url: '/:analyticId/edit',
			templateUrl: 'modules/analytics/client/views/edit-analytic.client.view.html'
		});
	}
]);