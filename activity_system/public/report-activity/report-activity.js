/**
 * Created by Simon on 2016-08-08.
 */
(function () {
  'use strict';

  angular
    .module('activity_system.report-activity',['ngRoute','ngMaterial', 'ngMessages'])
    .controller('ReportActivityController', ReportActivityController);

  ReportActivityController.$inject = ['$scope'];

  /* @ngInject */
  function ReportActivityController($scope) {
    $scope.controller = this;

    var activity = {
      date: undefined
    };

    activate();

    ////////////////

    function activate() {
      console.log("Activate in report activity!");
    }

  }

})();

