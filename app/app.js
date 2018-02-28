'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
])

    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/view1'});
    }])

    .controller('ctrl', function($scope){

        var ctrl = this;

        ctrl.login = "Connexion";

        $('.login').on('click', function(event) {

            var target = $(this.getAttribute('href'));

            if( target.length ) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top
                }, 1000);
            }

        });

        materializeInit();

        function materializeInit(){
            $('.carousel.carousel-slider').carousel({
                fullWidth: true,
                indicators: false
            });

            setInterval(function(){
                $('.carousel').carousel('next');
            }, 5000);
        }

    });
