'use strict';

(function() {
	// Saved docs Controller Spec
	describe('Saved docs Controller Tests', function() {
		// Initialize global variables
		var SavedDocsController,
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

			// Initialize the Saved docs controller.
			SavedDocsController = $controller('SavedDocsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Saved doc object fetched from XHR', inject(function(SavedDocs) {
			// Create sample Saved doc using the Saved docs service
			var sampleSavedDoc = new SavedDocs({
				name: 'New Saved doc'
			});

			// Create a sample Saved docs array that includes the new Saved doc
			var sampleSavedDocs = [sampleSavedDoc];

			// Set GET response
			$httpBackend.expectGET('api/saved-docs').respond(sampleSavedDocs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.savedDocs).toEqualData(sampleSavedDocs);
		}));

		it('$scope.findOne() should create an array with one Saved doc object fetched from XHR using a savedDocId URL parameter', inject(function(SavedDocs) {
			// Define a sample Saved doc object
			var sampleSavedDoc = new SavedDocs({
				name: 'New Saved doc'
			});

			// Set the URL parameter
			$stateParams.savedDocId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/saved-docs\/([0-9a-fA-F]{24})$/).respond(sampleSavedDoc);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.savedDoc).toEqualData(sampleSavedDoc);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(SavedDocs) {
			// Create a sample Saved doc object
			var sampleSavedDocPostData = new SavedDocs({
				name: 'New Saved doc'
			});

			// Create a sample Saved doc response
			var sampleSavedDocResponse = new SavedDocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Saved doc'
			});

			// Fixture mock form input values
			scope.name = 'New Saved doc';

			// Set POST response
			$httpBackend.expectPOST('api/saved-docs', sampleSavedDocPostData).respond(sampleSavedDocResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Saved doc was created
			expect($location.path()).toBe('/saved-docs/' + sampleSavedDocResponse._id);
		}));

		it('$scope.update() should update a valid Saved doc', inject(function(SavedDocs) {
			// Define a sample Saved doc put data
			var sampleSavedDocPutData = new SavedDocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Saved doc'
			});

			// Mock Saved doc in scope
			scope.savedDoc = sampleSavedDocPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/saved-docs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/saved-docs/' + sampleSavedDocPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid savedDocId and remove the Saved doc from the scope', inject(function(SavedDocs) {
			// Create new Saved doc object
			var sampleSavedDoc = new SavedDocs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Saved docs array and include the Saved doc
			scope.savedDocs = [sampleSavedDoc];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/saved-docs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSavedDoc);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.savedDocs.length).toBe(0);
		}));
	});
}());