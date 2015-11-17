'use strict';

//Saved docs service used to communicate Saved docs REST endpoints
angular.module('saved-docs').factory('SavedDocs', ['$resource',
	function($resource) {
		return $resource('api/saved-docs/:savedDocId', { savedDocId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);