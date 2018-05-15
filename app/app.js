'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'Service',
    'ngRoute',
    'ngAnimate'
])

    .controller('ctrl', function($scope, Service, $timeout){

        var ctrl = this;

        ctrl.login = "Connexion";

        Service.f_getToken();

        if(localStorage.getItem('error') !== 'null') {
            console.log("localStorage.getItem('error')", localStorage.getItem('error'));
            ctrl.errorOnInit = localStorage.getItem('error');
            $('.modal').modal();
            $timeout(function () {
                $('#errorDialog').modal('open');
            }, 1000);
            localStorage.setItem('error', 'null');
        }

        ctrl.closeModal = function(modal){
            document.querySelector(modal).close();
        };

        ctrl.loginFct = function (user) {
            Service.f_login(user.username, user.password).then(function (data) {
                if(data.data.response.includes('-')){
                    localStorage.setItem('userMail', user.username);
                    localStorage.setItem('userSessionID',data.data.response);
                    window.location = '/dashboard/index.html';
                }else{
                    M.toast({html: data.data.response});
                }
            }, function (err) {
                M.toast({html: err.data.response});
            })
        };


        ctrl.createUser = function (userInfo) {
            Service.f_createUser(userInfo).then(function (data) {
                console.log('data created', data);
            })
        };


        $('.login').on('click', function(event) {

            var target = $(this.getAttribute('href'));

            if( target.length ) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top
                }, 1000);
            }

        });

        $(document).ready(function () {
            materializeInit();
        });

        function materializeInit(){
            $('.carousel.carousel-slider').carousel({
                fullWidth: true,
                indicators: false
            });

            $('.modal').modal();

            $('.tooltipped').tooltip({delay: 50});

            setInterval(function(){
                $('.carousel').carousel('next');
            }, 5000);
        }

    });