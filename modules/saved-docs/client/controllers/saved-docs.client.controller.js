'use strict';

// Saved docs controller
angular.module('saved-docs').controller('SavedDocsController', ['$scope', '$stateParams', '$location', 'Authentication', 'SavedDocs',
	function($scope, $stateParams, $location, Authentication, SavedDocs ) {
		$scope.authentication = Authentication;

		// Create new Saved doc
		$scope.create = function() {
			// Create new Saved doc object
			var savedDoc = new SavedDocs ({
				name: this.name
			});

			// Redirect after save
			savedDoc.$save(function(response) {
				$location.path('saved-docs/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Saved doc
		$scope.remove = function( savedDoc ) {
			if ( savedDoc ) { savedDoc.$remove();

				for (var i in $scope.savedDocs ) {
					if ($scope.savedDocs [i] === savedDoc ) {
						$scope.savedDocs.splice(i, 1);
					}
				}
			} else {
				$scope.savedDoc.$remove(function() {
					$location.path('saved-docs');
				});
			}
		};

		// Update existing Saved doc
		$scope.update = function() {
			var savedDoc = $scope.savedDoc ;

			savedDoc.$update(function() {
				$location.path('saved-docs/' + savedDoc._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Saved docs
		$scope.find = function() {
			$scope.savedDocs = SavedDocs.query();
		};

		// Find existing Saved doc
		$scope.findOne = function() {
			$scope.savedDoc = SavedDocs.get({ 
				savedDocId: $stateParams.savedDocId
			});
		};
	}
]);