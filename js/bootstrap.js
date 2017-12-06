/**
 *
 */
define([
    'require',
    'angular',
    'angular-ui-router',
    'app',
    'routes'
], function (require, angular) {

    'use strict';

    require([
        'domReady',
        'localbase/modules'
    ], function (document) {
        angular.bootstrap(document, ['app']);
    });
});