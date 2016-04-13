recipeApp.controller('navController', function($scope, $location, $route, sharedData, utilLocalStore, userStore) {

    $scope.message = "Login to Your My Grub Account";
    $scope.user = "";
    $scope.pass = "";
    $scope.sharedData = sharedData;

    utilLocalStore.setUserName('curtis');
    utilLocalStore.setUserPswd('123');


    $scope.loginSubmit = function() {

        var userData = userStore.getUser($scope.userEmail);
        if (userData === undefined || userData === null) {
            $scope.message = "Account not found";
            return;
        }
        if ($scope.userPass === userData.password) {
            sharedData.userProfile = userData;
            console.log('successful login');
            console.log(sharedData.userProfile);
            $('#login-modal').modal('hide');
        } else {
            $scope.message = "Invalid Info";
        }

    };

    $scope.signUp = function() {
        if (isNullOrEmpty($scope.youremail) || isNullOrEmpty($scope.reenteremail) || isNullOrEmpty($scope.password)) {
            alert('missing required fields');
            return;
        }
        var userData = userStore.getUser($scope.youremail);
        if (userData !== undefined && userData !== null) {
            alert('already exists');
            return;
        }

        var newUser = new userProfilePrefs();
        newUser.email = $scope.youremail;
        newUser.nameFirst = $scope.firstname;
        newUser.nameLast = $scope.lastname;
        newUser.password = $scope.password;
        newUser.favFood = [];
        newUser.inventory = [];
        userStore.setUser(newUser);
        $scope.sharedData.userProfile = newUser;
        console.log($scope.sharedData);

        $('#sign-up-modal').modal('hide');

    };
    $scope.routeToNextPage = function(nextPage) {
        //grab the searchTerm (ng-model) and assign to the sharedData factory so other controllers and use it.
        sharedData.searchTerm = $scope.searchTerm;
        var next = '/' + nextPage;
        //now check if user is logged in
        var userProfile = sharedData.userProfile;
        // var bad = isNullOrEmpty(userProfile.email);
        // console.log(userProfile);
        // console.log(bad);
        if ( isNullOrEmpty(userProfile.email) ) {
            alert('not logged in');
            return;
        }
        console.log($location.path());
        //check if current path is the "next" path.  If so, just reload the page.
        if ($location.path() == next) {
            $route.reload();
        }
        $location.path(next);

    };
    // $scope.routeToRecipeView = function() {
    //     // console.log($scope.searchTerm);
    //     //grab the searchTerm (ng-model) and assign to the sharedData factory so other controllers and use it.
    //     sharedData.searchTerm = $scope.searchTerm;
    //     //now route to the recipe controller & view
    //     console.log($location.path());
    //     if ($location.path() == '/recipe') {
    //         $route.reload();
    //     }
    //     $location.path('/recipe');

    // };

    function isNullOrEmpty(value) {
        return !value;
    }
});
