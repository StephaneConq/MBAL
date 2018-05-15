'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'Service',
    'ngRoute',
    'ngAnimate'
])

    .controller('ctrl', function($scope, Service){

        var ctrl = this;

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
                    } else {
                        localStorage.setItem('error', 'Merci de réessayer de vous connecter');
                        // window.location = '/'
                    }
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
        }

    });