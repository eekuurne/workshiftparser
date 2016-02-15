'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('workshiftparserApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should have no employees at start', function () {
    expect(scope.employees.length).toBe(0);
  });

  it('should not do anything to employees if parse and no file chosen', function () {
    scope.parseFile();
    expect(scope.employees.length).toBe(0);

    scope.employees = ['emptyobject'];
    scope.parseFile();
    expect(scope.employees.length).toBe(1);
    expect(scope.employees[0]).toBe('emptyobject');
  });

});
