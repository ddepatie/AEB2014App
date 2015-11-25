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
		$scope.dropSettings = {
    		scrollableHeight: '300px',
    		scrollable: true,
    		displayProp: 'tag',
    		idProp: '_id',
    		externalIdProp: '',
    		enableSearch: true
		};
		$scope.selectedTags = [];
		

		$scope.healthTopics = ["food safety", "disease", "nutrition", "waste"];
		$scope.economyTopics = ["farmers", "prices", "markets and trade", "consumers"];
		$scope.technologyTopics = ["gmos", "automation", "production methods", "computing"];
		$scope.developmentTopics = ["poverty", "hunger", "sustainability", "aid"];
		$scope.environmentTopics = ["water", "pollution", "land", "climate"];

		// Create new Doc
		$scope.create = function() {
			// Create new Doc object
			var doc = new Docs ({
				title: this.title,
				description: this.description,
				type: this.type,
				url: this.url,
				thumbnail_image: this.thumbnail_image,
				tags: $scope.selectedTags
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

		// Used to add/remove filters on search results page
		$scope.editFilter = function( str ) {

			var flag = false; //flag whether or not filter is in our list

			for (var i = 0; i < $scope.total; i++) {
				if ($scope.filters[i] === str) {
					$scope.filters.splice(i, 1);
					flag = true;
					$scope.total--;
				}
			}

			if (!flag) {
				$scope.filters.push(str);
				$scope.total++;
			}

			// Code to collapse/expand subtopic filters

			if (str === "health") {
				if(!$scope.healthChecked)
					$scope.uncheckSubtopics($scope.healthTopics);
			}

			else if (str === "economy") {
				if(!$scope.economyChecked)
					$scope.uncheckSubtopics($scope.economyTopics);
			}

			else if (str === "technology") {
				if(!$scope.technologyChecked)
					$scope.uncheckSubtopics($scope.technologyTopics);
			}

			else if (str === "development") {
				if(!$scope.developmentChecked)
					$scope.uncheckSubtopics($scope.developmentTopics);
			}

			else if (str === "environment") {
				if(!$scope.environmentChecked)
					$scope.uncheckSubtopics($scope.environmentTopics);
			}
		};

		// Called when topic group is unchecked and collapsed on search results page
		// Removes any subtopic filters (from collapsed group) from our array
		$scope.uncheckSubtopics = function ( arr ) {
			var box;
			for (var i = 0; i < arr.length; i++){
				for (var j = 0; j < $scope.filters.length; j++) {
					if (arr[i] === $scope.filters[j]) {
						box = document.getElementById(arr[i]);
						box.checked = false;
						$scope.filters.splice(j, 1);
						$scope.total--;
					}
				}
			}
		};

		// Used to format desc string and show only first 80 characters
		$scope.generateDescription = function( doc ) {
			var description = doc.description.toString();
			var new_description = "";
			
			if (description.length > 80)
				new_description = description.substring(0,79) + "...";
			else 
				new_description = description;

			return new_description;
		};

		// Used to format tags string and show only first 80 characters 
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

		// Checks if the passed doc contains all the filters in our array
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

		$scope.initialize = function() {

			if ($stateParams.filterId == 1) {
				$scope.healthChecked = true;
				$scope.editFilter('health');
			}
			else if ($stateParams.filterId == 2) {
				$scope.economyChecked = true;
				$scope.editFilter('economy');
			}
			else if ($stateParams.filterId == 3) {
				$scope.technologyChecked = true;
				$scope.editFilter('technology');
			}
			else if ($stateParams.filterId == 4) {
				$scope.developmentChecked = true;
				$scope.editFilter('development');
			}
			else if ($stateParams.filterId == 5) {
				$scope.environmentChecked = true;
				$scope.editFilter('environment');
			}						
		}

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
			if ($stateParams.filterId) { 
				$scope.initialize(); 
			}
			$scope.docs = Docs.query();
			$scope.getTags = Tags.query();
		};

		// Find existing Doc
		$scope.findOne = function() {
			$scope.doc = Docs.get({ 
				docId: $stateParams.docId
			});
		};
	}
]);