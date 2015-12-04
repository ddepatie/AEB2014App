'use strict';

// Analytics controller
angular.module('analytics').controller('AnalyticsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Analytics', '$rootScope', 'Service',
	function($scope, $stateParams, $location, Authentication, Analytics, $rootScope, Service ) {
		$scope.authentication = Authentication;

		// Create new Analytic
		$scope.create = function(doc_id, docTitle, docTags) {
			// Create new Analytic object
			var analytic = new Analytics ({
				doc: doc_id,
				title: docTitle,
				tags: docTags
			});

			console.log(doc_id);
			console.log(docTitle);
			console.log(docTags);
			// Redirect after save
			analytic.$save(function(response) {
				console.log("Created");
				// Clear form fields
				$scope.doc = '';
				$scope.title = '';
				$scope.tags = [];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				console.log("Error: " + $scope.error);
			});
		};

		// Remove existing Analytic
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

		// Update existing Analytic
		$scope.update = function() {
			var analytic = $scope.analytic ;

			analytic.$update(function() {
				$location.path('analytics/' + analytic._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Analytics
		$scope.find = function() {
			$scope.analytics = Analytics.query();
		};

		// Find existing Analytic
		$scope.findOne = function() {
			$scope.analytic = Analytics.get({ 
				analyticId: $stateParams.analyticId
			});
		};
	}
]);