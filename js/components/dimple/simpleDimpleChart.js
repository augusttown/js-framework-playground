;(function (angular) {

    "use strict";

    SimpleDimpleChartController.$inject = ['$scope'];

    function SimpleDimpleChartController($scope) {
        //
        var $ctrl = this;
        //
        var svg = dimple.newSvg("div", 1024, 512);
        var data = [
            { "Word":"Hello", "Awesomeness":2000 },
            { "Word":"World", "Awesomeness":3000 }
        ];

        var chart = new dimple.chart(svg, data);
        chart.addCategoryAxis("x", "Word");
        chart.addMeasureAxis("y", "Awesomeness");
        chart.addSeries(null, dimple.plot.bar);
        chart.draw();
    }

    angular.module('app').component('simpleDimpleChart', {
        templateUrl:  "js/components/dimple/simpleDimpleChart.html",
        bindings: {
            id: '@'
        },
        controller:  SimpleDimpleChartController
    });

})(window.angular);