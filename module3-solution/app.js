(function () {
'use strict';

// Angular module and controller declaration
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiMenuItemsUrl', "https://davids-restaurant.herokuapp.com/menu_items.json");

//////////////////////////////////////////
// NarrowItDownController configuration //
//////////////////////////////////////////
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.searchTerm = "";

  controller.getMatchedMenuItems = function () {
    MenuSearchService.getMatchedMenuItems(controller.searchTerm).then(function (data) {
      controller.found = data;
      console.log("controller list : ", controller.found);
    });
  };
}

//////////////////////////////////////////
// MenuSearchService configuration      //
//////////////////////////////////////////
MenuSearchService.$inject = ['$http', 'ApiMenuItemsUrl'];
function MenuSearchService($http, ApiMenuItemsUrl) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: ApiMenuItemsUrl
    }).then(function (response) {
      return foundItems(response.data.menu_items, searchTerm);
    })
    .catch(function (error) {
      // no response here, we return an empty array
      return [];
    })
  };

  // filter array with searchTerm
  function foundItems(items, searchTerm) {
    return items.filter(filterItems, searchTerm);
  }

  // keep the item if description contains searchTerm
  function filterItems(item) {
    return (item.description !== undefined && item.description.includes(this));
  }
}

})();
