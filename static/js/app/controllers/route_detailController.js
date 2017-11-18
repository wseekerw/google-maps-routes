var app = angular.module("googleMaps");

app.controller("detailController",function($scope, $stateParams, $http, $cookies){

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();

    var token = $cookies.get('token');



    var requestDetail = $http({
        url: 'api/map_objects/' + $stateParams.id + '/?format=json',
        method: 'get',
        headers: {
          authorization: "JWT " + token
        }
    })

    requestDetail.then(function(response){
        $scope.routeDetailObject = response.data
        //console.log($scope.routeDetailObject.address1)

        /* The whole google map Api javascript code has been put into
           get response for detail map object because of the accessability of
           the $scope object
        */

        //request url with origins and destinations parameters
        var requestUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" +
        $scope.routeDetailObject.address1 +"&destinations="+
        $scope.routeDetailObject.address2 +"&key=AIzaSyCxruFAXnuh4bBkop3H1RDqjOytpJM4v9A";

        // proxy url for bypassing the CORS
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        // http request or call for distance and travel time
        var promise = $http.get(proxyUrl + requestUrl);

        promise.then(function(response){
            console.log(response);
            if(response.data.rows[0].elements[0].status==="ZERO_RESULTS") {

               console.log('Something went wrong')
               $scope.routeDetailError = "* A line or a polyline, connecting 2 places on the map, cannot be displayed" +
                " because they are not connected by roads. Those places are either on different continents or are accesible only" +
                " through airports or flights.";

                $scope.travelTimeError = 'Not available.'
                $scope.durationError = 'Not available.'

            } else {
                $scope.distanceKilometers = response.data.rows[0].elements[0].distance.text;
                $scope.duration = response.data.rows[0].elements[0].duration.text;



            }
       });

       promise.catch(function(err){
           console.log(err);

       })

       // variable setting for Directions service
       var start = new google.maps.LatLng($scope.routeDetailObject.lat1,$scope.routeDetailObject.lng1);
       var end = new google.maps.LatLng($scope.routeDetailObject.lat2,$scope.routeDetailObject.lng2);

       directionsDisplay = new google.maps.DirectionsRenderer();

       // basic map options
       var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(0,0),//(-33.92, 151.25)
          mapTypeId: google.maps.MapTypeId.ROADMAP
       });

       directionsDisplay.setMap(map);

       //setting the markers
        marker1 = new google.maps.Marker({
          position: new google.maps.LatLng($scope.routeDetailObject.lat1, $scope.routeDetailObject.lng1),
          map: map
        });

        marker2 = new google.maps.Marker({
          position: new google.maps.LatLng($scope.routeDetailObject.lat2, $scope.routeDetailObject.lng2),
          map: map
        });

        //expanding bounds of the map to fit markers
        bounds.extend(marker1.position);
        bounds.extend(marker2.position);
        map.fitBounds(bounds);

        var request = {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.DRIVING
        };

        // direction calculation
        directionsService.route(request, function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
          } else {
            //console.log('Error calculating route');
          }
        });

    })

    requestDetail.catch(function(err){
      //console.log(err);
    })




    // setting the scope object to clicked route detail
    //$scope.routeDetail = $stateParams


    /*var distanceMeters = google.maps.geometry.spherical.
    computeDistanceBetween(marker1.position, marker2.position)/1000;
    $scope.distanceKilometers = distanceMeters.toFixed(1);
    */

    //console.log($stateParams);



})