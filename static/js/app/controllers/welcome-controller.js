var app = angular.module('googleMaps');

app.controller("welcomeCtrl", function($scope){

  $scope.smallMap = static('static-images/mapb.jpg')
  console.log($scope.smallMap)

})