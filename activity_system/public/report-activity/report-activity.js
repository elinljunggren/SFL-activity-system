/**
 * Created by Simon on 2016-08-08.
 */
(function () {
  'use strict';

  angular
    .module('activity_system.report-activity',['ngRoute','ngMaterial', 'ngMessages','angularMoment'])
    .controller('ReportActivityController', ReportActivityController);

  ReportActivityController.$inject = ['$scope','BackendService'];

  /* @ngInject */
  function ReportActivityController($scope, BackendService) {
    var self = this;
    $scope.controller = this;

    var today = new Date();
    self.activityReport = {
      staff: undefined,
      date: today,
      nrOfParticipants: 1
    };

    self.selectedStaff = null;
    self.searchStaff = null;

    activate();

    ////////////////

    function activate() {
      console.log("Activate in report activity!");
      $scope.data = BackendService.data;
      console.log($scope.data);
    }

    self.querySearchStaff = function(query) {
      console.log("query search");
      return query ? $scope.data.staff.filter(createFilter(query)) : [];
    }

    /**
     * Create filter function for a query string
     */
    function createFilter(query) {
      return function filterFn(object) {
        return (object.name.indexOf(query) === 0);
      };
    }

    self.setStaffName = function () {
      self.activityReport.staff = self.selectedStaff.name;
      console.log(self.activityReport);
    };

    self.sendActivityReport = function(){
      var areport = {
        date: undefined,
        staff: undefined,
        school: undefined,
        activity: undefined,
        nrOfParticipants: undefined,
        comment: undefined
      }
      for (var prop in areport) {
        areport[prop] = self.activityReport[prop];
      }
      areport.date =  moment(areport.date).format("YYYY-MM-DD HH:mm:ss");
      console.log(self.activityReport);
      console.log("Posting", areport);
      BackendService.postResource("api/areport", areport)
    }

  }

})();

