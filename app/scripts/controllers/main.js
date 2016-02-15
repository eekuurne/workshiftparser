'use strict';

/**
 * Main controller of the workshiftparserApp module
 */
 angular.module('workshiftparserApp')
  .controller('MainCtrl', ['$scope', '$log', 'CSVParserFactory', function ($scope, $log, CSVParserFactory) {

  var csvParser = new CSVParserFactory();

  $scope.employees = [];

  $scope.parseFile = function() {
    try {
      $scope.errorMessage = '';
      /* Updates the list of employees after reader is done */
      setTimeout(function() {
        $scope.$apply(function () {
        });
      }, 10);

      csvParser.parse($scope.employees);
    }
    catch(err) {
      $scope.errorMessage = 'Choose a file before parsing.';
      $log.error('Cannot parse null file.');
    }
  };

  $scope.refreshEmployees = function() {
    $scope.employees = csvParser.getEmployees();
  };

}]);