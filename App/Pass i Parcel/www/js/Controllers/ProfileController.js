

parcelApp.controller('ProfileController', ["$scope", function ($scope) {
  $('.carousel.carousel-slider').carousel({
    full_width: true,
    indicators: false,
  });

  $scope.buttonRow = {};

  $scope.buttonRow.active = 0;

}]);
