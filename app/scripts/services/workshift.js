'use strict';

/**
 * Class for the workshifts
 */
angular.module('workshiftparserApp')
  .factory('Workshift', [function () {

  function Workshift(date, startingTime, endingTime) {
    this.date = date;
    this.startingTime = createDateObject(date, startingTime);
    this.endingTime = createDateObject(date, endingTime);

    if (this.endingTime < this.startingTime) {
      this.endingTime.setDate(this.endingTime.getDate() + 1);
    }
  }

  Workshift.prototype.getMinutes = function () {
    return (this.endingTime - this.startingTime)/1000/60;
  };

  /* Counts the minutes for evening compensation (refactor later) */
  Workshift.prototype.getEveningMinutes = function () {
    var eveningMinutes = 0;

    /* Count the compensation for evening hours */
    var eveningStart = createDateObject(this.date, '18:00');
    var eveningEnd = createDateObject(this.date, '06:00');
    eveningEnd.setDate(eveningEnd.getDate() + 1);

    if (this.endingTime > eveningStart) {
      if (this.startingTime > eveningStart) {
        eveningStart = this.startingTime;
      }
      if (this.endingTime < eveningEnd) {
        eveningEnd = this.endingTime;
      }
      eveningMinutes += (eveningEnd - eveningStart)/1000/60;
    }

    /* Count the compensation from early morning hours */
    var morningStart = createDateObject(this.date, '00:00');
    var morningEnd = createDateObject(this.date, '06:00');

    if (this.startingTime < morningEnd) {
      morningStart = this.startingTime;
      if (this.endingTime < morningEnd) {
        morningEnd = this.endingTime;
      }
      eveningMinutes += (morningEnd - morningStart)/1000/60;
    }
    return eveningMinutes;
  };

  function createDateObject(date, time) {
    var splittedDate = date.split('.');
    var splittedTime = time.split(':');
 
    var dateObject = new Date(splittedDate[2], splittedDate[1], splittedDate[0], 
      splittedTime[0], splittedTime[1], 0, 0);

    return dateObject;
  }

  return Workshift;
}]);