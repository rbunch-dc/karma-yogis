recipeApp.controller('navController', function($scope, $location, $route, sharedData, utilLocalStore, userStore) {

    $scope.message = "Login to Your My Grub Account";
    $scope.signUpMessage = "Sign Up";
    $scope.user = "";
    $scope.pass = "";
    $scope.sharedData = sharedData;

    // utilLocalStore.setUserName('curtis');
    // utilLocalStore.setUserPswd('123');


    $scope.logoutSubmit = function() {
        //remove the userProfile:
        sharedData.userProfile = {};
        //toggle loggedIn
        $scope.loggedIn = false;
    };

    $scope.loginSubmit = function() {

        var userData = userStore.getUser($scope.userEmail);
        if (userData === undefined || userData === null) {
            $scope.message = "Account not found";
            return;
        }
        if ($scope.userPass === userData.password) {
            sharedData.userProfile = userData;
            // console.log('successful login');
            // console.log(sharedData.userProfile);
            $scope.loggedIn = true;
            $scope.nameFirst = sharedData.userProfile.nameFirst;
            $scope.nameLast = sharedData.userProfile.nameLast;
            $('#login-modal').modal('hide');
        } else {
            $scope.message = "Invalid Info";
        }


    };

    $scope.signupFromLogin = function() {
        $('#login-modal').modal('hide');

        $('#sign-up-modal').modal('show');
    };

    $scope.signUp = function() {
        if (isNullOrEmpty($scope.youremail) || isNullOrEmpty($scope.reenteremail) || isNullOrEmpty($scope.password)) {
            $scope.signUpMessage = 'Missing Info';
            // alert('Missing Required Information');
            return;
        }
        var email = $scope.youremail.trim();
        var userData = userStore.getUser(email);
        if (userData !== undefined && userData !== null) {
            $scope.signUpMessage = "Account Already Exists";
            // alert('already exists');
            return;
        }

        var newUser = new userProfilePrefs();
        newUser.email = $scope.youremail;
        newUser.nameFirst = upFirstChar($scope.firstname);
        newUser.nameLast = upFirstChar($scope.lastname);
        newUser.password = $scope.password;
        newUser.city = $scope.city;
        newUser.zip = $scope.zip;
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
        if (isNullOrEmpty(userProfile.email)) {
            $('#login-modal').modal('show');
            // alert('not logged in');
            return;
        }
        console.log($location.path());
        //check if current path is the "next" path.  If so, just reload the page.
        if ($location.path() == next) {
            $route.reload();
        }
        $location.path(next);
        switch (nextPage) {
            case 'home':
                $('#active-home').addClass('active');
                $('#active-recipe').removeClass('active');
                $('#active-inventory').removeClass('active');
                break;
            case 'recipe':
                $('#active-home').removeClass('active');
                $('#active-recipe').addClass('active');
                $('#active-inventory').removeClass('active');
                break;
            case 'inventory':
                $('#active-home').removeClass('active');
                $('#active-recipe').removeClass('active');
                $('#active-inventory').addClass('active');
                break;
        }

    };

    function isNullOrEmpty(value) {
        return !value;
    }
});
