'use strict';

// Tags controller
angular.module('tags').controller('TagsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tags',
	function($scope, $stateParams, $location, Authentication, Tags ) {
		$scope.authentication = Authentication;

		// Create new Tag
		$scope.create = function() {
			// Create new Tag object
			var tag = new Tags ({
				tag: this.tag
			});

			// Redirect after save
			tag.$save(function(response) {
				$location.path('/admin/tags/' + response._id);

				// Clear form fields
				$scope.tag = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Tag
		$scope.remove = function( tag ) {
			if ( tag ) { tag.$remove();

				for (var i in $scope.tags ) {
					if ($scope.tags [i] === tag ) {
						$scope.tags.splice(i, 1);
					}
				}
			} else {
				$scope.tag.$remove(function() {
					$location.path('/admin/tags');
				});
			}
		};

		// Update existing Tag
		$scope.update = function() {
			var tag = $scope.tag ;

			tag.$update(function() {
				$location.path('/admin/tags/' + tag._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tags
		$scope.find = function() {
			$scope.tags = Tags.query();
		};

		// Find existing Tag
		$scope.findOne = function() {
			$scope.tag = Tags.get({ 
				tagId: $stateParams.tagId
			});
		};
	}
]);