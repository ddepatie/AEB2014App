'use strict';

// Configuring the Savedocs module
angular.module('savedocs').run(['Menus',
	function(Menus) {
		// Add the Savedocs dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Savedocs',
			state: 'savedocs',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'savedocs', {
			title: 'List Savedocs',
			state: 'savedocs.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'savedocs', {
			title: 'Create Savedoc',
			state: 'savedocs.create'
		});
	}
]);