/**
 * Created by Simon on 2016-08-08.
 */


  angular
    .module('activity_system.admin',['ngRoute','ngMaterial','md.data.table', 'angularMoment'])
    .controller('AdminController', AdminController)
    .filter('matchFilters', function(){
      return function(areports, filter, data){
        var filteredAReports = [];
        for(var i = 0; i < areports.length; i++){
                filteredAReports.push(areports[i])
          }
        var fromDate = moment(filter.fromDate);
        var toDate = moment(filter.toDate);
        for(var i = areports.length-1; i >= 0; i--){
          var areportsDate = moment(areports[i].date);
          for(var j = 0; j<data.schools.length; j++){
            if(data.schools[j].name == areports[i].school){
              var area = data.schools[j].area;
            }
          }
          for(var j = 0; j<data.activities.length; j++){
            if(data.activities[j].name == areports[i].activity){
              var acategory = data.activities[j].category;
            }
          }
          for(var j = 0; j<data.programs.length; j++){
            if(data.activitycategories[j].name == acategory){
              var program = data.activitycategories[j].program;
            }
          }
          if(filter.schools && filter.schools.length>0 && filter.schools.indexOf(areports[i].school) == -1){
              filteredAReports.splice(i,1);
          }else if(filter.fromDate && areportsDate.isBefore(fromDate)){
              filteredAReports.splice(i,1);
          }else if(filter.toDate && areportsDate.isAfter(toDate)){
              filteredAReports.splice(i,1);
          }else if(filter.areas && filter.areas.length>0 && filter.areas.indexOf(area) == -1){
              filteredAReports.splice(i,1);
          }else if(filter.staff && filter.staff.length>0 && filter.staff.indexOf(areports[i].staff) == -1){
              filteredAReports.splice(i,1);
          }else if(filter.programs && filter.programs.length>0 && filter.programs.indexOf(program) == -1){
              filteredAReports.splice(i,1);
          }else if(filter.activitycategories && filter.activitycategories.length>0 && filter.activitycategories.indexOf(acategory) == -1){
              filteredAReports.splice(i,1);
          }else if(filter.activities && filter.activities.length>0 && filter.activities.indexOf(areports[i].activity) == -1){
              filteredAReports.splice(i,1);
          }
        }
        return filteredAReports;
      }
    })
    .filter('formatDateTime', function(){
      return function(input,format){
        return moment(input).format(format);
      }
    });

  AdminController.$inject = ['$scope','$http','BackendService'];

  /* @ngInject */
  function AdminController($scope,$http,BackendService) {
    var self = this;

    activate();

    ////////////////

    $scope.getItems = function() {
         $http.get('api/staff')
            .success(function(data, status) {
                $scope.items = data;
                console.log(status);
             })
            .error(function(data, status) {
                console.log("Error");
            })
    }

    $scope.tableQuery = {
      order: 'date',
      limit: 10,
      page: 1,
      options : [5,10,25,100]
    };

    $scope.searchFilter = {};

    $scope.findArea = function(school){
      for(var i = 0; i<$scope.data.schools.length; i++){
        if($scope.data.schools[i].name == school){
          return $scope.data.schools[i].area;
        }
      }
    }

    $scope.findActivityCategory = function(activity){
      for(var i = 0; i<$scope.data.activities.length; i++){
        if($scope.data.activities[i].name == activity){
          return $scope.data.activities[i].category;
        }
      }
    }

    $scope.findProgram = function(acategory){
      for(var i = 0; i<$scope.data.activitycategories.length; i++){
        if($scope.data.activitycategories[i].name == acategory){
          return $scope.data.activitycategories[i].program;
        }
      }
    }

    $scope.filterApplied = function(){
      console.log($scope.searchFilter);
    };

    $scope.clearAllFilters = function(){
      $scope.searchFilter = {};
    };

    $scope.filterActivity = function(activity){
      $scope.searchFilter.activities.push(activity)
    };

    function activate() {
      console.log("Activate in admin!");
      $scope.data = BackendService.data;
    }

  }


