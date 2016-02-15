'use strict';

/**
 * Main controller of the workshiftparserApp module
 */
 angular.module('workshiftparserApp')
  .controller('MainCtrl', ['$scope', 'CSVParserFactory', function ($scope, CSVParserFactory) {

  var csvParser = new CSVParserFactory();

  $scope.employees = [];

  $scope.parseFile = function() {
    try {
      $scope.fileError = '';
      csvParser.parse($scope.employees);
    }
    catch(err) {
      $scope.fileError = 'Upload a file first!';
    }
  };

  $scope.refreshEmployees = function() {
    $scope.employees = csvParser.getEmployees();
  };

}]);