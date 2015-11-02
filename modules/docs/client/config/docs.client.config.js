'use strict';

// Configuring the Docs module
angular.module('docs').run(['Menus',
	function(Menus) {
		// Add the Docs dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Docs',
			state: 'docs',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'docs', {
			title: 'List Docs',
			state: 'docs.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'docs', {
			title: 'Create Doc',
			state: 'docs.create'
		});
	}
]);