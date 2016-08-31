/**
 * Created by Simon on 2016-08-08.
 */


  angular
    .module('activity_system.admin',['ngRoute','ngMaterial','md.data.table'])
    .controller('AdminController', AdminController);

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

    function activate() {
      console.log("Activate in admin!");
      $scope.data = BackendService.data;
    }

  }


