
parcelApp.controller('IndexController', ["$scope", function ($scope) {

    $scope.test = "123";

    $(".button-collapse").sideNav( {
      menuWidth: 240,
      closeOnClick: true
    });
  }]);


parcelApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: '../index.html'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: '../views/settings.html'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '../views/profile.html'
    });

  $urlRouterProvider.otherwise('/profile');
});

