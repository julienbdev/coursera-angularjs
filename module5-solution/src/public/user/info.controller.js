(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['UserService'];
function InfoController(UserService) {
  var infosCtrl = this;

  infosCtrl.userInfo = UserService.getInfos();

  if(angular.equals(infosCtrl.userInfo, {})) {
    infosCtrl.registered = false;
  }
  else {
    infosCtrl.registered = true;
  }
}

})();
