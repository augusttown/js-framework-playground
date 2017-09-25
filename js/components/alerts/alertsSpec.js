'use strict';

/**
 * @ngdoc unit test
 * @name alertsSpec.js
 * @description
 * Unit test for validating the alerts component
 */
define([
    'angular',
    'angularMocks',
    'testRiApp',
    'localbase/components/alerts/alerts',
    'localbase/components/alerts/alerts.html'
], function (angular, mocks) {
    describe('Component test: alerts', function () {

        // Load the RI main module
        beforeEach(module('riModule'));

        // Load the templates
        beforeEach(module('templates'));

        beforeEach(inject(function($rootScope, $compile){
            Object.defineProperty(this, 'renderedAlerts', {
                get: function() {
                    var element = angular.element('<alerts alerts="alerts"></alerts>');
                    element = $compile(element)($rootScope);
                    $rootScope.$digest();
                    return element;
                }
            });
        }));

        // Test when there are no alerts
        it('No alerts', inject(function($rootScope) {
            $rootScope.alerts = null;
            var renderedAlerts = this.renderedAlerts;
            var label = renderedAlerts.find('div');
            expect(label.text()).toBe('');
        }));

        // Test when there is an error message included
        it('Error message alert', inject(function($rootScope) {
            $rootScope.alerts = [{
                type: 'danger',
                msg: 'Test error message'
            }];
            var renderedAlerts = this.renderedAlerts;
            var label = renderedAlerts.find('div');
            expect(label.text().trim()).toBe('Test error message');
        }));
    });
});