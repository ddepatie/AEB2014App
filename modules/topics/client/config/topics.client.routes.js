'use strict';

//Setting up route
angular.module('topics').config(['$stateProvider',
	function($stateProvider) {
		// Topics state routing
		$stateProvider.
		state('topics', {
			abstract: true,
			url: '/admin/topics',
			template: '<ui-view/>'
		}).
		state('topics.list', {
			url: '',
			templateUrl: 'modules/topics/client/views/list-topics.client.view.html',
			data: {
	          roles: ['admin']
	        }
		}).
		state('topics.create', {
			url: '/create',
			templateUrl: 'modules/topics/client/views/create-topic.client.view.html',
			data: {
	          roles: ['admin']
	        }
		}).
		state('topics.view', {
			url: '/:topicId',
			templateUrl: 'modules/topics/client/views/view-topic.client.view.html',
			data: {
	          roles: ['admin']
	        }
		}).
		state('topics.edit', {
			url: '/:topicId/edit',
			templateUrl: 'modules/topics/client/views/edit-topic.client.view.html',
			data: {
	          roles: ['admin']
	        }
		});
	}
]);