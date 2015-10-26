'use strict';

// Configuring the Searches module
angular.module('searches').run(['Menus',
	function(Menus) {
		// Add the Searches dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Searches',
			state: 'searches',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'searches', {
			title: 'List Searches',
			state: 'searches.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'searches', {
			title: 'Create Search',
			state: 'searches.create'
		});
	}
]);