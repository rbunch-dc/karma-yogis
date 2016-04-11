var recipeApp = angular.module('recipeApp', ['ngRoute']);

recipeApp.directive('directive1', function() {
    return {
        controller: RightCtrl
    };
});
