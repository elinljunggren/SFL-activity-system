/**
 * Created by Simon on 09/08/16.
 */


  angular
    .module('activity_system.service')
    .service('AuthenticationService', AuthenticationService);

  function AuthenticationService() {

    var user = {name : "", type: undefined}
    var service = {
      login: login,
      logout: logout,
      getUserName: getUserName,
      getUserType: getUserType
    };
    return service;

    function getUserName(){
      return user.name;
    }
    function getUserType(){
      return user.type;
    }

    /**
     * Send a login request to the server
     * @param username
     * @param password
     * @param callback function that returns true if successful or false and a message if it failed
     */
    function login(credentials, callback) {
      /*io.socket.post('/login', {username: credentials.username, password: credentials.password}, function (resData, jwres) {
        var response = {};
        if (jwres.statusCode == 200) {
          service.authenticated = true;
          user.type = resData.usertype;
          user.name = resData.username;
          response.usertype = resData.usertype;
          response.username = resData.username;
          response.success = true;
          console.log("Login successful");
        } else {
          response.success = false;
          response.message = resData;
        }
        callback(response);
      })*/
      var response = {};
      if(credentials.username == "admin"){
        user.type = "Admin";
        response.usertype = "Admin";
        user.name = credentials.username;
        response.username = credentials.username;
        response.success = true;
        console.log("Login successful");
      }else if(credentials.username == "staff"){
        user.type = "Staff";
        response.usertype = "Staff";
        user.name = credentials.username;
        response.username = credentials.username;
        response.success = true;
        console.log("Login successful");
      } else{
        response.success = false;
      }
      callback(response);
    }

    function logout(callback) {
      /*io.socket.post('/logout', {}, function (resData, jwres) {
        user.name = "";
        user.type = undefined;
        callback();
      })*/
    }


  }
