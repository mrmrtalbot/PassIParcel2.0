(function() {

    var app = angular.module("Pip", []);

    app.controller("InterfaceController", function ($scope) {
        $scope.firstName = "John";
        $scope.lastName = "Doe";
    });

})();