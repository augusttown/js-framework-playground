
var baseUrl = window.location.origin + window.location.pathname + 'js';

require.config({
    baseUrl: baseUrl,
    //waitSeconds: 0,
    paths: {
        'angular'           : '../node_modules/angular/angular.min',
        'angular-ui-router' : '../node_modules/@uirouter/angularjs/release/angular-ui-router.min',
        'domReady'          : '../node_modules/domready/ready',
        'd3'                : '../node_modules/d3/build/d3.min',
        'dimple'            : '../node_modules/dimple-js/dist/dimple.latest.min',
        'localbase'         : baseUrl
    },
    //
    // shim: makes external libraries reachable
    shim: {
        angular: {
            exports : 'angular'
        },
        'angular-ui-router': {
            deps: ['angular']
        }
    },
    //
    deps: [
        'bootstrap'
    ]
});