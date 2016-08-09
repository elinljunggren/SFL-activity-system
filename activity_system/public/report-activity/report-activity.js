/**
 * Created by Simon on 2016-08-08.
 */
(function () {
  'use strict';

  angular
    .module('activity_system.report-activity',['ngRoute'])
    .controller('ReportActivityController', ReportActivityController);

  ReportActivityController.$inject = ['$scope'];

  /* @ngInject */
  function ReportActivityController($scope) {
    var vm = this;
    vm.title = 'ReportActivityController'

    activate();

    ////////////////

    function activate() {
      console.log("Activate in report activity!");
    }

  }

})();

