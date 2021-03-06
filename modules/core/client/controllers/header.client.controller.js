'use strict';

angular.module('core').controller('HeaderController', ['$scope','$rootScope', '$state', 'Authentication', 'Menus', '$location', 'Tags','Topics',
  function ($scope, $state, $rootScope, Authentication, Menus, $location, Tags, Topics) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;
    $rootScope.searchText = undefined;
    $scope.tags = Tags.query(function() {
            //console.log($scope.tags);

    });
    $scope.topics = Topics.query(function() {
            //console.log($scope.topics);

    });

    $scope.startsWith = function (state, viewValue) {
      // Filter out undesired properties
      if(typeof state === 'string' && !state.toLowerCase().includes(">") && !state.toLowerCase().includes("<") && !state.toLowerCase().includes("unknown")) {
        return state.substr(0, viewValue.length).toLowerCase() === viewValue.toLowerCase();
      }
    };

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.goToResultsPage = function(){
        $location.path("/results");
    };
  }
]);
