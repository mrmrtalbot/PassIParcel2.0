(function() {

    var app = angular.module("Pip", []);

    app.directive('bindDynamicHtml', ['$compile', function ($compile) {
        return function(scope, element, attrs) {
            scope.$watch(
                function(scope) {
                    // watch the 'bindUnsafeHtml' expression for changes
                    return scope.$eval(attrs.bindDynamicHtml);
                },
                function(value) {
                    // when the 'bindUnsafeHtml' expression changes
                    // assign it into the current DOM
                    element.html(value);

                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );
        };
    }]);



    app.controller("InterfaceController", function ($scope, $http, $sce) {

        $http.get("/login")
            .then(function(response) {
                $scope.pageContent = response.data;
            });


    });

    app.controller("LoginController", function($scope, $http, $sce) {

        $scope.user = {
            "userName": "",
            "password": "",
            "remembered": true,
        };

    });

})();