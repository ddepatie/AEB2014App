'use strict';

//Docs service used to communicate Docs REST endpoints
angular.module('docs').factory('Docs', ['$resource',
	function($resource) {
		return $resource('api/docs/:docId', { docId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('analytics').factory('Service', ['Analytics', 
	function(Analytics){
		var Service = {
			create: function(doc){
						var analytic = new Analytics ({
							doc: doc._id,
							title: doc.title,
							tags: doc.tags
						});

						// Redirect after save
						analytic.$save(function(response) {
						});
					}
	};
	return Service;
}]);