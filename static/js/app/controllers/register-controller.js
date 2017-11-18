var app = angular.module('googleMaps');

app.controller('RegisterController', function($http, $scope){
    var self = this;
    var registerUrl = 'api/users/create/'
    self.user = {};

    self.doRegister = function(){

        var registerRequest = {
            url: registerUrl,
            method:'POST',
            data: {
                username: self.user.username,
                password: self.user.password,
                password2: self.user.password2
            },
            headers: {'Content-Type': 'application/json'}

        }

        $scope.userRegistered = false;

        var registerPromise = $http(registerRequest)

        registerPromise.then(function(response){
            self.statusText = response.statusText
            //console.log(self.statusText)
            console.log(response)

            self.regUsername = response.data.username

            if (self.statusText == "Created") {
                self.registerMessage = "* Registration successful"

                self.usernameError = "";
                self.passwordError = "";

                self.user.username = "";
                self.user.password = "";
                self.user.password2 = "";


            }



            $scope.$watch(function(){
            if (self.regUsername) {
                $scope.userRegistered = true
            } else {
                $scope.userRegistered = false
            }

        })

        });

        registerPromise.catch(function(errResponse){
            console.log(errResponse)
            self.usernameError = errResponse.data.username
            self.passwordError = errResponse.data.password2

            console.log(self.usernameError,self.emailError,self.email2Error,self.passwordError)




        });


    };




});
