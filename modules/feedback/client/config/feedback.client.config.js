'use strict';

// Configuring the Feedback module
angular.module('feedback').run(['Menus',
	function(Menus) {
		// Add the Feedback dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Feedback',
			state: 'feedback',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'feedback', {
			title: 'List Feedback',
			state: 'feedback.list',
			roles: ['admin']
		});

		Menus.addSubMenuItem('topbar', 'feedback', {
			title: 'Create Feedback',
			state: 'feedback.create'
		});
	}
]);
