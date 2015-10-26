'use strict';

(function() {
	// Savedocs Controller Spec
	describe('Savedocs Controller Tests', function() {
		// Initialize global variables
		var SavedocsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Savedocs controller.
			SavedocsController = $controller('SavedocsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Savedoc object fetched from XHR', inject(function(Savedocs) {
			// Create sample Savedoc using the Savedocs service
			var sampleSavedoc = new Savedocs({
				name: 'New Savedoc'
			});

			// Create a sample Savedocs array that includes the new Savedoc
			var sampleSavedocs = [sampleSavedoc];

			// Set GET response
			$httpBackend.expectGET('api/savedocs').respond(sampleSavedocs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.savedocs).toEqualData(sampleSavedocs);
		}));

		it('$scope.findOne() should create an array with one Savedoc object fetched from XHR using a savedocId URL parameter', inject(function(Savedocs) {
			// Define a sample Savedoc object
			var sampleSavedoc = new Savedocs({
				name: 'New Savedoc'
			});

			// Set the URL parameter
			$stateParams.savedocId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/savedocs\/([0-9a-fA-F]{24})$/).respond(sampleSavedoc);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.savedoc).toEqualData(sampleSavedoc);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Savedocs) {
			// Create a sample Savedoc object
			var sampleSavedocPostData = new Savedocs({
				name: 'New Savedoc'
			});

			// Create a sample Savedoc response
			var sampleSavedocResponse = new Savedocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Savedoc'
			});

			// Fixture mock form input values
			scope.name = 'New Savedoc';

			// Set POST response
			$httpBackend.expectPOST('api/savedocs', sampleSavedocPostData).respond(sampleSavedocResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Savedoc was created
			expect($location.path()).toBe('/savedocs/' + sampleSavedocResponse._id);
		}));

		it('$scope.update() should update a valid Savedoc', inject(function(Savedocs) {
			// Define a sample Savedoc put data
			var sampleSavedocPutData = new Savedocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Savedoc'
			});

			// Mock Savedoc in scope
			scope.savedoc = sampleSavedocPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/savedocs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/savedocs/' + sampleSavedocPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid savedocId and remove the Savedoc from the scope', inject(function(Savedocs) {
			// Create new Savedoc object
			var sampleSavedoc = new Savedocs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Savedocs array and include the Savedoc
			scope.savedocs = [sampleSavedoc];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/savedocs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSavedoc);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.savedocs.length).toBe(0);
		}));
	});
}());