

app.controller('PostCreateController', ['$window','$location','Upload','$http','$cookies','$scope', function($window, $location, Upload, $http, $cookies, $scope) {

    // Kontroler za Create Post stranicu
    var self = this;
    var token = $cookies.get('token')
    var username = $cookies.get('username')

    //console.log(username,token)

    self.uploadPic = function(file) {
        if (token) {

            var fileUpload = Upload.upload({
                url: 'api/posts/create/',
                data: {
                title: self.naslov,
                content: self.sadrzaj,
                image: file
                },
                headers: {
                    authorization: "JWT " + token

                 }
            })

            fileUpload.then(function(response) {

                //console.log(response);
                // Reload lokacije da bi se post pojavio
                // $window.location.reload();
                $location.path('/blog_list')


            })

            fileUpload.catch(function(errResponse){
                //console.log(errResponse)
                //console.log(errResponse.data.title)
                self.titleError = errResponse.data.title
                if (self.titleError == "Ensure this field has no more than 40 characters.") {
                    self.titleError1 = "* Naslov ne sme imati više od 40 slova uključujući i prazna mesta"
                }

            });



        } else {

        //console.log("no token")

        }

    }


    var isUserPresent = function() {

    //Funkcija koja dozvoljava ili brani pravljenje postova
    //   u zavisnosti od toga da li je korisnik prijavljen

        $scope.userLoggedIn = false

        $scope.$watch(function(){
            if (token) {
                $scope.userLoggedIn = true
            } else {
                $scope.userLoggedIn = false
            }

        })

    }


}]);