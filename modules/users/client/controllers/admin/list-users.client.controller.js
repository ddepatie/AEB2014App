'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$stateParams', '$filter', 'Docs', 'Tags', 'Announcements', 'Admin',
  function ($scope, $stateParams, $filter, Docs, Tags, Announcements, Admin) {
    Admin.query(function (data) {
      $scope.users = data;
      $scope.buildPager();
    });
    Docs.query(function (data){
      $scope.docs = data;
      $scope.buildPager();
    });
    Tags.query(function (data){
      $scope.tags = data;
      $scope.buildPager();
    });
    Announcements.query(function (data){
      $scope.announcements = data;
      $scope.buildPager();
    });
    // Find a list of Docs
    $scope.find = function() {
      $scope.docs = Docs.query();
      $scope.getTags = Tags.query();
    };

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.users, {
        $: $scope.search
      });
      $scope.docsFiltered = $filter('filter')($scope.docs, {
        $: $scope.search
      });
      $scope.tagsFiltered = $filter('filter')($scope.tags, {
        $: $scope.search
      });
      $scope.announcementsFiltered = $filter('filter')($scope.announcements, {
        $: $scope.search
      });
      //console.log($scope.filteredItems.length);
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };
    

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
