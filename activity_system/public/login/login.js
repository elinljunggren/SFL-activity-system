/**
 * Created by Simon on 08/08/16.
 */

  angular
    .module('activity_system.login', ['ngRoute', 'ngMaterial', 'ngMessages', 'activity_system.service'])
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'AuthenticationService', '$window'];

  function LoginController($scope, AuthService, $window) {
    var self = this;


    self.credentials = {
      username: undefined,
      password: undefined
    };

    self.response = {};
    self.login = function () {
      AuthService.login(self.credentials, function (response) {
        console.log(response);
        self.response = response.message;
        if (response.success) {
          $scope.user.authenticated = true;
          $scope.user.name = response.username;
          $scope.user.type = response.usertype;
          console.log($scope.username, $scope.usertype);
          if(response.usertype == 'Admin'){
            $window.location.href = '#/admin'
          }else{
            $window.location.href = '#/report-activity'
          }
          
        }
      })
    }
  }
