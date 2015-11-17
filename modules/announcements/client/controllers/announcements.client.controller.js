'use strict';

// Announcements controller
angular.module('announcements').controller('AnnouncementsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Announcements',
	function($scope, $stateParams, $location, Authentication, Announcements ) {
		$scope.authentication = Authentication;

		// Create new Announcement
		$scope.create = function() {
			// Create new Announcement object
			var announcement = new Announcements ({
				title: this.title,
				text: this.text
			});

			// Redirect after save
			announcement.$save(function(response) {
				$location.path('announcements/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.text = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Announcement
		$scope.remove = function( announcement ) {
			if ( announcement ) { announcement.$remove();

				for (var i in $scope.announcements ) {
					if ($scope.announcements [i] === announcement ) {
						$scope.announcements.splice(i, 1);
					}
				}
			} else {
				$scope.announcement.$remove(function() {
					$location.path('announcements');
				});
			}
		};

		// Update existing Announcement
		$scope.update = function() {
			var announcement = $scope.announcement ;

			announcement.$update(function() {
				$location.path('announcements/' + announcement._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Announcements
		$scope.find = function() {
			$scope.announcements = Announcements.query();
		};

		// Find existing Announcement
		$scope.findOne = function() {
			$scope.announcement = Announcements.get({ 
				announcementId: $stateParams.announcementId
			});
		};
	}
]);