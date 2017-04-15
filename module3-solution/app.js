(function () {
'use strict';

// Angular module and controller declaration
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiMenuItemsUrl', "https://davids-restaurant.herokuapp.com/menu_items.json")
.directive('foundItems', FoundItems);

//////////////////////////////////////////
// NarrowItDownController configuration //
//////////////////////////////////////////
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.searchTerm = "";

  controller.getMatchedMenuItems = function () {
    // MenuSearchService method return a promise,
    // found array will be updated when the result will be available in then() function
    if(controller.searchTerm) {
      MenuSearchService.getMatchedMenuItems(controller.searchTerm).then(function (data) {
        controller.found = data;
      });
    }
    else {
      controller.found = [];
    }

  };

  controller.removeMenuItem = function (itemIndex) {
    controller.found.splice(itemIndex, 1);
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

  // keep the item if description contains the search term
  function filterItems(item) {
    // search is not case sensitive
    return  (item.description !== undefined && item.description.toLowerCase().includes(this.toLowerCase()));
  }
}

//////////////////////////////////////////
// FoundItems directive configuration   //
//////////////////////////////////////////
function FoundItems() {
  var ddo = {
    templateUrl: 'menuItemsList.html',
    restrict: 'E',
    scope: {
      items: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

})();
