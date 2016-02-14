'use strict';

/**
 * @ngdoc function
 * @name workshiftparserApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workshiftparserApp
 */
 angular.module('workshiftparserApp')
  .controller('MainCtrl', ['$scope', 'CSVParserFactory', function ($scope, CSVParserFactory) {

  var csvParser = new CSVParserFactory();

  $scope.employees = [];

  $scope.addEmployee = function(employee) {
    $scope.employees.push(employee);
  };

  $scope.add = function() {
    csvParser.parse($scope.employees);
  };

  $scope.refreshEmployees = function() {
    $scope.employees = csvParser.getEmployees();
  };

  $scope.printWorkshifts = function() {
    for (var i = $scope.employees.length - 1; i >= 0; i--) {
      $scope.employees[i].printDailyMinutes();
    }
  };

}]);
