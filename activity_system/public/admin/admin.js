/**
 * Created by Simon on 2016-08-08.
 */


  angular
    .module('activity_system.admin',['ngRoute','ngMaterial','md.data.table', 'angularMoment'])
    .controller('AdminController', AdminController)
    .filter('matchFilters', function(){
      return function(areports, filter){
        var filteredAReports = [];
        for(var i = 0; i < areports.length; i++){
                filteredAReports.push(areports[i])
          }
        console.log(filter);
        var fromDate = moment(filter.fromDate);
        var toDate = moment(filter.toDate);
        for(var i = areports.length-1; i >= 0; i--){
          var areportsDate = moment(areports[i].date);
            if(filter.schools && filter.schools.length>0 && filter.schools.indexOf(areports[i].school) == -1){
                filteredAReports.splice(i,1);
            }else if(filter.fromDate && areportsDate.isBefore(fromDate)){
                filteredAReports.splice(i,1);
            }else if(filter.toDate && areportsDate.isAfter(toDate)){
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

    $scope.filter = {

    };

    $scope.findArea = function(school){
      for(var i = 0; i<$scope.data.schools.length; i++){
        if($scope.data.schools[i].name == school){
          return $scope.data.schools[i].area;
        }
      }
    }

    $scope.filterApplied = function(){
      console.log($scope.filter);
    }

    function activate() {
      console.log("Activate in admin!");
      $scope.data = BackendService.data;
    }

  }


