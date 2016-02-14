'use strict';

/**
 * Class for the employees
 */
angular.module('workshiftparserApp')
  .factory('Employee', ['$log', function ($log) {

  function Employee(employeeNumber, name) {
    this.employeeNumber = employeeNumber;
    this.name = name;
    this.hourlyWage = 375;
    this.eveningCompensation = 115;
    this.workshifts = [];
    this.dailyMinutes = [];
  }

  Employee.prototype.addWorkshift = function (workshift) {
    var contains = false;
    for (var i = 0; i < this.workshifts.length; i++) {
      if (this.workshifts[i].startingTime.getTime() === workshift.startingTime.getTime() && this.workshifts[i].endingTime.getTime()  === workshift.endingTime.getTime() ) {
        contains = true;
      }
    }
    if (!contains) {
      this.workshifts.push(workshift);
      var contains2 = false;
      for (var j = 0; j < this.dailyMinutes.length; j++) {
        if (this.dailyMinutes[j].date === workshift.date) {
          this.dailyMinutes[j].minutes = this.dailyMinutes[j].minutes + workshift.getMinutes();
          contains2 = true;
        }
      }
      if (!contains2) {
        this.dailyMinutes.push({
          date: workshift.date,
          minutes: workshift.getMinutes()
        });
      }
    }
  };

  Employee.prototype.getWorkshifts = function () {
    return this.workshifts;
  };

  Employee.prototype.printWorkshifts = function () {
    for (var i = 0; i < this.workshifts.length; i++) {
      $log.debug(this.employeeNumber + ', ' + this.workshifts[i].date + ' ' + this.workshifts[i].startingTime + ' - ' + this.workshifts[i].endingTime + ' ' + this.workshifts[i].getMinutes() + ' ' + this.workshifts[i].getEveningMinutes());
    }
  };

  Employee.prototype.printDailyMinutes = function () {
    for (var i = 0; i < this.dailyMinutes.length; i++) {
      $log.debug(this.dailyMinutes[i].date + ': ' + this.dailyMinutes[i].minutes);
    }
  };

  Employee.prototype.getMonthlyWage = function () {
    var monthlyWage = 0;

    for (var i = 0; i < this.dailyMinutes.length; i++) {
      monthlyWage += this.countWageOfDay(this.dailyMinutes[i].minutes);
    }

    for (var j = 0; j < this.workshifts.length; j++) {
      monthlyWage += this.workshifts[j].getEveningMinutes() * this.eveningCompensation / 60;  
    }

    return Math.round(monthlyWage) / 100;
  };

  Employee.prototype.countWageOfDay = function (minutes) {
    var wage = 0;
    if (minutes > 480) {
      wage += 8 * this.hourlyWage;
      if (minutes > 600) {
        wage += 2 * this.hourlyWage * 1.25;
        if (minutes > 720) {
          wage += 2 * this.hourlyWage * 1.50;
          wage += (minutes - 720) / 60.0 * this.hourlyWage * 2.00;
        } else {
          wage += (minutes - 600) / 60.0 * this.hourlyWage * 1.50;
        }
      } else {
        wage += (minutes - 480) / 60.0 * this.hourlyWage * 1.25;
      }
    } else {
      wage += minutes / 60.0 * this.hourlyWage;
    }
    return wage; 
  };

  return Employee;
}]);