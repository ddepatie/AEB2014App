'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Analytics',
      state: 'admin.analytics'
    });

   	Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Add Announcements',
      state: 'admin.announcements'
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Edit About Section',
      state: 'admin.about-edit'
    });

    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Edit Contact Section',
      state: 'admin.contact-edit'
    });
  }
]);
