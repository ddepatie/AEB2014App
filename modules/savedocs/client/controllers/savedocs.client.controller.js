'use strict';

// Savedocs controller
angular.module('savedocs').controller('SavedocsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Savedocs',
	function($scope, $stateParams, $location, Authentication, Savedocs ) {
		$scope.authentication = Authentication;

		// Create new Savedoc
		$scope.create = function() {
			// Create new Savedoc object
			var savedoc = new Savedocs ({
				name: this.name
			});

			// Redirect after save
			savedoc.$save(function(response) {
				$location.path('savedocs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Savedoc
		$scope.remove = function( savedoc ) {
			if ( savedoc ) { savedoc.$remove();

				for (var i in $scope.savedocs ) {
					if ($scope.savedocs [i] === savedoc ) {
						$scope.savedocs.splice(i, 1);
					}
				}
			} else {
				$scope.savedoc.$remove(function() {
					$location.path('savedocs');
				});
			}
		};

		// Update existing Savedoc
		$scope.update = function() {
			var savedoc = $scope.savedoc ;

			savedoc.$update(function() {
				$location.path('savedocs/' + savedoc._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Savedocs
		$scope.find = function() {
			$scope.savedocs = Savedocs.query();
		};

		// Find existing Savedoc
		$scope.findOne = function() {
			$scope.savedoc = Savedocs.get({ 
				savedocId: $stateParams.savedocId
			});
		};
	}
]);