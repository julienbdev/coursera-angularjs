(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoriesController', MainCategoriesController);

// categoryItems come from resolve property in RoutesConfig
MainCategoriesController.$inject = ['categoryItems'];
function MainCategoriesController(categoryItems) {
  var controller = this;
  controller.items = categoryItems;
}

})();
