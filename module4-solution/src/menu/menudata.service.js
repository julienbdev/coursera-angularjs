(function () {
'use strict';

// MenuDataService is in data module
// => data module is only responsible for getting datas
angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiRestaurantUrl', "https://davids-restaurant.herokuapp.com/")

MenuDataService.$inject = ['$http', 'ApiRestaurantUrl'];
function MenuDataService($http, ApiRestaurantUrl) {
  var service = this;

  service.getAllCategories  = function () {
    return $http({
      method: "GET",
      url: ApiRestaurantUrl+"categories.json"
    }).then(function (response) {
      return response.data;
    })
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: ApiRestaurantUrl+"menu_items.json",
      params: {
        category: categoryShortName
      }
    }).then(function (response) {
      return response.data.menu_items;
    })
  };
}

})();
