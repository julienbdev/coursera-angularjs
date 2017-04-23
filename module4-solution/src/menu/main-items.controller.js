(function () {
'use strict';

angular.module('MenuApp')
.controller('MainItemsController', MainItemsController);

// menuItems come from resolve property in RoutesConfig
MainItemsController.$inject = ['menuItems'];
function MainItemsController(menuItems) {
  var controller = this;
  controller.items = menuItems;
}

})();
