angular.module('googleMaps').
    config(function($interpolateProvider){
        $interpolateProvider.startSymbol('[[').endSymbol(']]');

    })

.config(['$urlRouterProvider','$locationProvider', '$stateProvider', function($urlRouterProvider,$locationProvider, $stateProvider){
  $urlRouterProvider.otherwise("/");



  $stateProvider

    .state('welcome',{
      url:'/',
      templateUrl: static('angular_templates/welcome.html'),
      controller: 'welcomeCtrl',

    })

    .state('routeDetail',{
      url: '/routeDetail/:id',
      templateUrl: static('angular_templates/route_detail.html'),
      controller: 'detailController',
    })

    .state('register', {
      url: '/register',
      templateUrl: static('angular_templates/register.html'),
      controller: "RegisterController",
      controllerAs: 'RgCtrl'
    })

    .state('routes', {
      url: '/routes',
      templateUrl: static('angular_templates/routes.html'),
      controller: "routesController",
      controllerAs: 'RCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: static('angular_templates/login.html'),
      controller: "LoginController",
      controllerAs: 'LgCtrl'
    })

    .state('logout', {
      url: '/logout',
      controller: "LogoutController"
    })

    /*.state('home',{
      url:'/',
      templateUrl: static_url + 'angular_templates/home.html',
      controller: 'TimeController',
      controllerAs: 'TCtrl'

    })

    .state('create_post',{
      url: '/create_post',
      templateUrl: static('angular_templates/create_post.html'),
      controller: 'PostCreateController',
      controllerAs: 'PCCtrl'
    })

    .state('blog_list',{
      url: '/blog_list',
      templateUrl: static_url + 'angular_templates/blog_list.html',
      controller: 'ListController',
      controllerAs: "LCtrl",

    })
    .state('blog_details', {
      url:'/details/:id',
      templateUrl: static('angular_templates/blog_details.html'),
      controller: 'DetailController',
      controllerAs: 'DCtrl'
    })
    .state('blog_edit', {
      url:'/edit/:id',
      templateUrl: static('angular_templates/blog_edit.html'),
      controller: 'PostEditController',
      controllerAs: 'PECtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: static('angular_templates/login.html'),
      controller: "LoginController",
      controllerAs: 'LgCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: "LogoutController"
    })
    .state('register', {
      url: '/register',
      templateUrl: static('angular_templates/register.html'),
      controller: "RegisterController",
      controllerAs: 'RgCtrl'
    })*/


}]);
