'use strict';

angular.module('core')
	.controller('HomeController', ['$scope', 'Authentication','Topics','Tags','Analytics', 'Announcements','Feedback',
  	function ($scope, Authentication, Topics, Tags, Analytics, Announcements,Feedback) {
    	// This provides Authentication context.
    	$scope.authentication = Authentication;

  	}


]);
