'use strict';

//Announcements service used to communicate Announcements REST endpoints
angular.module('announcements').factory('Announcements', ['$resource',
	function($resource) {
		return $resource('api/announcements/:announcementId', { announcementId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);