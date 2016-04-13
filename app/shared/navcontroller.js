recipeApp.controller('navController', function($scope, $location, sharedData, utilLocalStore) {

    $scope.message ="Login to Your My Grub Account";
    $scope.user = "";
    $scope.pass = "";

    utilLocalStore.setUserName('curtis');
    utilLocalStore.setUserPswd('123');


    $scope.loginSubmit = function(){
        
    // $scope.user.utilLocalStore.getUserName('');
    
    // $scope.pass.utilLocalStore.getUserPswd('');   

        console.log($scope.user + $scope.pass);
    };

    $scope.routeToRecipeView = function(){
        console.log($scope.searchTerm);
        //grab the searchTerm (ng-model) and assign to the sharedData factory so other controllers and use it.
        sharedData.searchTerm = $scope.searchTerm;
        //now route to the recipe controller & view
        $location.path('/recipe');
    };

});
