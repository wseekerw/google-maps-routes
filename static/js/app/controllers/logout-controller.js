var app = angular.module('googleMaps');

app.controller('LogoutController', ['$cookies','$scope','$location', function($cookies, $scope, $location) {

    //Logout Kontroler

    var tokenExists = $cookies.get("token")
    if (tokenExists) {
        $scope.loggedIn = true;
        $cookies.remove("token")
        $scope.user = {
          username: $cookies.get("username")
        }

        $cookies.remove('username')
    }
    $location.path('/login')
    console.log('Ako je undefined onda nema tokena i Logout je uspeo ->', $cookies.get("token"))

}]);