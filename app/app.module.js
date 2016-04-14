var recipeApp = angular.module('recipeApp', ['ngRoute', 'LocalStorageModule']);

//"run" executes once all modules have been loaded.
recipeApp.run( function($rootScope, $location, sharedData) {

   $rootScope.$watch(
    //This is the watch value function. It should return the value which is being watched.
    //In this case, we're watching the path.
    function() { 
      return $location.path(); 
    },
    //This is the watch listener function.  It will should "do" something when the 
    //watched value has changed.  In this case, if the path changed to something 
    //other than the home page and the user is not logged in pushed them to the home page.
    function(a){  
        
        if(a !== '/'){
            console.log('url has changed : ' + a);
            //Put some code in here to check if they are logged in!
            //If not... send them home.
            if (!sharedData.isLoggedIn()) {
                console.log(' ... but the user is not logged in');
                 $location.path('/');
            }
        }
    });


});

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
                    // alert('image exists');
                }).error(function() {
                    // alert('image does not exist');
                    element.attr('src', 'assets/img/placeholder.jpg'); // set default image
                });
            });
        }
    };
});

