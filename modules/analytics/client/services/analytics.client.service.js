'use strict';

//Analytics service used to communicate Analytics REST endpoints
angular.module('analytics').factory('Analytics', ['$resource',
	function($resource) {
		return $resource('api/analytics/:analyticId', { analyticId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);