'use strict';

//Topics service used to communicate Topics REST endpoints
angular.module('topics').factory('Topics', ['$resource',
	function($resource) {
		return $resource('api/topics/:topicId', { topicId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);