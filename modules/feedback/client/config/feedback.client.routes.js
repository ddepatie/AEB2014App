'use strict';

//Setting up route
angular.module('feedback').config(['$stateProvider',
	function($stateProvider) {
		// Feedback state routing
		$stateProvider.
		state('feedback', {
			abstract: true,
			url: '/feedback',
			template: '<ui-view/>'
		}).
		state('feedback.list', {
			url: '',
			templateUrl: 'modules/feedback/client/views/list-feedback.client.view.html',
			data: {
							roles: ['admin']
					}
		}).
		state('feedback.create', {
			url: '/create',
			templateUrl: 'modules/feedback/client/views/create-feedback.client.view.html',
			data: {
				    roles: ['admin','user']
			}
		}).
		state('feedback.view', {
			url: '/:feedbackId',
			templateUrl: 'modules/feedback/client/views/view-feedback.client.view.html',
			data: {
	         roles: ['admin','user']
			}
		}).
		state('feedback.edit', {
			url: '/:feedbackId/edit',
			templateUrl: 'modules/feedback/client/views/edit-feedback.client.view.html',
			data: {
				   roles: ['admin','user']
			}
		});
	}
]);
