'use strict';

// Configuring the Tags module
angular.module('tags').run(['Menus',
	function(Menus) {
		// Add the Tags dropdown item
		Menus.addMenuItem('topbar', {
			title: 'Tags',
			state: 'tags',
			type: 'dropdown'
		});

		// Add the dropdown list item
		Menus.addSubMenuItem('topbar', 'tags', {
			title: 'List Tags',
			state: 'tags.list'
		});

		// Add the dropdown create item
		Menus.addSubMenuItem('topbar', 'tags', {
			title: 'Create Tag',
			state: 'tags.create'
		});
	}
]);