(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/templates/home.template.html'
  })

  // Menu's categories
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menu/templates/main-categories.template.html',
    controller: 'MainCategoriesController as categoriesCtrl',
    resolve: {
      categoryItems: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Menu's items for a category
  .state('items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menu/templates/main-items.template.html',
    controller: "MainMenuItemsController as menuItemsCtrl",
    resolve: {
      menuItems: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
      }]
    }
  });
}

})();
