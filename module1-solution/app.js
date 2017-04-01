(function () {
'use strict';

// Angular module and controller declaration
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

// $Scope injected here to protect from minification
LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    $scope.checkMessage = "";
    $scope.dishes = "";
    $scope.checkDishesNumber = function() {
      var total = getDishesNumber($scope.dishes);
      $scope.checkMessage = getCheckMessage(total);
    };

  // calculate the number of dishes
  // Please note that empty dishes are skipped !
  function getDishesNumber(listDishes) {
    var totalDishes = 0;

    if(listDishes)
    {
      var arrayDishes = listDishes.split(',');
      arrayDishes = arrayDishes.filter(filterDish);

      totalDishes = arrayDishes.length;
    }

    return totalDishes;
  }

  // dish filter : we only keep not empty dish
  function filterDish(dish) {
    return dish.trim().length > 0;
  }

  function getCheckMessage(number) {
    if(number > 0 && number <= 3) {
      return "Enjoy!";
    }
    else if(number > 3) {
      return "Too much!"
    }
    else {
      return "Please enter data first";
    }
  }
} // LunchCheckController

})();
