(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService','MenuService'];
function SignUpController(UserService, MenuService) {
  var $ctrl = this;

  // init form
  $ctrl.signupFirstName = "";
  $ctrl.signupLastName = "";
  $ctrl.email = "";
  $ctrl.signupPhone = "";
  $ctrl.signupFavorite ="";

  $ctrl.completed = false;
  $ctrl.errorFavorite = false;

  // form submit
  $ctrl.submit = function () {
    // validate favorite dish
    MenuService.getMenuItem($ctrl.signupFavorite)
      .then(function (response) {
        $ctrl.errorFavorite = false;
        // validation ok, we save user's infos
        saveUserInfos(response);
        $ctrl.completed = true;
      })
      .catch(function(e) {
        $ctrl.errorFavorite = true;
        $ctrl.completed = false;
    });
  };

  function saveUserInfos(response) {
    var menuInfo = {
      shortName: response.short_name,
      title: response.name,
      description: response.description,
      categoryShortName: response.category_short_name
    };

    var userInfos = {
      firstName: $ctrl.signupFirstName,
      lastName: $ctrl.signupLastName,
      email: $ctrl.email,
      phone:   $ctrl.signupPhone,
      favorite: menuInfo
    };

    UserService.saveInfos(userInfos);
  }
}

})();
