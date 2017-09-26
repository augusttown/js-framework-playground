describe('basic app', function () {
    
	var $rootScope;
	var $controller;			
	var $httpBackend;
	
	var basicController;
	var basicService;
	var mockupBasicService;
	
	var $scope = {};
	
	// mock up angular module		
	beforeEach(module('app', function ($provide) {
		//
		//Mock up service to test controller 
		$provide.service('mockupBasicService', function() {
		    this.data = 5678;
			this.getData = function() {
				return 5678; 
		    };		    
		});
		//
	}));
	//
	beforeEach(inject(function(_basicService_, _$rootScope_, _$httpBackend_){
		//			
		basicService = _basicService_;
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
		//
	}));
	//
	// Another syntax to inject service
	//beforeEach(inject(function($injector) {
	//	basicService = $injector.get('basicService');
	//	$rootScope = $injector.get('$rootScope');
	//}));
	//	
	beforeEach(inject(function(_$controller_, _mockupBasicService_){
		//
		$controller = _$controller_;
		//mockupBasicService = _mockupBasicService_;
		basicController = $controller('basicController', {			
			// Use a mock up service to test controller 
			//basicService: mockupBasicService,
			$scope: $scope
		});
		//
	}));	
	//
	describe('basicController', function () {			
		//
		it('initializes local data...', function() {
		    expect(basicController.localData).toEqual(1234);
		});
		
		it('get service data...', function() {
		    expect(basicController.getData()).toEqual(4321);
		});
					
	});
	
	describe('basicController async', function () {			

		var mockupTimeout;
		var basicController2;
				
		beforeEach(function(done) {
			//
			mockupTimeout = jasmine.createSpy('timeout').and.callFake(function(func, time) {
		    	setTimeout(function(){
		    		func.apply();
		    	}, time);
		    });
			//
			basicController2 = $controller('basicController', {							
				$scope: $scope,
				$timeout: mockupTimeout
			});
			//
			basicController2.setLocalDataAsync(4934);
			// This won't work cuz basicController has dependency on $timeout
			//     So mock up mockupTimeout and inject into controller
			basicController2.setDataAsync(1357);
			setTimeout(function() {
				done();
			},3000);
		});
		
		it('setDataAsync function...', function(done) {																							
			expect(basicController2.localData).toEqual(4934);
			expect(basicController2.getData()).toEqual(1357);
			done();
		});				
	});
	
	describe('basicService', function () {								
		it('initializes data...', function() {
		    expect(basicService.getData()).toEqual(4321);
		});					
	});
			
})