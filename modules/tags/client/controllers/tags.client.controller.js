'use strict';

// Tags controller
angular.module('tags').controller('TagsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Topics','Tags',
	function($scope, $stateParams, $location, Authentication, Topics,Tags ) {
		$scope.authentication = Authentication;

		//Settings for dropdown menu
		$scope.dropSettings = {
    		scrollableHeight: '300px',
    		scrollable: true,
    		displayProp: 'topic',
    		idProp: '_id',
    		externalIdProp: '_id'
		};
		//Topics selected from dropdowm menu
		$scope.selectedTopics = [];

		//function need for dropdown select dependency
		$scope.getTopicName = function(topicId){
			for (var i = $scope.getTopics.length - 1; i >= 0; i--) {
				if($scope.getTopics[i]._id === topicId){
					return $scope.getTopics[i].topic;
				}
			}
		};

		//called when 'x' is clicke on topic
		$scope.removeTopic = function(topicId){
			//This method removes selected topic with givenID from array selectedTags.
			for (var i = $scope.selectedTopics.length - 1; i >= 0; i--) {
				if($scope.selectedTopics[i]._id === topicId){
					$scope.selectedTopics.splice(i, 1);
					break;
				}
			}
		};

		// Create new Tag
		$scope.create = function() {
			// Create new Tag object
			var tag = new Tags ({
				tag: this.tag,
				topicID: $scope.selectedTopics
			});

			// Redirect after save
			tag.$save(function(response) {
				$location.path('admin/tags/' + response._id);

				// Clear form fields
				$scope.tag = '';
				$scope.selectedTopics = [];
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
			$scope.getTopics = Topics.query();
		};

		// Find existing Tag
		$scope.findOne = function() {
			//TODO: view-html doesnt read object from database
			$scope.tag = Tags.get({ 
				tagId: $stateParams.tagId
			});
		};
	}
]);