var app = angular.module("googleMaps")

app.controller("routesController",['$http', '$cookies','$scope', function($http, $cookies, $scope) {

  var self = this;
  var token = $cookies.get('token');
  $scope.divMap = static('static-images/mapLogo.png');

  var place1;
  var place2;

  var place1Adress;
  var place1Lat;
  var place1Lng;

  var place2Adress;
  var place2Lat;
  var place2Lng;

  // Getting the username from logged in user
  if (token) {
        self.user = {
            username: $cookies.get("username")
        }
  }

  // Get a list of map objects from the database
  getMap_objects = function(){
    var getRequest = $http({
      url: 'api/map_objects/?format=json',
        method: "get",
        headers: {
          authorization: "JWT " + token
        }
    })

    getRequest.then(function(response){
       $scope.map_objects = response.data;
       console.log(response);

       // Delete function inside a get request response
       $scope.delete = function(map_object) {
         //console.log(map_object.id);

         var deleteRoutePromise = $http({
           url: 'api/map_objects/' + map_object.id + '/',
           method: 'delete',
           headers: {
             authorization: "JWT " + token
           }
         })

       deleteRoutePromise.then(function(response){
          console.log(response);
          console.log($scope.map_objects.indexOf(map_object));
          // Line below deletes the map_object from the $scope object so it gets deleted in view also
          $scope.map_objects.splice($scope.map_objects.indexOf(map_object), 1);

       });

       deleteRoutePromise.catch(function(errResponse){
          console.log(errResponse);
       })

       }

    });

    getRequest.catch(function(err){
        console.log(err);
    });

  }

  getMap_objects();
  var input1 = document.getElementById('startvalue');
  var input2 = document.getElementById('endvalue');
  var options = {
    types: ['(cities)']

  };

  autocomplete1 = new google.maps.places.Autocomplete(input1, options);
  autocomplete2 = new google.maps.places.Autocomplete(input2, options);

  // Addlistener for first form button
  google.maps.event.addListener(autocomplete1, 'place_changed', function () {

    place1 = autocomplete1.getPlace();

    place1Adress = place1.formatted_address;
    place1Lat = place1.geometry.location.lat();
    place1Lng = place1.geometry.location.lng();

    //console.log(place1Adress, place1Lat, place1Lng);

  });

  // Addlistener for second form button
  google.maps.event.addListener(autocomplete2, 'place_changed', function () {

    place2 = autocomplete2.getPlace();

    place2Adress = place2.formatted_address;
    place2Lat = place2.geometry.location.lat();
    place2Lng = place2.geometry.location.lng();

    //console.log(place2Adress, place2Lat, place2Lng);

  });


    // Function that creates a route
    $scope.addItem = function(user) {

      var createUrl = 'api/map_objects/create/'

      if (token) {

        var createObject = {
          method: "POST",
          url: createUrl,
          data: {
            address1: place1Adress,
            lat1: place1Lat,
            lng1: place1Lng,
            address2: place2Adress,
            lat2: place2Lat,
            lng2:  place2Lng
          },
          headers: {
             authorization: "JWT " + token
          }
        }
        $scope.user = {};

        var createPromise = $http(createObject);

        createPromise.then(function(response){
          //console.log(response)
          //console.log($scope)
          $scope.invalidDestination = "";
          getMap_objects();



        }, function(rejection){
          //console.log(rejection)
          $scope.invalidDestination = "* Unable to create route. Destinations are invalid. Please try again.";

        })

      } else {
        console.log("No token")
      }



    };





 }]);