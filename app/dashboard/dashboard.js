'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'Service',
    'ngRoute',
    'ngAnimate'
])

    .controller('ctrl', function($scope, Service){

        var ctrl = this;

        Service.f_getToken();



    });