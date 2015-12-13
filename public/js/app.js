angular.module('PSTakeCareApp',['ngRoute','ngResource'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.
            when('/',{
                templateUrl: 'partials/home-page.html',
                controller: 'HomeCtrl'
            }).
            when('/hospitals', {
                templateUrl: 'partials/hospitals.html',
                controller: 'HospitalCtrl'
            }).
            when('/hospitals/:name', {
                templateUrl: 'partials/hospital-detail.html',
                controller: 'HospitalDetailsCtrl'
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            }).
            when('/signup', {
                templateUrl: 'partials/signup.html',
                controller: 'SignUpCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
            $locationProvider.html5Mode({ enabled: true});
     }]);
    //  .run(function($http) {
    //     delete $http.defaults.headers.common["X-API-TOKEN"];
    //  });