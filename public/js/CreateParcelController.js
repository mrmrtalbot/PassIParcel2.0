/**
 * Created by martin on 08/03/2016.
 */

(function() {

    if(typeof angular === 'undefined') {
        console.log("not loaded");
    }

    var app = angular.module("passParcel", [])
    

    app.directive('csvReader', [function () {

        // Function to convert to JSON
        var convertToJSON = function (content) {

            // Declare our variables
            var lines = content.csv.split('\n'),
                headers = lines[0].split(content.separator),
                columnCount = lines[0].split(content.separator).length,
                results = [];

            // For each row
            for (var i = 1; i < lines.length; i++) {

                // Declare an object
                var obj = {};

                // Get our current line
                var line = lines[i].split(new RegExp(content.separator + '(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));

                // For each header
                for (var j = 0; j < headers.length; j++) {

                    // Populate our object
                    obj[headers[j]] = line[j];
                }

                // Push our object to our result array
                results.push(obj);
            }

            // Return our array
            return results;
        };

        return {
            restrict: 'A',
            scope: {
                results: '=',
                separator: '=',
                callback: '&saveResultsCallback'
            },
            link: function (scope, element, attrs) {

                // Create our data model
                var data = {
                    csv: null,
                    separator: scope.separator || ','
                };

                // When the file input changes
                element.on('change', function (e) {

                    // Get our files
                    var files = e.target.files;

                    // If we have some files
                    if (files && files.length) {

                        // Create our fileReader and get our file
                        var reader = new FileReader();
                        var file = (e.srcElement || e.target).files[0];

                        // Once the fileReader has loaded
                        reader.onload = function (e) {

                            // Get the contents of the reader
                            var contents = e.target.result;

                            // Set our contents to our data model
                            data.csv = contents;

                            // Apply to the scope
                            scope.$apply(function () {

                                // Our data after it has been converted to JSON
                                scope.results = convertToJSON(data);

                                // Call our callback function
                                scope.callback(scope.result);
                            });
                        };

                        // Read our file contents
                        reader.readAsText(file);
                    }
                });
            }
        };
    }])

    app.controller('ImportCollectionsController', ['$stateParams', 'UploadService', function ($stateParams, service) {

        // Assign this to a variable
        var self = this;

        // Get our center id
        self.centerId = $stateParams.centerId;

        // Our model
        self.results = [];

        // Save our data
        self.save = function () {

            // Log our results to make sure we actually have some
            console.log(self.results);
        };
    }]);

    app.controller("parcelController", function($scope, $http) {

        $scope.dropDown =
        {
            openType: null,
            openMethod:
            [
                {nr: '1', text: 'Pass'},
                {nr: '2', text: 'Game'},
                {nr: '3', text: 'Other'}
            ]
        };

        $scope.doSomething = function() {
            $scope.formExample = {
                parcelName: "",
                category: "",
                openType: "",
                voucherName: "",
                file: null
            };

            console.log($scope.form);

            $http.post('/parcel',$scope.form).
            success(function(data) {
                console.log("We success");
            }).error(function(data) {
                console.error("ERROR!");
            })

        }

    });

    app.controller("viewParcelController"), function($scope, $http) {

        scope.getAllParcels=function() {

            $http.get('/parcel',$scope.parcelData).
            success(function(data) {
                console.log($scope.parcelData);
            }).error(function(data) {
                console.error("ERROR!");
            })
        }

    }


})();
