angular.module('navigation').
    directive('mainNav', function($location, $cookies){
        return {
        restrict: "E",
        templateUrl: static_url + 'angular_templates/nav.html',
        link: function(scope) {

            scope.userLoggedIn = false

            scope.navBackground = static('static-images/olive.jpg')

            scope.$watch(function(){

                var token = $cookies.get("token")

                if (token) {
                    scope.userLoggedIn = true
                } else {
                    scope.userLoggedIn = false
                }
            })


        }



    }

});