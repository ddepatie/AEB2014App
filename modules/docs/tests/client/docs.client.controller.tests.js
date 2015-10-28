'use strict';

(function() {
	// Docs Controller Spec
	describe('Docs Controller Tests', function() {
		// Initialize global variables
		var DocsController,
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

			// Initialize the Docs controller.
			DocsController = $controller('DocsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Doc object fetched from XHR', inject(function(Docs) {
			// Create sample Doc using the Docs service
			var sampleDoc = new Docs({
				name: 'New Doc'
			});

			// Create a sample Docs array that includes the new Doc
			var sampleDocs = [sampleDoc];

			// Set GET response
			$httpBackend.expectGET('api/docs').respond(sampleDocs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.docs).toEqualData(sampleDocs);
		}));

		it('$scope.findOne() should create an array with one Doc object fetched from XHR using a docId URL parameter', inject(function(Docs) {
			// Define a sample Doc object
			var sampleDoc = new Docs({
				name: 'New Doc'
			});

			// Set the URL parameter
			$stateParams.docId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/docs\/([0-9a-fA-F]{24})$/).respond(sampleDoc);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.doc).toEqualData(sampleDoc);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Docs) {
			// Create a sample Doc object
			var sampleDocPostData = new Docs({
				name: 'New Doc'
			});

			// Create a sample Doc response
			var sampleDocResponse = new Docs({
				_id: '525cf20451979dea2c000001',
				name: 'New Doc'
			});

			// Fixture mock form input values
			scope.name = 'New Doc';

			// Set POST response
			$httpBackend.expectPOST('api/docs', sampleDocPostData).respond(sampleDocResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Doc was created
			expect($location.path()).toBe('/docs/' + sampleDocResponse._id);
		}));

		it('$scope.update() should update a valid Doc', inject(function(Docs) {
			// Define a sample Doc put data
			var sampleDocPutData = new Docs({
				_id: '525cf20451979dea2c000001',
				name: 'New Doc'
			});

			// Mock Doc in scope
			scope.doc = sampleDocPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/docs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/docs/' + sampleDocPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid docId and remove the Doc from the scope', inject(function(Docs) {
			// Create new Doc object
			var sampleDoc = new Docs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Docs array and include the Doc
			scope.docs = [sampleDoc];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/docs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDoc);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.docs.length).toBe(0);
		}));
	});
}());