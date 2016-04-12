recipeApp.controller('navController', function($scope, utilLocalStore) {

    $scope.message ="Login to Your My Grub Account";
    $scope.user = "";
    $scope.pass = "";

    utilLocalStore.setUserName('curtis');
    utilLocalStore.setUserPswd('123');


    $scope.loginSubmit = function(){
        
    // $scope.user.utilLocalStore.getUserName('');
    
    // $scope.pass.utilLocalStore.getUserPswd('');   

        console.log($scope.user + $scope.pass);
    }

});
