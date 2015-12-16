'use strict';

(function() {
	// Abouts Controller Spec
	describe('Abouts Controller Tests', function() {
		// Initialize global variables
		var AboutsController,
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

			// Initialize the Abouts controller.
			AboutsController = $controller('AboutsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one About object fetched from XHR', inject(function(Abouts) {
			// Create sample About using the Abouts service
			var sampleAbout = new Abouts({
				text: 'New About'
			});

			// Create a sample Abouts array that includes the new About
			var sampleAbouts = [sampleAbout];

			// Set GET response
			$httpBackend.expectGET('api/abouts').respond(sampleAbouts);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.abouts).toEqualData(sampleAbouts);
		}));

		it('$scope.findOne() should create an array with one About object fetched from XHR using a aboutId URL parameter', inject(function(Abouts) {
			// Define a sample About object
			var sampleAbout = new Abouts({
				text: 'New About'
			});

			// Set the URL parameter
			$stateParams.aboutId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/abouts\/([0-9a-fA-F]{24})$/).respond(sampleAbout);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.about).toEqualData(sampleAbout);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Abouts) {
			// Create a sample About object
			var sampleAboutPostData = new Abouts({
				text: 'New About'
			});

			// Create a sample About response
			var sampleAboutResponse = new Abouts({
				_id: '525cf20451979dea2c000001',
				text: 'New About'
			});

			// Fixture mock form input values
			scope.text = 'New About';

			// Set POST response
			$httpBackend.expectPOST('api/abouts', sampleAboutPostData).respond(sampleAboutResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.text).toEqual('');

			// Test URL redirection after the About was created
			expect($location.path()).toBe('/abouts/' + sampleAboutResponse._id);
		}));

		it('$scope.update() should update a valid About', inject(function(Abouts) {
			// Define a sample About put data
			var sampleAboutPutData = new Abouts({
				_id: '525cf20451979dea2c000001',
				text: 'New About'
			});

			// Mock About in scope
			scope.about = sampleAboutPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/abouts\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/abouts/' + sampleAboutPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid aboutId and remove the About from the scope', inject(function(Abouts) {
			// Create new About object
			var sampleAbout = new Abouts({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Abouts array and include the About
			scope.abouts = [sampleAbout];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/abouts\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAbout);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.abouts.length).toBe(0);
		}));
	});
}());