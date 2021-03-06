;(function (angular) {

    'use strict';

    AlertsController.$inject = ['basicService'];

    function AlertsController(basicService) {

        console.log("AlertsController initialized...");

        var $ctrl = this;

        $ctrl.$onInit = function() {
            $ctrl.alerts = [{ msg: "alert msg 1" }, { msg: "alert msg 2" }, { msg: "alert msg 3" }];
        };

        $ctrl.addAlert = function(type, msg) {
            $ctrl.alerts.push({type: type, msg: msg});
        };

        $ctrl.closeAlert = function(index) {
            $ctrl.alerts.splice(index, 1);
        };
    }

    angular.module('app').component('alerts', {
        templateUrl: "js/components/alerts/alerts.html",
        controller: AlertsController,
        bindings: {
            alerts: '<'
        }
    });

})(window.angular);