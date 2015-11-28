'use strict';

// Feedback controller
angular.module('feedback').controller('FeedbackController', ['$scope', '$stateParams', '$location', 'Authentication', 'Feedback',
	function($scope, $stateParams, $location, Authentication, Feedback ) {
		$scope.authentication = Authentication;

		// Create new Feedback
		$scope.create = function() {
			// Create new Feedback object
			var feedback = new Feedback ({
				title: this.title,
				text: this.text
			});

			// Redirect after save
			feedback.$save(function(response) {
				$location.path('feedback/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.text = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Feedback
		$scope.remove = function( feedback ) {
			if ( feedback ) { feedback.$remove();

				for (var i in $scope.feedback ) {
					if ($scope.feedback [i] === feedback ) {
						$scope.feedback.splice(i, 1);
					}
				}
			} else {
				$scope.feedback.$remove(function() {
					$location.path('feedback');
				});
			}
		};

		// Update existing Feedback
		$scope.update = function() {
			var feedback = $scope.feedback ;

			feedback.$update(function() {
				$location.path('feedback/' + feedback._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Feedback
		$scope.find = function() {
			$scope.feedback = Feedback.query();
		};

		// Find existing Feedback
		$scope.findOne = function() {
			$scope.feedback = Feedback.get({
				feedbackId: $stateParams.feedbackId
			});
		};
	}
]);
