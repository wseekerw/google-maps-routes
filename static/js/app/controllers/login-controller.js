var app = angular.module('googleMaps');

app.controller("LoginController", function($scope, $cookies, $http, $location, $stateParams){

    // Kontroler za Logovanje
    var self = this;
    var loginUrl = 'api/users/login/'
    self.user = {}
    $scope.pointer = static('static-images/google-maps-pointer.png')

    self.doLogin = function(){


        var requestConfig = {
            method: "POST",
            url: loginUrl,
            data: {
                username: self.user.username,
                password: self.user.password
            },
            headers: {}
        }
        var requestAction = $http(requestConfig)


        requestAction.then(function(response){
            //console.log(response)
            $cookies.put("token", response.data.token)
            $cookies.put("username", response.data.username)
            $location.path("/routes")
            //console.log($cookies.get('username'), $cookies.get('token'))

        })

        requestAction.catch(function(errResponse){
            //console.log(errResponse.data.non_field_errors)
            self.loginError = errResponse.data.non_field_errors



        })
    }

})