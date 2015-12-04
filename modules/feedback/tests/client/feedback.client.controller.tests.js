'use strict';

(function() {
	// Feedback Controller Spec
	describe('Feedback Controller Tests', function() {
		// Initialize global variables
		var FeedbackController,
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

			// Initialize the Feedback controller.
			FeedbackController = $controller('FeedbackController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Feedback object fetched from XHR', inject(function(Feedback) {
			// Create sample Feedback using the Feedback service
			var sampleFeedback = new Feedback({
				name: 'New Feedback'
			});

			// Create a sample Feedback array that includes the new Feedback
			var sampleFeedbacks = [sampleFeedback];

			// Set GET response
			$httpBackend.expectGET('api/feedback').respond(sampleFeedbacks);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.feedback).toEqualData(sampleFeedbacks);
		}));

		it('$scope.findOne() should create an array with one Feedback object fetched from XHR using a feedbackId URL parameter', inject(function(Feedback) {
			// Define a sample Feedback object
			var sampleFeedback = new Feedback({
				name: 'New Feedback'
			});

			// Set the URL parameter
			$stateParams.feedbackId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/feedback\/([0-9a-fA-F]{24})$/).respond(sampleFeedback);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.feedback).toEqualData(sampleFeedback);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Feedback) {
			// Create a sample Feedback object
			var sampleFeedbackPostData = new Feedback({
				name: 'New Feedback'
			});

			// Create a sample Feedback response
			var sampleFeedbackResponse = new Feedback({
				_id: '525cf20451979dea2c000001',
				name: 'New Feedback'
			});

			// Fixture mock form input values
			scope.name = 'New Feedback';

			// Set POST response
			$httpBackend.expectPOST('api/feedback', sampleFeedbackPostData).respond(sampleFeedbackResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Feedback was created
			expect($location.path()).toBe('/feedback/' + sampleFeedbackResponse._id);
		}));

		it('$scope.update() should update a valid Feedback', inject(function(Feedback) {
			// Define a sample Feedback put data
			var sampleFeedbackPutData = new Feedback({
				_id: '525cf20451979dea2c000001',
				name: 'New Feedback'
			});

			// Mock Feedback in scope
			scope.feedback = sampleFeedbackPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/feedback\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/feedback/' + sampleFeedbackPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid feedbackId and remove the Feedback from the scope', inject(function(Feedback) {
			// Create new Feedback object
			var sampleFeedback = new Feedback({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Feedback array and include the Feedback
			scope.feedback = [sampleFeedback];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/feedback\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFeedback);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.feedback.length).toBe(0);
		}));
	});
}());
