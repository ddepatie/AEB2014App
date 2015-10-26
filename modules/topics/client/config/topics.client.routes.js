'use strict';

//Setting up route
angular.module('topics').config(['$stateProvider',
	function($stateProvider) {
		// Topics state routing
		$stateProvider.
		state('topics', {
			abstract: true,
			url: '/topics',
			template: '<ui-view/>'
		}).
		state('topics.list', {
			url: '',
			templateUrl: 'modules/topics/views/list-topics.client.view.html'
		}).
		state('topics.create', {
			url: '/create',
			templateUrl: 'modules/topics/views/create-topic.client.view.html'
		}).
		state('topics.view', {
			url: '/:topicId',
			templateUrl: 'modules/topics/views/view-topic.client.view.html'
		}).
		state('topics.edit', {
			url: '/:topicId/edit',
			templateUrl: 'modules/topics/views/edit-topic.client.view.html'
		});
	}
]);