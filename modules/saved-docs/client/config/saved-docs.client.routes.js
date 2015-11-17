'use strict';

//Setting up route
angular.module('saved-docs').config(['$stateProvider',
	function($stateProvider) {
		// Saved docs state routing
		$stateProvider.
		state('saved-docs', {
			abstract: true,
			url: '/saved-docs',
			template: '<ui-view/>'
		}).
		state('saved-docs.list', {
			url: '',
			templateUrl: 'modules/saved-docs/client/views/list-saved-docs.client.view.html',
			data: {
          		roles: ['user', 'admin']
        	}
		}).
		state('saved-docs.view', {
			url: '/:savedDocId',
			templateUrl: 'modules/saved-docs/client/views/view-saved-doc.client.view.html',
			data: {
          		roles: ['user', 'admin']
        	}
		});
	}
]);