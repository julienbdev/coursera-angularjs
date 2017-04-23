(function () {
'use strict';

angular.module('MenuApp')
.controller('MainMenuItemsController', MainMenuItemsController);

// menuItems come from resolve property in RoutesConfig
MainMenuItemsController.$inject = ['menuItems'];
function MainMenuItemsController(menuItems) {
  var controller = this;
  controller.items = menuItems;
}

})();
