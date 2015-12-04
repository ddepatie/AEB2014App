'use strict';

(function() {
	// Analytics Controller Spec
	describe('Analytics Controller Tests', function() {
		// Initialize global variables
		var AnalyticsController,
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

			// Initialize the Analytics controller.
			AnalyticsController = $controller('AnalyticsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Analytic object fetched from XHR', inject(function(Analytics) {
			// Create sample Analytic using the Analytics service
			var sampleAnalytic = new Analytics({
				name: 'New Analytic'
			});

			// Create a sample Analytics array that includes the new Analytic
			var sampleAnalytics = [sampleAnalytic];

			// Set GET response
			$httpBackend.expectGET('api/analytics').respond(sampleAnalytics);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.analytics).toEqualData(sampleAnalytics);
		}));

		it('$scope.findOne() should create an array with one Analytic object fetched from XHR using a analyticId URL parameter', inject(function(Analytics) {
			// Define a sample Analytic object
			var sampleAnalytic = new Analytics({
				name: 'New Analytic'
			});

			// Set the URL parameter
			$stateParams.analyticId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/analytics\/([0-9a-fA-F]{24})$/).respond(sampleAnalytic);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.analytic).toEqualData(sampleAnalytic);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Analytics) {
			// Create a sample Analytic object
			var sampleAnalyticPostData = new Analytics({
				name: 'New Analytic'
			});

			// Create a sample Analytic response
			var sampleAnalyticResponse = new Analytics({
				_id: '525cf20451979dea2c000001',
				name: 'New Analytic'
			});

			// Fixture mock form input values
			scope.name = 'New Analytic';

			// Set POST response
			$httpBackend.expectPOST('api/analytics', sampleAnalyticPostData).respond(sampleAnalyticResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Analytic was created
			expect($location.path()).toBe('/analytics/' + sampleAnalyticResponse._id);
		}));

		it('$scope.update() should update a valid Analytic', inject(function(Analytics) {
			// Define a sample Analytic put data
			var sampleAnalyticPutData = new Analytics({
				_id: '525cf20451979dea2c000001',
				name: 'New Analytic'
			});

			// Mock Analytic in scope
			scope.analytic = sampleAnalyticPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/analytics\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/analytics/' + sampleAnalyticPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid analyticId and remove the Analytic from the scope', inject(function(Analytics) {
			// Create new Analytic object
			var sampleAnalytic = new Analytics({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Analytics array and include the Analytic
			scope.analytics = [sampleAnalytic];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/analytics\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAnalytic);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.analytics.length).toBe(0);
		}));
	});
}());