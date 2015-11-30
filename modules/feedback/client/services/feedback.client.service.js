'use strict';

//Feedback service used to communicate Announcements REST endpoints
angular.module('feedback').factory('Feedback', ['$resource',
	function($resource) {
		return $resource('api/feedback/:feedbackId', { feedbackId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
