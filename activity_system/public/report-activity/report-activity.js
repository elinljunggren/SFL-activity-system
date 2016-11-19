/**
 * Created by Simon on 2016-08-08.
 */
(function () {
  'use strict';

  angular
    .module('activity_system.report-activity',['ngRoute','ngMaterial', 'ngMessages','angularMoment'])
    .controller('ReportActivityController', ReportActivityController);

  ReportActivityController.$inject = ['$scope','BackendService', '$location', '$routeParams', '$mdToast', 'data'];

  /* @ngInject */
  function ReportActivityController($scope, BackendService, $location, $routeParams, $mdToast, data) {
    var self = this;
    $scope.controller = this;
    $scope.data = data;

    $scope.submitted = $routeParams.submitted;
    if($scope.submitted){
      $mdToast.show(
          $mdToast.simple()
              .textContent('Report submitted')
              .hideDelay(3000)
      );
    }

    self.selectedStaff = querySearchStaff($routeParams.name)[0] || null;
    self.searchStaff = null;

    var today = new Date();
    self.activityReport = {
      staff: self.selectedStaff ? self.selectedStaff.name : undefined,
      date: today,
      nrOfParticipants: 1
    };

    self.querySearchStaff = querySearchStaff;

    function querySearchStaff(query) {
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
    };

    self.programIsSchools = false;

    self.programChanged= function(){
      if(self.activityReport.program == "Schools"){
        self.programIsSchools = true;
      }else{
        self.programIsSchools = false;
      }
    };

    self.sendActivityReport = function(){
      var areport = {
        date: undefined,
        staff: undefined,
        school: undefined,
        activity: undefined,
        grade: undefined,
        nrOfParticipants: undefined,
        comment: undefined
      };
      for (var prop in areport) {
        areport[prop] = self.activityReport[prop];
      }
      if(areport.staff == undefined || areport.date == undefined || areport.activity == undefined){
        return;
      }
      var staffName = self.activityReport.staff;
      areport.date =  moment(areport.date).format("YYYY-MM-DD HH:mm:ss");
      console.log("Posting", areport);
      BackendService.postResource("api/areport", areport, function(){
        alert("Something went wrong when posting the activity, try again later.");
      });
      self.activityReport = {
        staff: undefined,
        date: today,
        nrOfParticipants: 1
      };
      self.selectedStaff = null;
      self.searchStaff = null;
      //$route.reload();
      //$scope.showAlert(event);
      $location.path("/report-activity/name/"+staffName+"/submitted/true");
    };

    $scope.showAlert = function(ev) {
      $mdDialog.show(
          $mdDialog.alert()
              .parent(angular.element(document.querySelector('#formContainer')))
              .clickOutsideToClose(true)
              .title('Activity report sent')
              .textContent('You have successfully sent you activity report.')
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
              .targetEvent(ev)
      );
    };

  }

})();

