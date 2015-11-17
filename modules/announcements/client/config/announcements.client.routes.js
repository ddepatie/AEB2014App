'use strict';

//Setting up route
angular.module('announcements').config(['$stateProvider',
	function($stateProvider) {
		// Announcements state routing
		$stateProvider.
		state('announcements', {
			abstract: true,
			url: '/announcements',
			template: '<ui-view/>'
		}).
		state('announcements.list', {
			url: '',
			templateUrl: 'modules/announcements/client/views/list-announcements.client.view.html'
		}).
		state('announcements.create', {
			url: '/create',
			templateUrl: 'modules/announcements/client/views/create-announcement.client.view.html',
			data: {
          		roles: ['admin']
        	}
		}).
		state('announcements.view', {
			url: '/:announcementId',
			templateUrl: 'modules/announcements/client/views/view-announcement.client.view.html'
		}).
		state('announcements.edit', {
			url: '/:announcementId/edit',
			templateUrl: 'modules/announcements/client/views/edit-announcement.client.view.html',
			data: {
          		roles: ['admin']
        	}
		});
	}
]);