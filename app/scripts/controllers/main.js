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
      /* Updates the list of employees after reader is done */
      setTimeout(function() {
        $scope.$apply(function () {
        });
      }, 10);

      csvParser.parse($scope.employees);
    }
    catch(err) {
      $log.debug('An error happened loading the file.');
    }
  };

  $scope.refreshEmployees = function() {
    $scope.employees = csvParser.getEmployees();
  };

}]);