'use strict';

//Savedocs service used to communicate Savedocs REST endpoints
angular.module('savedocs').factory('Savedocs', ['$resource',
	function($resource) {
		return $resource('api/savedocs/:savedocId', { savedocId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);