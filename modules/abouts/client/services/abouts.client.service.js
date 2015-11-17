'use strict';

//Abouts service used to communicate Abouts REST endpoints
angular.module('abouts').factory('Abouts', ['$resource',
	function($resource) {
		return $resource('api/abouts/:aboutId', { aboutId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);