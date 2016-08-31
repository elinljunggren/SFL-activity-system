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
      grades: [],
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
      getResource('api/area',"areas");
      getResource('api/areport',"activityreports");
      getResource('api/grade', "grades");
      getResource('api/program', "programs");
      getResource('api/school',"schools");
      getResource('api/staff', "staff");
      getResource('api/title', "titles");
      console.log(service.data);
    }

    loadData();

    service.postResource = postResource;

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

    function postResource(url, data, cbOnError){
      $http.post(url,data).
        success(function(data) {
            console.log("Posted successfully");
        }).error(function(data) {
            console.error("Error in posting");
            cbOnError();
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