'use strict';

/**
 * Takes in a file and adds the workshifts in that file to existing employees and creates
 * new employee objects for new ones.
 */
angular.module('workshiftparserApp')
  .factory('CSVParserFactory', ['Employee', 'Workshift', function (Employee, Workshift) {

  function CSVParserFactory() {
  }

  var employees = [];

  /* (Will refactor this method to consists of multiple functions: fileToString, stringToArray and
   * arrayToEmployees, but the button needed multiple presses to do everything and I haven't found
   * a solution yet) */
  CSVParserFactory.prototype.parse = function(employeesFromScope) {
    employees = employeesFromScope;
    /* File to string */
    var f = document.getElementById('file').files[0],
    reader = new FileReader();
    reader.onloadend = function(e){
      var fileAsString = e.target.result;

      /* String to array */
      var lineContent, line;
      var lines = fileAsString.split('\n');
      for (var i = 0; i < lines.length; i++) {
        line = lines[i]; 
        lineContent = line.split(',');
        if (lineContent.length === 5 && lineContent[0] !== 'Person Name') {
          var workshift = new Workshift(lineContent[2], lineContent[3], lineContent[4]);
          var contains = false;
          for (var j = 0; j < employees.length; j++) {
            if (employees[j].employeeNumber === lineContent[1]) {
              contains = true;
              employees[j].addWorkshift(workshift);
            }  
          }
          if (!contains) {
            var employee = new Employee(lineContent[1], lineContent[0]);
            employee.addWorkshift(workshift);
            employees.push(employee);
          }
        }
      }
    };
    reader.readAsBinaryString(f);
  };

  CSVParserFactory.prototype.getEmployees = function() {
    return employees;
  };

  return CSVParserFactory;
}]);