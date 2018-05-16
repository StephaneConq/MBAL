angular.module('Service', []).factory('Service', function($http, $timeout){

    var Service = this;

    const api = "https://www.mbal.ovh/MBAL";

    const apiUsers = api + "/api/user";

    const apiFamily = api + "/api/family";

    var tokenConfig = {
        method: 'POST',
        url: api+"/oauth/token?grant_type=password&username=admin&password=Valentin34",
        headers: {
            "Authorization":"Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0"
        },
        timeout: 3000
    };

    Service.f_getToken = function () {
        return $http(tokenConfig).then(function (success) {
            Service.token = success.data['access_token'];
            console.log('token fetched', success.data['access_token']);
        }, function (err) {
            localStorage.setItem("error","Serveur indisponible !\nVeuillez réessayer plus tard");
            return err;
        });
    };

    Service.f_getUserDetails = function (username) {
        var req = {
            method : "POST",
            url: apiUsers + "/getUserByName",
            params: {
                username: username
            },
            headers: {
                "Authorization":"Bearer "+Service.token
            }
        };
        return $http(req).then(function (success) {
            console.log('success', success);
            return success;
        }, function (err) {
            console.error("error", err);
            return err;
        });
    };

    Service.f_getPathImage = function (image) {
        var req = {
            method : "GET",
            url: apiUsers + "/files/getUserByName/" + username + "/",
            headers: {
                "Authorization":"Bearer "+Service.token
            }
        };
        return $http(req).then(function (success) {
            console.log('success', success);
            return success;
        }, function (err) {
            console.error("error", err);
            return err;
        });
    };


    Service.f_login = function (username, pass) {

        var req = {
            method : "POST",
            url: api+"/api/user/login?username="+username+"&password="+pass+"&client=WEB",
            headers: {
                "Authorization":"Bearer "+Service.token
            }
        };

        return $http(req).then(function (data) {
            return data;
        }, function (err) {
            console.error("error", err);
            return err;
        });

    };

    Service.f_createUser = function (userInfo) {

        var req = {
            method : "POST",
            url: api+"/api/user/create",
            params : {
                name: userInfo['name'],
                prenom: userInfo['prenom'],
                mail: userInfo['mail'],
                password: userInfo['password'],
                num_tel: userInfo['num_tel'],
                role: 'USER'
            },
            headers: {
                "Authorization":"Bearer "+Service.token
            }
        };

        return $http(req).then(function (data) {
            return data;
        }, function (err) {
            console.error("error", err);
            return err;
        });

    };

    Service.f_logout = function (session_id) {
        var req = {
            method : "GET",
            url: apiUsers+"/logout/" + session_id,
            headers: {
                "Authorization":"Bearer "+Service.token
            }
        };

        return $http(req).then(function (data) {
            return data;
        }, function (err) {
            console.error("error", err);
            return err;
        });
    };


    return Service;

});