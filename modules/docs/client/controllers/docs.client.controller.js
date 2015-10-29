'use strict';

// Docs controller
angular.module('docs').controller('DocsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Docs',
	function($scope, $stateParams, $location, Authentication, Docs ) {
		$scope.authentication = Authentication;

		// Create new Doc
		$scope.create = function() {
			// Create new Doc object
			var doc = new Docs ({
				title: this.title,
				description: this.description,
				type: this.type,
				url: this.url,
				tags: this.tags
			});

			// Redirect after save
			doc.$save(function(response) {
				$location.path('docs/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.description = '';
				$scope.type = '';
				$scope.url = '';
				$scope.tags = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.getPowerpointSrc = function (url) {
		  return "http://docs.google.com/gview?url=" + url + "&embedded=true";
		};

		// Remove existing Doc
		$scope.remove = function( doc ) {
			if ( doc ) { doc.$remove();

				for (var i in $scope.docs ) {
					if ($scope.docs [i] === doc ) {
						$scope.docs.splice(i, 1);
					}
				}
			} else {
				$scope.doc.$remove(function() {
					$location.path('docs');
				});
			}
		};

		// Update existing Doc
		$scope.update = function() {
			var doc = $scope.doc ;

			doc.$update(function() {
				$location.path('docs/' + doc._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Docs
		$scope.find = function() {
			$scope.docs = Docs.query();
		};

		// Find existing Doc
		$scope.findOne = function() {
			$scope.doc = Docs.get({ 
				docId: $stateParams.docId
			});
		};
	}
]);