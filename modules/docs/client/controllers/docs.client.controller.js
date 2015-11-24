'use strict';

// Docs controller
angular.module('docs').controller('DocsController', ['$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Docs', 'Tags',
	function($scope, $rootScope, $stateParams, $location, Authentication, Docs, Tags ) {
		$scope.authentication = Authentication;
		$scope.filters = [];
		$scope.total = 0;
		$scope.healthChecked = false;
		$scope.economyChecked = false;
		$scope.technologyChecked = false;
		$scope.developmentChecked = false;
		$scope.environmentChecked = false;
		
		// Create new Doc
		$scope.create = function() {
			// Create new Doc object
			var doc = new Docs ({
				title: this.title,
				description: this.description,
				type: this.type,
				url: this.url,
				thumbnail_image: this.thumbnail_image,
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

		$scope.editFilter = function( str ) {
			var flag = false;
			for (var i = 0; i < $scope.total; i++) {
				if ($scope.filters[i] === str) {
					$scope.filters.splice(i, 1);
					flag = true;
					$scope.total--;
				}
			}

			if (str === "health")
				$scope.healthChecked = !$scope.healthChecked;

			else if (str === "economy")
				$scope.economyChecked = !$scope.economyChecked;

			else if (str === "technology")
				$scope.technologyChecked = !$scope.technologyChecked;

			else if (str === "development")
				$scope.developmentChecked = !$scope.developmentChecked;

			else if (str === "environment")
				$scope.environmentChecked = !$scope.environmentChecked;

			if (!flag) {
				$scope.filters.push(str);
				$scope.total++;
			}
		};

		$scope.generateDescription = function( doc ) {
			var description = doc.description.toString();
			var new_description = "";
			
			if (description.length > 80)
				new_description = description.substring(0,79) + "...";
			else 
				new_description = description;

			return new_description;
		};

		$scope.generateTags = function( doc ) {
			var tags = doc.tags.toString();
			var new_tags = "";

			for (var i = 0; i < tags.length && i < 80; i++) {
				if (tags.charAt(i) === ',' && tags.charAt(i+1) !== ' ')
					new_tags += ", ";
				else
					new_tags += tags.charAt(i);
			}

			if (tags.length > 80)
				new_tags += "...";

			return new_tags;
		};

		$scope.checkFilters = function( doc ) {
  			var flag = true;

  			for (var i = 0; i < $scope.total; i++) {
  				if (doc.tags.indexOf($scope.filters[i]) === -1)
  					flag = false;
  			}
  			return flag;
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
			$scope.tags = Tags.query();
		};

		// Find existing Doc
		$scope.findOne = function() {
			$scope.doc = Docs.get({ 
				docId: $stateParams.docId
			});
		};
	}
]);