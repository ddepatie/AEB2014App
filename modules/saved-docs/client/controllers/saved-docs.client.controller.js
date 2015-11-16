'use strict';

// Saved docs controller
angular.module('saved-docs').controller('SavedDocsController', ['$scope', '$stateParams', '$location', 'Authentication', 'SavedDocs', 
	function($scope, $stateParams, $location, Authentication, SavedDocs ) {
		$scope.authentication = Authentication;

		// Create new Saved doc
		this.create = function(newDoc, newTitle, newDescription, newType, newUrl, newThumbnail_image, newTags) {
			// Create new Saved doc object
			var savedDoc = new SavedDocs ({
				doc: newDoc,
				title: newTitle,
				description: newDescription,
				type: newType,
				url: newUrl,
				thumbnail_image: newThumbnail_image,
				tags: newTags
			});

			// Redirect after save
			savedDoc.$save(function(response) {
				/*Notify.sendMsg('NewSavedDoc', {'id': response._id});*/
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

		$scope.userMatch = function(authUser) {
			return function(userSavedDoc){
				return userSavedDoc.user._id === authUser;
			};
		};

		this.hasDoc = function(authUser, docId) {
			for (var i = 0; i <= $scope.savedDocs.length; ++i) {
				if(i === $scope.savedDocs.length)
					return false;
				if(authUser === $scope.savedDocs[i].user._id && docId === $scope.savedDocs[i].doc) {
					return true;
				}
			}
		};

		this.removeByDocId = function(authUser, docId) {
			for (var i in $scope.savedDocs) {
				if (authUser === $scope.savedDocs[i].user._id && docId === $scope.savedDocs[i].doc) {
					$scope.savedDocs[i].$remove();
					$scope.savedDocs.splice(i, 1);
				}
			}
		};
	}
]);

/*angular.module('saved-docs').directive('', ['SavedDocs', 'Notify', 
	function(Customers, Notify) {
		return {
			restrict: 'A',
			transclude: true,
			link: function(scope, element, attrs){
				Notify.getMsg('NewCustomer', function(event, data) {
					scope.customersCtrl.customers = Customers.query();
				});
			}
		};
}]);*/