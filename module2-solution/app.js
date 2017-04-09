(function () {
'use strict';

// Angular module and controller declaration
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

///////////////////////////////////////////
// ToBuyController configuration         //
///////////////////////////////////////////
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtrl = this;

  toBuyCtrl.toBuyItemList = ShoppingListCheckOffService.getToBuyItems();

  toBuyCtrl.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

///////////////////////////////////////////
// AlreadyBoughtController configuration //
///////////////////////////////////////////
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtCtrl = this;

  alreadyBoughtCtrl.alreadyBoughtItemList = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

///////////////////////////////////////////
// ShoppingListCheckOffService           //
///////////////////////////////////////////
function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = initToBuyItems();
  var alreadyBoughtItems = [];

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

  service.buyItem = function(itemIndex) {
    // 1 - Add the item to the list of already bought items
    alreadyBoughtItems.push(toBuyItems[itemIndex]);
    // 2 - Remove the item from the list of items to buy
    toBuyItems.splice(itemIndex, 1);
  };

  function initToBuyItems() {
    var items = [];

    items.push({ name: "cookies", quantity: 10 });
    items.push({ name: "raspberries", quantity: 5 });
    items.push({ name: "eggs", quantity: 6 });
    items.push({ name: "tomatoes", quantity: 3 });
    items.push({ name: "apples", quantity: 4 });

    return items;
  };
}

})();
