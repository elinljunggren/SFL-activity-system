/**
 * Created by Simon on 2016-08-08.
 */


  angular
    .module('activity_system.admin',['ngRoute'])
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope'];

  /* @ngInject */
  function AdminController($scope) {
    var vm = this;
    vm.title = 'AdminController'

    activate();

    ////////////////

    function activate() {
      console.log("Activate in admin!");
    }

  }


