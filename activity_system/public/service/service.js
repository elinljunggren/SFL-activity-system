(function() {
  'use strict';

  angular
    .module('activity_system.service', [])
    .service('BackendService', BackendService);

  BackendService.$inject = ['$http','$q'];

  function BackendService($http,$q) {
    var service = {};
    service.data = {
      activities: [],
      activitycategories: [],
      activityreports: [],
      areas: [],
      programs: [],
      schools: [],
      staff: [],
      titles: [],
      worksat: []
    };

    function loadData(){
      console.log("Loading data");
      getResource('api/activity',"activities");
      getResource('api/acategory', "activitycategories");
      getResource('api/program', "programs");
      getResource('api/staff', "staff");
      console.log(service.data);
    }

    loadData();

    return service;

    function getResource(url, type){
      $http.get(url)
          .success(function(data, status) {
            service.data[type].push.apply(service.data[type],data);
            console.log(service.data[type]);
            sync();
          })
          .error(function(data, status) {
            console.log("Error");
          })
    }

    function sync() {
      $q.when(service.data)
          .then(function(data) {
            service.data = data;
          })
    }
  }

})();