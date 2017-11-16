;(function (angular) {

    /*jshint validthis: true*/
	"use strict";

	angular.module('app').controller('basicController', basicController);
	
	basicController.$inject = ['$scope', '$http', '$timeout', 'basicService'];
	
	function basicController($scope, $http, $timeout, basicService) {		
		var vm = this;		
		vm.localData = 1234;
				
		vm.setDataAsync = function (value) {			
			$timeout(function() {
				basicService.setData(value);
			}, 2500);			
		};
		
		vm.setLocalDataAsync = function (value) {			
			setTimeout(function() {
				vm.localData = value;
			}, 2500);			
		};
		
		vm.setData = function (value) {
			basicService.setData(value);
		};
		
		vm.getData = function () {			
			return basicService.getData();			
		};
	}
	
})(window.angular);