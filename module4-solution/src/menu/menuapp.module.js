(function () {
'use strict';

angular.module('MenuApp', ['data', 'ui.router', 'Spinner'])
.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

})();
