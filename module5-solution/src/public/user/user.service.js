(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);

function UserService() {
  var service = this;
  var userInfos = {};

  service.saveInfos = function (infos) {
    userInfos = infos;
  };

  service.getInfos = function () {
    return userInfos;
  };
}



})();
