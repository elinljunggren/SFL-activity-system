/**
 * Created by Simon on 2016-08-08.
 */
var activity_system = angular
    .module('activity_system', [
      'ngRoute',
      'activity_system.admin',
      'activity_system.report-activity',
      'activity_system.service',
      'activity_system.login',
      'chart.js'
    ]).config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/admin', {
        templateUrl: 'admin/admin.html',
        controller: 'AdminController',
        data: {allowedRoles: ['Admin']}
      });
      $routeProvider.when('/report-activity', {
        templateUrl: 'report-activity/report-activity.html',
        controller: 'ReportActivityController',
        data: {allowedRoles: ['Admin','Staff']}
      });
      $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginController'
      });
      $routeProvider.otherwise({redirectTo: '/login'});
    }]).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.firstDayOfWeek = 1;
    }).controller('ApplicationCtrl', ApplicationCtrl)

    .run(function ($rootScope, $window, AuthenticationService) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
          console.log("Cookies",document.cookie);

          if (!next.$$route.data || !next.$$route.data.allowedRoles) {
            return;
          }


          var allowedRoles = next.$$route.data.allowedRoles;

          console.log(allowedRoles, AuthenticationService.getUserType());
          if (allowedRoles.indexOf(AuthenticationService.getUserType()) > -1) {
            return;
          } else {
            $window.location.href = '#/login';
          }
        })
      //editableOptions.theme = 'bs3';

      }
    );

  ApplicationCtrl.$inject = ['$scope', 'AuthenticationService'];
  function ApplicationCtrl($scope, AuthService) {

    $scope.user = {name: "Username", type: undefined, authenticated: false};
  }
