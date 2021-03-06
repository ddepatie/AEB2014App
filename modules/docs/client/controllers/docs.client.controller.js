'use strict';

//filter to allow embedded google doc viewer to work with custom src
angular.module('docs')
.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

// Docs controller
angular.module('docs').controller('DocsController', ['$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Docs', 'Tags', 'Analytics', 'Service',
	function($scope, $rootScope, $stateParams, $location, Authentication, Docs, Tags, Analytics, Service ) {
		$scope.authentication = Authentication;
		$scope.filters = [];

		//Total number of filters checked on search page
		$scope.total = 0;

		//Bools to control subfilters (display when true, hide and uncheck when false)
		$scope.healthChecked = false;
		$scope.economyChecked = false;
		$scope.technologyChecked = false;
		$scope.developmentChecked = false;
		$scope.environmentChecked = false;

		//Settings for dropdown menu
		$scope.dropSettings = {
    		scrollableHeight: '300px',
    		scrollable: true,
    		displayProp: 'tag',
    		idProp: '_id',
    		externalIdProp: '',
    		enableSearch: true
		};
		//Tags selected from dropdowm menu
		$scope.selectedTags = [];

		//Subfilters by each main filter (topic)
		//TODO: Populate these from DB and allow admin to add subfilters
		$scope.healthTopics = ["food safety", "disease", "nutrition", "waste"];
		$scope.economyTopics = ["farmers", "prices", "markets and trade", "consumers"];
		$scope.technologyTopics = ["gmos", "automation", "production methods", "computing"];
		$scope.developmentTopics = ["poverty", "hunger", "sustainability", "aid"];
		$scope.environmentTopics = ["water", "pollution", "land", "climate"];

		// Create new Doc
		$scope.create = function() {
			// Create new Doc object
			var doc = new Docs ({
				title: this.title,//store the title
				description: this.description,///store the description
				type: this.type,//type can be either jpeg, docx, ppptx, pdf,
				url: this.url,//url of location of document
				thumbnail_image: this.thumbnail_image,//url of the thumbnail you want to use
				tags: $scope.selectedTags,//select the tags of the doc from a dropdown
				viewCount: 0//number of views of each document, automatically set to zero
			});

			// Redirect after save
			doc.$save(function(response) {
				$location.path('docs/' + response._id);//store the doc at a specific location

				// Clear form fields
				$scope.title = '';
				$scope.description = '';
				$scope.type = '';
				$scope.url = '';

				$scope.tags = '';

				$scope.selectedTags = [];
			}, function(errorResponse) {//If there is an error in creation display it
				$scope.error = errorResponse.data.message;
			});
		};
		Docs.query(function (data){
      		$scope.thesedocs = data;//query function that pulls in all the docs
      	 });

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
			var tagsList = doc.tags;
			var tags = "";
			var new_tags = "";

			for (var i = 0; i < tagsList.length; i++) {
				tags += tagsList[i].tag;
				if (i+1 !== tagsList.length)
					tags += ", ";
			}

			if (tags.length > 80)
				new_tags = tags.substring(0,79) + "...";

			else
				new_tags = tags;

			return new_tags;
		};

		// Checks if the passed doc's tags contain all the filters in our array
		$scope.checkFilters = function( doc ) {
  			var flag = true;
  			var tagsList = doc.tags;
  			for (var i = 0; i < $scope.total && flag; i++) {
  				flag = false;
  				for (var j = 0; j < tagsList.length; j++) {
	  				if (tagsList[j].tag === $scope.filters[i])
	  					flag = true;
  				}
  			}
  			return flag;
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

		//Used when routing to search page from home using category buttons
		//Checks filter according to which button was clicked
		$scope.initialize = function() {
			if (parseInt($stateParams.filterId) === 1) {
				$scope.healthChecked = true;
				$scope.editFilter('health');
			}
			else if (parseInt($stateParams.filterId) === 2) {
				$scope.economyChecked = true;
				$scope.editFilter('economy');
			}
			else if (parseInt($stateParams.filterId) === 3) {
				$scope.technologyChecked = true;
				$scope.editFilter('technology');
			}
			else if (parseInt($stateParams.filterId) === 4) {
				$scope.developmentChecked = true;
				$scope.editFilter('development');
			}
			else if (parseInt($stateParams.filterId) === 5) {
				$scope.environmentChecked = true;
				$scope.editFilter('environment');
			}
		};

		//called when 'x' is clicked
		$scope.removeTag = function(tagId){
			//This methoed removes selected tag with givenID from array selectedTags.
			for (var i = $scope.selectedTags.length - 1; i >= 0; i--) {
				if($scope.selectedTags[i]._id === tagId){
					$scope.selectedTags.splice(i, 1);
					break;
				}
			}
		};

		// Update existing Doc
		$scope.update = function() {
			var doc = $scope.doc ;
			//console.log(doc.viewCount);
			doc.$update(function() {
				$location.path('docs/' + doc._id);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		//Update view count upon viewing a doc
		 $scope.updateViewCount = function(){
		 	var doc = $scope.doc;
		 	//var viewCount = $scope.viewCount;
		 	//doc.viewCount += 1;
		 	//console.log("this is the docCOunt: " + doc.viewCount);
		 	doc.$updateViewCount(function(response) {
				$location.path('docs/' + response._id +'viewCount');
				}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		 };

		// Find a list of Docs
		$scope.find = function() {
			if ($stateParams.filterId) {
				$scope.initialize();
			}
			$scope.docs = Docs.query();//returns all docs to the docs page
			$scope.getTags = Tags.query();//returns all tags
		};

		// Find existing Doc, used when you want to view a single document
		$scope.findOne = function() {
			$scope.doc = Docs.get({
				docId: $stateParams.docId
			});
		};

		//?? Needs documentation
		$scope.findOne2 = function() {
			$scope.doc2 = Docs.get({
				docId: $stateParams.docId
			}).$promise.then(function(doc2){
				Service.create(doc2);
			});
		};

		//Incerement view count upon viewing a doc
		$scope.incrementViewCount = function(doc){
			//simply add one to the current doc's view count and then save
			doc.viewCount += 1;
			//console.log(doc.viewCount);
      
			//saves the document again in the same location after updating the viewcount
			doc.$update(function(response) {
				$location.path('docs/' + response._id);
				$scope.title = '';
				$scope.description = '';
				$scope.type = '';
				$scope.url = '';

				$scope.tags = '';

				$scope.selectedTags = [];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
