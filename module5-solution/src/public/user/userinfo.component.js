(function () {
"use strict";

angular.module('public')
.component('userInfo', {
  templateUrl: 'src/public/user/user-info.html',
  bindings: {
    userinfo: '<'
  }
});

})();
