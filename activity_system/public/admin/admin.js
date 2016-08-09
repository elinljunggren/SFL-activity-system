/**
 * Created by Simon on 2016-08-08.
 */


  angular
    .module('activity_system.admin',['ngRoute','ngMaterial'])
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope','$http'];

  /* @ngInject */
  function AdminController($scope,$http) {
    var self = this;

    $scope.items = [];

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

    function activate() {
      console.log("Activate in admin!");
    }

  }


