var recipeApp = angular.module('recipeApp', ['ngRoute', 'LocalStorageModule']);

recipeApp.directive('directive1', function() {
    return {
        controller: RightCtrl
    };
});

//add  "check-image" (without quotes) attribute to the img element
recipeApp.directive('checkImage', function($http) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                $http.get(ngSrc).success(function() {
                    // alert('image exist');
                }).error(function() {
                    // alert('image not exist');
                    element.attr('src', 'assets/img/placeholder.jpg'); // set default image
                });
            });
        }
    };
});

