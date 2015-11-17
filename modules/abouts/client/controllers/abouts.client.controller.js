'use strict';

// Abouts controller
angular.module('abouts').controller('AboutsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Abouts',
	function($scope, $stateParams, $location, Authentication, Abouts ) {
		$scope.authentication = Authentication;
		$scope.abouts = Abouts.query();

		// Create new About
		$scope.create = function() {
			// Create new About object
			var about = new Abouts ({
				text: this.text
			});

			// Redirect after save
			about.$save(function(response) {
				$location.path('abouts/' + response._id);

				// Clear form fields
				$scope.text = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing About
		$scope.remove = function( about ) {
			if ( about ) { about.$remove();

				for (var i in $scope.abouts ) {
					if ($scope.abouts [i] === about ) {
						$scope.abouts.splice(i, 1);
					}
				}
			} else {
				$scope.about.$remove(function() {
					$location.path('abouts');
				});
			}
		};

		// Update existing About
		$scope.update = function(thisAbout) {

			thisAbout.$update(function() {
				$location.path('/');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find existing About
		$scope.findOne = function() {
			$scope.about = Abouts.get({ 
				aboutId: $stateParams.aboutId
			});
		};
	}
]);