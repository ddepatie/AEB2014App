'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'mean';
  var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ngMessages', 'ui.router', 'ui.bootstrap', 'ui.utils', 'angularFileUpload','angularjs-dropdown-multiselect'];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider',
  function ($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(["$rootScope", "$state", "Authentication", function ($rootScope, $state, Authentication) {

  // Check authentication before changing state
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
      var allowed = false;
      toState.data.roles.forEach(function (role) {
        if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
          allowed = true;
          return true;
        }
      });

      if (!allowed) {
        event.preventDefault();
        if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
          $state.go('forbidden');
        } else {
          $state.go('authentication.signin').then(function () {
            storePreviousState(toState, toParams);
          });
        }
      }
    }
  });

  // Record previous state
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    storePreviousState(fromState, fromParams);
  });

  // Store previous state
  function storePreviousState(state, params) {
    // only store this state if it shouldn't be ignored 
    if (!state.data || !state.data.ignoreState) {
      $state.previous = {
        state: state,
        params: params,
        href: $state.href(state, params)
      };
    }
  }
}]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('abouts');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('analytics');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('announcements');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('chat');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('contacts');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('app');
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('docs');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('feedback');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('saved-docs');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('tags');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('topics');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users', ['core']);
ApplicationConfiguration.registerModule('users.admin', ['core.admin']);
ApplicationConfiguration.registerModule('users.admin.routes', ['core.admin.routes']);

'use strict';

//Setting up route
angular.module('abouts').config(['$stateProvider',
	function($stateProvider) {
		// Abouts state routing
/*		$stateProvider.
		state('abouts', {
			abstract: true,
			url: '/abouts',
			template: '<ui-view/>'
		}).
		state('abouts.list', {
			url: '',
			templateUrl: 'modules/abouts/client/views/list-abouts.client.view.html'
		}).
		state('abouts.create', {
			url: '/create',
			templateUrl: 'modules/abouts/client/views/create-about.client.view.html'
		}).
		state('abouts.view', {
			url: '/:aboutId',
			templateUrl: 'modules/abouts/client/views/view-about.client.view.html'
		}).
		state('abouts.edit', {
			url: '/:aboutId/edit',
			templateUrl: 'modules/abouts/client/views/edit-about.client.view.html'
		});*/
	}
]);
'use strict';

// Abouts controller
angular.module('abouts').controller('AboutsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Abouts',
	function($scope, $stateParams, $location, Authentication, Abouts ) {
		$scope.authentication = Authentication;
		$scope.abouts = Abouts.query();

		// Create new About
		$scope.create = function() {
			// Create new About object
			var about = new Abouts ({
				text: this.text
			});

			// Redirect after save
			about.$save(function(response) {
				$location.path('abouts/' + response._id);

				// Clear form fields
				$scope.text = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing About
		$scope.remove = function( about ) {
			if ( about ) { about.$remove();

				for (var i in $scope.abouts ) {
					if ($scope.abouts [i] === about ) {
						$scope.abouts.splice(i, 1);
					}
				}
			} else {
				$scope.about.$remove(function() {
					$location.path('abouts');
				});
			}
		};

		// Update existing About
		$scope.update = function(thisAbout) {

			thisAbout.$update(function() {
				$location.path('/');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find existing About
		$scope.findOne = function() {
			$scope.about = Abouts.get({ 
				aboutId: $stateParams.aboutId
			});
		};
	}
]);
'use strict';

//Abouts service used to communicate Abouts REST endpoints
angular.module('abouts').factory('Abouts', ['$resource',
	function($resource) {
		return $resource('api/abouts/:aboutId', { aboutId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('analytics').config(['$stateProvider',
	function($stateProvider) {
		// Analytics state routing
/*		$stateProvider.
		state('analytics', {
			abstract: true,
			url: '/analytics',
			template: '<ui-view/>'
		}).
		state('analytics.list', {
			url: '',
			templateUrl: 'modules/analytics/client/views/list-analytics.client.view.html'
		}).
		state('analytics.create', {
			url: '/create',
			templateUrl: 'modules/analytics/client/views/create-analytic.client.view.html'
		}).
		state('analytics.view', {
			url: '/:analyticId',
			templateUrl: 'modules/analytics/client/views/view-analytic.client.view.html'
		}).
		state('analytics.edit', {
			url: '/:analyticId/edit',
			templateUrl: 'modules/analytics/client/views/edit-analytic.client.view.html'
		});*/
	}
]);
'use strict';

// Analytics controller
angular.module('analytics').controller('AnalyticsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Analytics', '$rootScope', 'Service',
	function($scope, $stateParams, $location, Authentication, Analytics, $rootScope, Service ) {
		$scope.authentication = Authentication;

		// Create new Analytic
		$scope.create = function(doc_id, docTitle, docTags) {
			// Create new Analytic object
			var analytic = new Analytics ({
				doc: doc_id,
				title: docTitle,
				tags: docTags
			});

			console.log(doc_id);
			console.log(docTitle);
			console.log(docTags);
			// Redirect after save
			analytic.$save(function(response) {
				console.log("Created");
				// Clear form fields
				$scope.doc = '';
				$scope.title = '';
				$scope.tags = [];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				console.log("Error: " + $scope.error);
			});
		};

		// Remove existing Analytic
		$scope.remove = function( analytic ) {
			if ( analytic ) { analytic.$remove();

				for (var i in $scope.analytics ) {
					if ($scope.analytics [i] === analytic ) {
						$scope.analytics.splice(i, 1);
					}
				}
			} else {
				$scope.analytic.$remove(function() {
					$location.path('analytics');
				});
			}
		};

		// Update existing Analytic
		$scope.update = function() {
			var analytic = $scope.analytic ;

			analytic.$update(function() {
				$location.path('analytics/' + analytic._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Analytics
		$scope.find = function() {
			$scope.analytics = Analytics.query();
		};

		// Find existing Analytic
		$scope.findOne = function() {
			$scope.analytic = Analytics.get({ 
				analyticId: $stateParams.analyticId
			});
		};
	}
]);
'use strict';

//Analytics service used to communicate Analytics REST endpoints
angular.module('analytics').factory('Analytics', ['$resource',
	function($resource) {
		return $resource('api/analytics/:analyticId', { analyticId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('announcements').config(['$stateProvider',
	function($stateProvider) {
		// Announcements state routing
		$stateProvider.
		state('announcements', {
			abstract: true,
			url: '/announcements',
			template: '<ui-view/>'
		}).
		state('announcements.list', {
			url: '',
			templateUrl: 'modules/announcements/client/views/list-announcements.client.view.html'
		}).
		state('announcements.create', {
			url: '/create',
			templateUrl: 'modules/announcements/client/views/create-announcement.client.view.html',
			data: {
          		roles: ['admin']
        	}
		}).
		state('announcements.view', {
			url: '/:announcementId',
			templateUrl: 'modules/announcements/client/views/view-announcement.client.view.html'
		}).
		state('announcements.edit', {
			url: '/:announcementId/edit',
			templateUrl: 'modules/announcements/client/views/edit-announcement.client.view.html',
			data: {
          		roles: ['admin']
        	}
		});
	}
]);
'use strict';

// Announcements controller
angular.module('announcements').controller('AnnouncementsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Announcements',
	function($scope, $stateParams, $location, Authentication, Announcements ) {
		$scope.authentication = Authentication;

		// Create new Announcement
		$scope.create = function() {
			// Create new Announcement object
			var announcement = new Announcements ({
				title: this.title,
				text: this.text
			});

			// Redirect after save
			announcement.$save(function(response) {
				$location.path('announcements/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.text = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Announcement
		$scope.remove = function( announcement ) {
			if ( announcement ) { announcement.$remove();

				for (var i in $scope.announcements ) {
					if ($scope.announcements [i] === announcement ) {
						$scope.announcements.splice(i, 1);
					}
				}
			} else {
				$scope.announcement.$remove(function() {
					$location.path('announcements');
				});
			}
		};

		// Update existing Announcement
		$scope.update = function() {
			var announcement = $scope.announcement ;

			announcement.$update(function() {
				$location.path('announcements/' + announcement._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Announcements
		$scope.find = function() {
			$scope.announcements = Announcements.query();
		};

		// Find existing Announcement
		$scope.findOne = function() {
			$scope.announcement = Announcements.get({ 
				announcementId: $stateParams.announcementId
			});
		};
	}
]);
'use strict';

//Announcements service used to communicate Announcements REST endpoints
angular.module('announcements').factory('Announcements', ['$resource',
	function($resource) {
		return $resource('api/announcements/:announcementId', { announcementId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
/*'use strict';

// Configuring the Chat module
angular.module('chat').run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Chat',
      state: 'chat'
    });
  }
]);*/

/*'use strict';

// Configure the 'chat' module routes
angular.module('chat').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('chat', {
        url: '/chat',
        templateUrl: 'modules/chat/client/views/chat.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);*/

'use strict';

// Create the 'chat' controller
angular.module('chat').controller('ChatController', ['$scope', '$location', 'Authentication', 'Socket',
  function ($scope, $location, Authentication, Socket) {
    // Create a messages array
    $scope.messages = [];

    // If user is not signed in then redirect back home
    if (!Authentication.user) {
      $location.path('/');
    }

    // Make sure the Socket is connected
    if (!Socket.socket) {
      Socket.connect();
    }

    // Add an event listener to the 'chatMessage' event
    Socket.on('chatMessage', function (message) {
      $scope.messages.unshift(message);
    });

    // Create a controller method for sending messages
    $scope.sendMessage = function () {
      // Create a new message object
      var message = {
        text: this.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);

      // Clear the message text
      this.messageText = '';
    };

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      Socket.removeListener('chatMessage');
    });
  }
]);

'use strict';

//Setting up route
angular.module('contacts').config(['$stateProvider',
	function($stateProvider) {
/*		// Contacts state routing
		$stateProvider.
		state('contacts', {
			abstract: true,
			url: '/contacts',
			template: '<ui-view/>'
		}).
		state('contacts.list', {
			url: '',
			templateUrl: 'modules/contacts/client/views/list-contacts.client.view.html'
		}).
		state('contacts.create', {
			url: '/create',
			templateUrl: 'modules/contacts/client/views/create-contact.client.view.html'
		}).
		state('contacts.view', {
			url: '/:contactId',
			templateUrl: 'modules/contacts/client/views/view-contact.client.view.html'
		}).
		state('contacts.edit', {
			url: '/:contactId/edit',
			templateUrl: 'modules/contacts/client/views/edit-contact.client.view.html'
		});*/
	}
]);
'use strict';

// Contacts controller
angular.module('contacts').controller('ContactsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contacts',
	function($scope, $stateParams, $location, Authentication, Contacts ) {
		$scope.authentication = Authentication;
		$scope.contacts = Contacts.query();

		// Create new Contact
		$scope.create = function() {
			// Create new Contact object
			var contact = new Contacts ({
				text: this.text
			});

			// Redirect after save
			contact.$save(function(response) {
				$location.path('contacts/' + response._id);

				// Clear form fields
				$scope.text = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Contact
		$scope.remove = function( contact ) {
			if ( contact ) { contact.$remove();

				for (var i in $scope.contacts ) {
					if ($scope.contacts [i] === contact ) {
						$scope.contacts.splice(i, 1);
					}
				}
			} else {
				$scope.contact.$remove(function() {
					$location.path('contacts');
				});
			}
		};

		// Update existing Contact
		$scope.update = function(thisContact) {
			
			thisContact.$update(function() {
				$location.path('/');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find existing Contact
		$scope.findOne = function() {
			$scope.contact = Contacts.get({ 
				contactId: $stateParams.contactId
			});
		};
	}
]);
'use strict';

//Contacts service used to communicate Contacts REST endpoints
angular.module('contacts').factory('Contacts', ['$resource',
	function($resource) {
		return $resource('api/contacts/:contactId', { contactId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin',
      type: 'dropdown',
      roles: ['admin']
    });
  }
]);

'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      });
  }
]);

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('health', {
      url: '/health',
      templateUrl: 'modules/core/client/views/health.client.view.html'
    })
    .state('economy', {
      url: '/economy',
      templateUrl: 'modules/core/client/views/economy.client.view.html'
    })
    .state('technology', {
      url: '/technology',
      templateUrl: 'modules/core/client/views/technology.client.view.html'
    })
    .state('development', {
      url: '/development',
      templateUrl: 'modules/core/client/views/development.client.view.html'
    })
    .state('environment', {
      url: '/environment',
      templateUrl: 'modules/core/client/views/environment.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope','$rootScope', '$state', 'Authentication', 'Menus', '$location', 'Tags','Topics',
  function ($scope, $state, $rootScope, Authentication, Menus, $location, Tags, Topics) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;
    $rootScope.searchText = undefined;
    $scope.tags = Tags.query(function() {
            //console.log($scope.tags);

    });
    $scope.topics = Topics.query(function() {
            //console.log($scope.topics);

    });

    $scope.startsWith = function (state, viewValue) {
      // Filter out undesired properties
      if(typeof state === 'string' && !state.toLowerCase().includes(">") && !state.toLowerCase().includes("<") && !state.toLowerCase().includes("unknown")) {
        return state.substr(0, viewValue.length).toLowerCase() === viewValue.toLowerCase();
      }
    };

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });

    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.goToResultsPage = function(){
        $location.path("/results");
    };
  }
]);

'use strict';

angular.module('core')
	.controller('HomeController', ['$scope', 'Authentication','Topics','Tags','Analytics', 'Announcements','Feedback',
  	function ($scope, Authentication, Topics, Tags, Analytics, Announcements,Feedback) {
    	// This provides Authentication context.
    	$scope.authentication = Authentication;

  	}


]);

angular.module('app', ['angularFileUpload'])

    .controller('AppController', ['$scope', 'FileUploader', function($scope, FileUploader) {
        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }]);

'use strict';

/**
 * Edits by Ryan Hutchison
 * Credit: https://github.com/paulyoder/angular-bootstrap-show-errors */

angular.module('core')
  .directive('showErrors', ['$timeout', '$interpolate', function ($timeout, $interpolate) {
    var linkFn = function (scope, el, attrs, formCtrl) {
      var inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses,
        initCheck = false,
        showValidationMessages = false,
        blurred = false;

      options = scope.$eval(attrs.showErrors) || {};
      showSuccess = options.showSuccess || false;
      inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
      inputNgEl = angular.element(inputEl);
      inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

      if (!inputName) {
        throw 'show-errors element has no child input elements with a \'name\' attribute class';
      }

      var reset = function () {
        return $timeout(function () {
          el.removeClass('has-error');
          el.removeClass('has-success');
          showValidationMessages = false;
        }, 0, false);
      };

      scope.$watch(function () {
        return formCtrl[inputName] && formCtrl[inputName].$invalid;
      }, function (invalid) {
        return toggleClasses(invalid);
      });

      scope.$on('show-errors-check-validity', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          initCheck = true;
          showValidationMessages = true;

          return toggleClasses(formCtrl[inputName].$invalid);
        }
      });

      scope.$on('show-errors-reset', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          return reset();
        }
      });

      toggleClasses = function (invalid) {
        el.toggleClass('has-error', showValidationMessages && invalid);
        if (showSuccess) {
          return el.toggleClass('has-success', showValidationMessages && !invalid);
        }
      };
    };

    return {
      restrict: 'A',
      require: '^form',
      compile: function (elem, attrs) {
        if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
          if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
            throw 'show-errors element does not have the \'form-group\' or \'input-group\' class';
          }
        }
        return linkFn;
      }
    };
}]);

'use strict';

angular.module('core').factory('authInterceptor', ['$q', '$injector',
  function ($q, $injector) {
    return {
      responseError: function(rejection) {
        if (!rejection.config.ignoreAuthModule) {
          switch (rejection.status) {
            case 401:
              $injector.get('$state').transitionTo('authentication.signin');
              break;
            case 403:
              $injector.get('$state').transitionTo('forbidden');
              break;
          }
        }
        // otherwise, default behaviour
        return $q.reject(rejection);
      }
    };
  }
]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [
  function () {
    // Define a set of default roles
    this.defaultRoles = ['user', 'admin'];

    // Define the menus object
    this.menus = {};

    // A private function for rendering decision
    var shouldRender = function (user) {
      if (!!~this.roles.indexOf('*')) {
        return true;
      } else {
        if(!user) {
          return false;
        }
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      }

      return false;
    };

    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exist');
        }
      } else {
        throw new Error('MenuId was not provided');
      }

      return false;
    };

    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      return this.menus[menuId];
    };

    // Add new menu object by menu id
    this.addMenu = function (menuId, options) {
      options = options || {};

      // Create the new menu
      this.menus[menuId] = {
        roles: options.roles || this.defaultRoles,
        items: options.items || [],
        shouldRender: shouldRender
      };

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      delete this.menus[menuId];
    };

    // Add menu item object
    this.addMenuItem = function (menuId, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Push new menu item
      this.menus[menuId].items.push({
        title: options.title || '',
        state: options.state || '',
        type: options.type || 'item',
        class: options.class,
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.defaultRoles : options.roles),
        position: options.position || 0,
        items: [],
        shouldRender: shouldRender
      });

      // Add submenu items
      if (options.items) {
        for (var i in options.items) {
          this.addSubMenuItem(menuId, options.state, options.items[i]);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Add submenu item object
    this.addSubMenuItem = function (menuId, parentItemState, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === parentItemState) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: options.title || '',
            state: options.state || '',
            roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : options.roles),
            position: options.position || 0,
            shouldRender: shouldRender
          });
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemState) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === menuItemState) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemState) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].state === submenuItemState) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    //Adding the topbar menu
    this.addMenu('topbar', {
      roles: ['*']
    });
  }
]);

'use strict';

// Create the Socket.io wrapper service
angular.module('core').service('Socket', ['Authentication', '$state', '$timeout',
  function (Authentication, $state, $timeout) {
    // Connect to Socket.io server
    this.connect = function () {
      // Connect only when authenticated
      if (Authentication.user) {
        this.socket = io();
      }
    };
    this.connect();

    // Wrap the Socket.io 'on' method
    this.on = function (eventName, callback) {
      if (this.socket) {
        this.socket.on(eventName, function (data) {
          $timeout(function () {
            callback(data);
          });
        });
      }
    };

    // Wrap the Socket.io 'emit' method
    this.emit = function (eventName, data) {
      if (this.socket) {
        this.socket.emit(eventName, data);
      }
    };

    // Wrap the Socket.io 'removeListener' method
    this.removeListener = function (eventName) {
      if (this.socket) {
        this.socket.removeListener(eventName);
      }
    };
  }
]);

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
'use strict';

//Setting up route
angular.module('docs').config(['$stateProvider',
	function($stateProvider) {
		// Docs state routing
		$stateProvider.
		state('docs', {
			abstract: true,
			url: '/docs',
			template: '<ui-view/>'
		}).
		state('docs.list', {
			url: '',
			templateUrl: 'modules/docs/client/views/list-docs.client.view.html'
		}).
		state('docs.create', {
			url: '/create',
			templateUrl: 'modules/docs/client/views/create-doc.client.view.html',
			data: {
	          roles: ['user', 'admin']
	        }
		}).
		state('docs.view', {
			url: '/:docId',
			templateUrl: 'modules/docs/client/views/view-doc.client.view.html'
		}).
		state('docs.edit', {
			url: '/:docId/edit',
			templateUrl: 'modules/docs/client/views/edit-doc.client.view.html',
			data: {
	          roles: ['user', 'admin']
	        }
		}).
		state('results', {
			url: '/results',
			templateUrl: 'modules/docs/client/views/show-results.client.view.html'
		}).
		state('results-init', {
			url: '/results/:filterId',
			templateUrl: 'modules/docs/client/views/show-results.client.view.html'
		});
	}
]);
'use strict';

//filter to allow embedded google doc viewer to work with custom src
angular.module('docs')
.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

// Docs controller
angular.module('docs').controller('DocsController', ['$scope','$rootScope', '$stateParams', '$location', 'Authentication', 'Docs', 'Tags', 'Analytics', 'Service',
	function($scope, $rootScope, $stateParams, $location, Authentication, Docs, Tags, Analytics, Service ) {
		$scope.authentication = Authentication;
		$scope.filters = [];
		
		//Total number of filters checked on search page
		$scope.total = 0;
		 
		//Bools to control subfilters (display when true, hide and uncheck when false)
		$scope.healthChecked = false;
		$scope.economyChecked = false;
		$scope.technologyChecked = false;
		$scope.developmentChecked = false;
		$scope.environmentChecked = false;

		//Settings for dropdown menu
		$scope.dropSettings = {
    		scrollableHeight: '300px',
    		scrollable: true,
    		displayProp: 'tag',
    		idProp: '_id',
    		externalIdProp: '',
    		enableSearch: true
		};
		//Tags selected from dropdowm menu
		$scope.selectedTags = [];

		//Subfilters by each main filter (topic)
		//TODO: Populate these from DB and allow admin to add subfilters
		$scope.healthTopics = ["food safety", "disease", "nutrition", "waste"];
		$scope.economyTopics = ["farmers", "prices", "markets and trade", "consumers"];
		$scope.technologyTopics = ["gmos", "automation", "production methods", "computing"];
		$scope.developmentTopics = ["poverty", "hunger", "sustainability", "aid"];
		$scope.environmentTopics = ["water", "pollution", "land", "climate"];

		// Create new Doc
		$scope.create = function() {
			// Create new Doc object
			var doc = new Docs ({
				title: this.title,
				description: this.description,
				type: this.type,
				url: this.url,
				thumbnail_image: this.thumbnail_image,
				tags: $scope.selectedTags,
				viewCount: 0
			});

			// Redirect after save
			doc.$save(function(response) {
				$location.path('docs/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.description = '';
				$scope.type = '';
				$scope.url = '';

				$scope.tags = '';

				$scope.selectedTags = [];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		Docs.query(function (data){
      		$scope.thesedocs = data;
      	 });

		// Used to add/remove filters on search results page
		$scope.editFilter = function( str ) {

			var flag = false; //flag whether or not filter is in our list

			for (var i = 0; i < $scope.total; i++) {
				if ($scope.filters[i] === str) {
					$scope.filters.splice(i, 1);
					flag = true;
					$scope.total--;
				}
			}

			if (!flag) {
				$scope.filters.push(str);
				$scope.total++;
			}

			// Code to collapse/expand subtopic filters

			if (str === "health") {
				if(!$scope.healthChecked)
					$scope.uncheckSubtopics($scope.healthTopics);
			}

			else if (str === "economy") {
				if(!$scope.economyChecked)
					$scope.uncheckSubtopics($scope.economyTopics);
			}

			else if (str === "technology") {
				if(!$scope.technologyChecked)
					$scope.uncheckSubtopics($scope.technologyTopics);
			}

			else if (str === "development") {
				if(!$scope.developmentChecked)
					$scope.uncheckSubtopics($scope.developmentTopics);
			}

			else if (str === "environment") {
				if(!$scope.environmentChecked)
					$scope.uncheckSubtopics($scope.environmentTopics);
			}
		};

		// Called when topic group is unchecked and collapsed on search results page
		// Removes any subtopic filters (from collapsed group) from our array
		$scope.uncheckSubtopics = function ( arr ) {
			var box;
			for (var i = 0; i < arr.length; i++){
				for (var j = 0; j < $scope.filters.length; j++) {
					if (arr[i] === $scope.filters[j]) {
						box = document.getElementById(arr[i]);
						box.checked = false;
						$scope.filters.splice(j, 1);
						$scope.total--;
					}
				}
			}
		};

		// Used to format desc string and show only first 80 characters
		$scope.generateDescription = function( doc ) {
			var description = doc.description.toString();
			var new_description = "";
			
			if (description.length > 80)
				new_description = description.substring(0,79) + "...";
			else 
				new_description = description;

			return new_description;
		};

		// Used to format tags string and show only first 80 characters 
		$scope.generateTags = function( doc ) {
			var tagsList = doc.tags;
			var tags = "";
			var new_tags = "";
			
			for (var i = 0; i < tagsList.length; i++) {
				tags += tagsList[i].tag;
				if (i+1 !== tagsList.length)
					tags += ", ";
			}

			if (tags.length > 80)
				new_tags = tags.substring(0,79) + "...";

			else
				new_tags = tags;

			return new_tags;
		};

		// Checks if the passed doc's tags contain all the filters in our array
		$scope.checkFilters = function( doc ) {
  			var flag = true;
  			var tagsList = doc.tags;
  			for (var i = 0; i < $scope.total && flag; i++) {
  				flag = false;
  				for (var j = 0; j < tagsList.length; j++) {
	  				if (tagsList[j].tag === $scope.filters[i])
	  					flag = true;
  				}
  			}
  			return flag;
		};

		// Remove existing Doc
		$scope.remove = function( doc ) {
			if ( doc ) { doc.$remove();

				for (var i in $scope.docs ) {
					if ($scope.docs [i] === doc ) {
						$scope.docs.splice(i, 1);
					}
				}
			} else {
				$scope.doc.$remove(function() {
					$location.path('docs');
				});
			}
		};

		//Used when routing to search page from home using category buttons
		//Checks filter according to which button was clicked
		$scope.initialize = function() {
			if (parseInt($stateParams.filterId) === 1) {
				$scope.healthChecked = true;
				$scope.editFilter('health');
			}
			else if (parseInt($stateParams.filterId) === 2) {
				$scope.economyChecked = true;
				$scope.editFilter('economy');
			}
			else if (parseInt($stateParams.filterId) === 3) {
				$scope.technologyChecked = true;
				$scope.editFilter('technology');
			}
			else if (parseInt($stateParams.filterId) === 4) {
				$scope.developmentChecked = true;
				$scope.editFilter('development');
			}
			else if (parseInt($stateParams.filterId) === 5) {
				$scope.environmentChecked = true;
				$scope.editFilter('environment');
			}						
		};

		//called when 'x' is clicked
		$scope.removeTag = function(tagId){
			//This methoed removes selected tag with givenID from array selectedTags.
			for (var i = $scope.selectedTags.length - 1; i >= 0; i--) {
				if($scope.selectedTags[i]._id === tagId){
					$scope.selectedTags.splice(i, 1);
					break;
				}
			}
		};

		// Update existing Doc
		$scope.update = function() {
			var doc = $scope.doc ;
			//console.log(doc.viewCount);
			doc.$update(function() {
				$location.path('docs/' + doc._id);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		//Update view count upon viewing a doc
		 $scope.updateViewCount = function(){
		 	var doc = $scope.doc;
		 	//var viewCount = $scope.viewCount;
		 	//doc.viewCount += 1;
		 	//console.log("this is the docCOunt: " + doc.viewCount);
		 	doc.$updateViewCount(function(response) {
				$location.path('docs/' + response._id +'viewCount');
				}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		 };

		// Find a list of Docs
		$scope.find = function() {
			if ($stateParams.filterId) { 
				$scope.initialize(); 
			}
			$scope.docs = Docs.query();
			$scope.getTags = Tags.query();
		};

		// Find existing Doc
		$scope.findOne = function() {
			$scope.doc = Docs.get({
				docId: $stateParams.docId
			});			
		};

		//?? Needs documentation
		$scope.findOne2 = function() {
			$scope.doc2 = Docs.get({
				docId: $stateParams.docId
			}).$promise.then(function(doc2){
				Service.create(doc2);
			});			
		};

		//Incerement view count upon viewing a doc
		$scope.incrementViewCount = function(doc){

			doc.viewCount += 1;
			console.log(doc.viewCount);
			

			// Redirect after save
			doc.$update(function(response) {
				$location.path('docs/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.description = '';
				$scope.type = '';
				$scope.url = '';

				$scope.tags = '';

				$scope.selectedTags = [];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
'use strict';

//Docs service used to communicate Docs REST endpoints
angular.module('docs').factory('Docs', ['$resource',
	function($resource) {
		return $resource('api/docs/:docId', { docId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('analytics').factory('Service', ['Analytics', 
	function(Analytics){
		var Service = {
			create: function(doc){
						var analytic = new Analytics ({
							doc: doc._id,
							title: doc.title,
							tags: doc.tags
						});

						// Redirect after save
						analytic.$save(function(response) {
						});
					}
	};
	return Service;
}]);
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

'use strict';

//Setting up route
angular.module('feedback').config(['$stateProvider',
	function($stateProvider) {
		// Feedback state routing
		$stateProvider.
		state('feedback', {
			abstract: true,
			url: '/feedback',
			template: '<ui-view/>'
		}).
		state('feedback.list', {
			url: '',
			templateUrl: 'modules/feedback/client/views/list-feedback.client.view.html',
			data: {
							roles: ['admin']
					}
		}).
		state('feedback.create', {
			url: '/create',
			templateUrl: 'modules/feedback/client/views/create-feedback.client.view.html'
		}).
		state('feedback.view', {
			url: '/:feedbackId',
			templateUrl: 'modules/feedback/client/views/view-feedback.client.view.html',
		/*	data: {
							roles: ['admin']
					}*/
		}).
		state('feedback.edit', {
			url: '/:feedbackId/edit',
			templateUrl: 'modules/feedback/client/views/edit-feedback.client.view.html',
			data: {
          		roles: ['admin']
        	}
		});
	}
]);

'use strict';

// Feedback controller
angular.module('feedback').controller('FeedbackController', ['$scope', '$stateParams', '$location', 'Authentication', 'Feedback',
	function($scope, $stateParams, $location, Authentication, Feedback ) {
		$scope.authentication = Authentication;

		// Create new Feedback
		$scope.create = function() {
			// Create new Feedback object
			var feedback = new Feedback ({
				title: this.title,
				text: this.text
			});
      
			// Redirect after save
			feedback.$save(function(response) {
				$location.path('feedback/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.text = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Feedback
		$scope.remove = function( feedback ) {
			if ( feedback ) { feedback.$remove();

				for (var i in $scope.feedback ) {
					if ($scope.feedback [i] === feedback ) {
						$scope.feedback.splice(i, 1);
					}
				}
			} else {
				$scope.feedback.$remove(function() {
					$location.path('feedback');
				});
			}
		};

		// Update existing Feedback
		$scope.update = function() {
			var feedback = $scope.feedback ;

			feedback.$update(function() {
				$location.path('feedback/' + feedback._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Feedback
		$scope.find = function() {
			$scope.feedback = Feedback.query();
		};

		// Find existing Feedback
		$scope.findOne = function() {
			$scope.feedback = Feedback.get({
				feedbackId: $stateParams.feedbackId
			});
		};
	}
]);

'use strict';

//Feedback service used to communicate Announcements REST endpoints
angular.module('feedback').factory('Feedback', ['$resource',
	function($resource) {
		return $resource('api/feedback/:feedbackId', { feedbackId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

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
'use strict';

// Saved docs controller
angular.module('saved-docs').controller('SavedDocsController', ['$scope', '$stateParams', '$location', 'Authentication', 'SavedDocs', '$window',
	function($scope, $stateParams, $location, Authentication, SavedDocs, $window ) {
		$scope.authentication = Authentication;

		// Create new Saved doc
		this.create = function(newDoc, newTitle, newDescription, newType, newUrl, newThumbnail_image, newTags) {
			// Create new Saved doc object
			var savedDoc = new SavedDocs ({
				doc: newDoc,
				title: newTitle,
				description: newDescription,
				type: newType,
				url: newUrl,
				thumbnail_image: newThumbnail_image,
				tags: newTags
			});

			// Redirect after save
			savedDoc.$save(function(response) {
				$window.location.reload();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Saved doc
		$scope.remove = function( savedDoc ) {
			if ( savedDoc ) { savedDoc.$remove();

				for (var i in $scope.savedDocs ) {
					if ($scope.savedDocs [i] === savedDoc ) {
						$scope.savedDocs.splice(i, 1);
					}
				}
			} else {
				$scope.savedDoc.$remove(function() {
					$location.path('saved-docs');
				});
			}
		};

		// Update existing Saved doc
		$scope.update = function() {
			var savedDoc = $scope.savedDoc ;

			savedDoc.$update(function() {
				$location.path('saved-docs/' + savedDoc._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Saved docs
		$scope.find = function() {
			$scope.savedDocs = SavedDocs.query();
		};

		// Find existing Saved doc
		$scope.findOne = function() {
			$scope.savedDoc = SavedDocs.get({ 
				savedDocId: $stateParams.savedDocId
			});
		};

		$scope.userMatch = function(authUser) {
			return function(userSavedDoc){
				return userSavedDoc.user._id === authUser;
			};
		};

		this.hasDoc = function(authUser, docId) {
			for (var i = 0; i <= $scope.savedDocs.length; ++i) {
				if(i === $scope.savedDocs.length)
					return false;
				if(authUser === $scope.savedDocs[i].user._id && docId === $scope.savedDocs[i].doc) {
					return true;
				}
			}
		};

		this.removeByDocId = function(authUser, docId) {
			for (var i = 0; i < $scope.savedDocs.length-1; i++) {
				if (String(authUser) === String($scope.savedDocs[i].user._id) && String(docId) === String($scope.savedDocs[i].doc)) {
					$scope.savedDocs[i].$remove();
					$scope.savedDocs.splice(i, 1);
					window.location.reload();
				}
			}
		};
	}
]);

'use strict';

//Saved docs service used to communicate Saved docs REST endpoints
angular.module('saved-docs').factory('SavedDocs', ['$resource',
	function($resource) {
		return $resource('api/saved-docs/:savedDocId', { savedDocId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('tags').config(['$stateProvider',
	function($stateProvider) {
		// Tags state routing
		$stateProvider.
		state('tags', {
			abstract: true,
			url: '/admin/tags',
			template: '<ui-view/>'
		}).
		state('tags.list', {
			url: '',
			templateUrl: 'modules/tags/client/views/list-tags.client.view.html',
			data: {
				roles: ['admin']
			}
		}).
		state('tags.create', {
			url: '/create',
			templateUrl: 'modules/tags/client/views/create-tag.client.view.html',
			data: {
				roles: ['admin']
			}
		}).
		state('tags.view', {
			url: '/:tagId',
			templateUrl: 'modules/tags/client/views/view-tag.client.view.html',
			data: {
				roles: ['admin']
			}
		}).
		state('tags.edit', {
			url: '/:tagId/edit',
			templateUrl: 'modules/tags/client/views/edit-tag.client.view.html',
			data: {
				roles: ['admin']
			}
		});
	}
]);
'use strict';

// Tags controller
angular.module('tags').controller('TagsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Topics','Tags',
	function($scope, $stateParams, $location, Authentication, Topics,Tags ) {
		$scope.authentication = Authentication;

		//Settings for dropdown menu
		$scope.dropSettings = {
    		scrollableHeight: '300px',
    		scrollable: true,
    		displayProp: 'topic',
    		idProp: '_id',
    		externalIdProp: '_id'
		};
		//Topics selected from dropdowm menu
		$scope.selectedTopics = [];

		//function need for dropdown select dependency
		$scope.getTopicName = function(topicId){
			for (var i = $scope.getTopics.length - 1; i >= 0; i--) {
				if($scope.getTopics[i]._id === topicId){
					return $scope.getTopics[i].topic;
				}
			}
		};

		//called when 'x' is clicke on topic
		$scope.removeTopic = function(topicId){
			//This method removes selected topic with givenID from array selectedTags.
			for (var i = $scope.selectedTopics.length - 1; i >= 0; i--) {
				if($scope.selectedTopics[i]._id === topicId){
					$scope.selectedTopics.splice(i, 1);
					break;
				}
			}
		};

		// Create new Tag
		$scope.create = function() {
			// Create new Tag object
			var tag = new Tags ({
				tag: this.tag,
				topicID: $scope.selectedTopics
			});

			// Redirect after save
			tag.$save(function(response) {
				$location.path('admin/tags/' + response._id);

				// Clear form fields
				$scope.tag = '';
				$scope.selectedTopics = [];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Tag
		$scope.remove = function( tag ) {
			if ( tag ) { tag.$remove();

				for (var i in $scope.tags ) {
					if ($scope.tags [i] === tag ) {
						$scope.tags.splice(i, 1);
					}
				}
			} else {
				$scope.tag.$remove(function() {
					$location.path('/admin/tags');
				});
			}
		};

		// Update existing Tag
		$scope.update = function() {
			var tag = $scope.tag ;

			tag.$update(function() {
				$location.path('/admin/tags/' + tag._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tags
		$scope.find = function() {
			$scope.tags = Tags.query();
			$scope.getTopics = Topics.query();
		};

		// Find existing Tag
		$scope.findOne = function() {
			//TODO: view-html doesnt read object from database
			$scope.tag = Tags.get({ 
				tagId: $stateParams.tagId
			});
		};
	}
]);
'use strict';

//Tags service used to communicate Tags REST endpoints
angular.module('tags').factory('Tags', ['$resource',
	function($resource) {
		return $resource('api/tags/:tagId', { tagId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

//Setting up route
angular.module('topics').config(['$stateProvider',
	function($stateProvider) {
		// Topics state routing
		$stateProvider.
		state('topics', {
			abstract: true,
			url: '/topics',
			template: '<ui-view/>'
		}).
		state('topics.list', {
			url: '',
			templateUrl: 'modules/topics/client/views/list-topics.client.view.html'
		}).
		state('topics.create', {
			url: '/create',
			templateUrl: 'modules/topics/client/views/create-topic.client.view.html'
		}).
		state('topics.view', {
			url: '/:topicId',
			templateUrl: 'modules/topics/client/views/view-topic.client.view.html'
		}).
		state('topics.edit', {
			url: '/:topicId/edit',
			templateUrl: 'modules/topics/client/views/edit-topic.client.view.html'
		});
	}
]);
'use strict';

// Topics controller
angular.module('topics').controller('TopicsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Topics',
	function($scope, $stateParams, $location, Authentication, Topics ) {
		$scope.authentication = Authentication;

		// Create new Topic
		$scope.create = function() {
			// Create new Topic object
			var topic = new Topics ({
				name: this.name
			});

			// Redirect after save
			topic.$save(function(response) {
				$location.path('topics/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Topic
		$scope.remove = function( topic ) {
			if ( topic ) { topic.$remove();

				for (var i in $scope.topics ) {
					if ($scope.topics [i] === topic ) {
						$scope.topics.splice(i, 1);
					}
				}
			} else {
				$scope.topic.$remove(function() {
					$location.path('topics');
				});
			}
		};

		// Update existing Topic
		$scope.update = function() {
			var topic = $scope.topic ;

			topic.$update(function() {
				$location.path('topics/' + topic._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Topics
		$scope.find = function() {
			$scope.topics = Topics.query();
		};

		// Find existing Topic
		$scope.findOne = function() {
			$scope.topic = Topics.get({ 
				topicId: $stateParams.topicId
			});
		};
	}
]);
'use strict';

//Topics service used to communicate Topics REST endpoints
angular.module('topics').factory('Topics', ['$resource',
	function($resource) {
		return $resource('api/topics/:topicId', { topicId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
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
      title: 'List Tags',
      state: 'tags.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Create Tag',
      state: 'tags.create'
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

'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController'
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.announcements', {
        url: '/announcements',
        templateUrl: 'modules/announcements/client/views/create-announcement.client.view.html',
        controller: 'AnnouncementsController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.about-edit', {
        url: '/edit-about',
        templateUrl: 'modules/abouts/client/views/edit-about.client.view.html',
        controller: 'AboutsController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.contact-edit', {
        url: '/edit-contact',
        templateUrl: 'modules/contacts/client/views/edit-contact.client.view.html',
        controller: 'ContactsController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.analytics', {
        url: '/analytics',
        templateUrl: 'modules/users/client/views/admin/analytics.client.view.html',
        controller: 'UserListController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      });
  }
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);

'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
      });
  }
]);

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

'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
  function ($scope, $state, Authentication, userResolve) {
    $scope.authentication = Authentication;
    $scope.user = userResolve;

    $scope.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = $scope.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication', 'PasswordValidator',
  function ($scope, $stateParams, $http, $location, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    //If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    $scope.askForPasswordReset = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'forgotPasswordForm');

        return false;
      }

      $http.post('/api/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;

      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };

    // Change user password
    $scope.resetUserPassword = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'resetPasswordForm');

        return false;
      }

      $http.post('/api/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;

        // Attach user profile
        Authentication.user = response;

        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('ChangePasswordController', ['$scope', '$http', 'Authentication', 'PasswordValidator',
  function ($scope, $http, Authentication, PasswordValidator) {
    $scope.user = Authentication.user;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Change user password
    $scope.changeUserPassword = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'passwordForm');

        return false;
      }

      $http.post('/api/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.$broadcast('show-errors-reset', 'passwordForm');
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('ChangeProfilePictureController', ['$scope', '$timeout', '$window', 'Authentication', 'FileUploader',
  function ($scope, $timeout, $window, Authentication, FileUploader) {
    $scope.user = Authentication.user;
    $scope.imageURL = $scope.user.profileImageURL;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/users/picture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.user.profileImageURL;
    };
  }
]);

'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('SocialAccountsController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;

    // Check if there are additional accounts
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
    };

    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('SettingsController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    $scope.user = Authentication.user;
  }
]);

'use strict';

angular.module('users')
  .directive('passwordValidator', ['PasswordValidator', function(PasswordValidator) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.unshift(function (password) {
          var result = PasswordValidator.getResult(password);
          var strengthIdx = 0;

          // Strength Meter - visual indicator for users
          var strengthMeter = [
            { color: 'danger', progress: '25' },
            { color: 'warning', progress: '50' },
            { color: 'primary', progress: '75' },
            { color: 'success', progress: '100' }
          ];
          var strengthMax = strengthMeter.length;

          if (result.errors.length < strengthMeter.length) {
            strengthIdx = strengthMeter.length - result.errors.length - 1;
          }

          scope.strengthColor = strengthMeter[strengthIdx].color;
          scope.strengthProgress = strengthMeter[strengthIdx].progress;

          if (result.errors.length) {
            scope.popoverMsg = PasswordValidator.getPopoverMsg();
            scope.passwordErrors = result.errors;
            modelCtrl.$setValidity('strength', false);
            return undefined;
          } else {
            scope.popoverMsg = '';
            modelCtrl.$setValidity('strength', true);
            return password;
          }
        });
      }
    };
}]);

'use strict';

angular.module('users')
  .directive('passwordVerify', function() {
    return {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, modelCtrl) {
        scope.$watch(function() {
          var combined;
          if (scope.passwordVerify || modelCtrl.$viewValue) {
            combined = scope.passwordVerify + '_' + modelCtrl.$viewValue;
          }
          return combined;
        }, function(value) {
          if (value) {
            modelCtrl.$parsers.unshift(function(viewValue) {
              var origin = scope.passwordVerify;
              if (origin !== viewValue) {
                modelCtrl.$setValidity('passwordVerify', false);
                return undefined;
              } else {
                modelCtrl.$setValidity('passwordVerify', true);
                return viewValue;
              }
            });
          }
        });
     }
    };
});

'use strict';

// Users directive used to force lowercase input
angular.module('users').directive('lowercase', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (input) {
        return input ? input.toLowerCase() : '';
      });
      element.css('text-transform', 'lowercase');
    }
  };
});

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window',
  function ($window) {
    var auth = {
      user: $window.user
    };

    return auth;
  }
]);

'use strict';

// PasswordValidator service used for testing the password strength
angular.module('users').factory('PasswordValidator', ['$window',
  function ($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    return {
      getResult: function (password) {
        var result = owaspPasswordStrengthTest.test(password);
        return result;
      },
      getPopoverMsg: function () {
        var popoverMsg = 'Please enter a passphrase or password with greater than 6 characters and less than 30 characters.';
        return popoverMsg;
      }
    };
  }
]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
  function ($resource) {
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//TODO this should be Users service
angular.module('users.admin').factory('Admin', ['$resource',
  function ($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
