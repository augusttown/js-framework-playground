;(function (angular) {

    "use strict";

    DashboardController.$inject = ['$scope', 'basicService'];

    function DashboardController($scope, basicService) {
        //
        var $ctrl = this;
        //
        $ctrl.data = basicService.getData();
    }

    angular.module('app').component('dashboard', {
        templateUrl:  "js/components/dashboard/dashboard.html",
        controller:  DashboardController
    });

})(window.angular);