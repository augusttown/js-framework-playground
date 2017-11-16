;(function (angular) {
    
	"use strict";    
    
    angular.module('app').service('basicService', basicService);    
    basicService.$inject = ['$http', '$timeout'];
    
    function basicService($http, $timeout) {
    	
    	var data = 4321;
    	
    	var getData = function () {
    		return data;
    	};
    	
    	var setData = function (value) {
    		data = value;
    	};
    	
    	return {
    		getData: getData,
    		setData: setData
    	};
    }

})(window.angular);