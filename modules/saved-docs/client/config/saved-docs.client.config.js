'use strict';

// Configuring the Saved docs module
angular.module('saved-docs').run(['Menus',
	function(Menus) {
		// Add the Saved docs dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Saved Docs',
			state: 'saved-docs',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'saved-docs', {
			title: 'List Saved Docs',
			state: 'saved-docs.list'
		});
	}
]);