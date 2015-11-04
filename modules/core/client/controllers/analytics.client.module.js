'use strict';

angular.module('analytics').controller('HomeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Analytics',
	function($scope, $stateParams, $location, Authentication, Analytics ) {
		$scope.authentication = Authentication;

		// Create new Savedoc
		$scope.create = function() {
			// Create new Savedoc object
			var analytic = new Analytics ({
				name: this.name
			});

			// Redirect after save
			analytic.$save(function(response) {
				$location.path('analytic/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.count = function(){

			$scope.Analytics = Analytics.count();

		};

		// Remove existing Savedoc
		$scope.remove = function( analytic ) {
			if ( analytic ) { analytic.$remove();

				for (var i in $scope.analytics ) {
					if ($scope.analytics [i] === analytic ) {
						$scope.analytics.splice(i, 1);
					}
				}
			} else {
				$scope.analytic.$remove(function() {
					$location.path('analytics');
				});
			}
		};

		// Update existing Savedoc
		$scope.update = function() {
			var analytic = $scope.analytic ;

			analytic.$update(function() {
				$location.path('analytics/' + analytic._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Savedocs
		$scope.find = function() {
			$scope.analytics = Analytics.query();
		};

		// Find existing Savedoc
		$scope.findOne = function() {
			$scope.analytic = Analytics.get({ 
				savedocId: $stateParams.savedocId
			});
		};
	}
]);