'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'Service',
    'ngRoute',
    'ngAnimate'
])

    .controller('ctrl', function($scope, Service, $timeout){

        var ctrl = this;


        var preloader = document.querySelector('#preloader');
        if (! preloader.showModal) {
            dialogPolyfill.registerDialog(preloader);
        }
        preloader.showModal();


        Service.f_getToken().then(function () {
            ctrl.userInfos = {
                mail: localStorage.getItem('userMail'),
                session_id: localStorage.getItem('userSessionID')
            };
            if (localStorage.getItem('userMail')) {
                Service.f_getUserDetails(ctrl.userInfos.mail).then(function (success) {
                    console.log('after getting user details', success);
                    if (success.status === 200){
                        ctrl.user = success.data;
                        getFamilyEvents(ctrl.user.family.name);
                    } else {
                        localStorage.setItem('error', 'Merci de réessayer de vous connecter');
                        // window.location = '/'
                    }
                    preloader.close();
                    console.log('ctrl.user', ctrl.user);
                }, function (err) {
                    localStorage.setItem('error', 'Merci de réessayer de vous connecter');
                    console.error('error', err);
                });
            } else {
                localStorage.setItem('error', 'Merci de réessayer de vous connecter');
                window.location = '/'
            }
        });

        function getFamilyEvents(family) {
            Service.f_getEventsByFamily(family).then(function (success) {
                console.log('successfully fetched events', success);
            }, function(err){
                console.error('error', err);
            })
        }

        ctrl.currentPage = 'accueil';

        ctrl.showPanel = function (toSlide) {
            console.log('to slide', toSlide);
            console.log(toSlide !== '#' + ctrl.currentPage);
            if (toSlide !== '#' + ctrl.currentPage) {
                $( ".demo-content" ).each(function (key, elt) {
                    if(elt.id !== toSlide.replace('#', '')) {
                        console.log('id', elt.id);
                        $(this).toggle( "slide" );
                    }
                });
                $( toSlide ).toggle( "slide" );
                console.log('slided', toSlide);
                ctrl.currentPage = toSlide.replace('#', '');
            }
        };


        ctrl.logout = function () {
            Service.f_logout(ctrl.userInfos['session_id']).then(function (success) {
                console.log('success logout', success);
                localStorage.setItem('userMail', '');
                localStorage.setItem('userSessionID', '');
                localStorage.setItem('error', 'null');
                window.location = '/';
            }, function (err) {
                console.error('error', err);
            })
        };



    });