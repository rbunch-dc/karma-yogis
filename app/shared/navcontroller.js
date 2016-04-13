recipeApp.controller('navController', function($scope, $location, sharedData, utilLocalStore, userStore) {

    $scope.message = "Login to Your My Grub Account";
    $scope.user = "";
    $scope.pass = "";

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
            $('#login-modal').modal('hide');
        } else {
            $scope.message = "Invalid Info";
        }
       
    };

    $scope.signUp = function() {
        if (isNullOrEmpty($scope.youremail) || isNullOrEmpty($scope.reenteremail) || isNullOrEmpty($scope.password))  {
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

        sharedData.userProfile = newUser;
        $('#sign-up-modal').modal('hide');
        
        console.log(newUser);
    };
    $scope.routeToRecipeView = function() {
        console.log($scope.searchTerm);
        //grab the searchTerm (ng-model) and assign to the sharedData factory so other controllers and use it.
        sharedData.searchTerm = $scope.searchTerm;
        //now route to the recipe controller & view
        $location.path('/recipe');
    };

    function isNullOrEmpty (value) {
        return !value;
    }
    // for testing only
    // var newUser = new userProfilePrefs();
    // newUser.email = 'curtjenk@comcast.net';
    // newUser.nameFirst = "curtis";
    // newUser.nameLast = "jenkins";
    // newUser.password = "Test123";
    // newUser.favFood = ['pizza', 'tacos', 'cake'];
    // newUser.inventory = [new inventoryItem('milk', 1, 'gallon'), new inventoryItem('cheese', 1, 'lb')];
    // userStore.setUser(newUser);

    /*
var userProfilePrefs = function(data) {
    data = data || {};
    this.email = data.email;
    this.nameFirst = data.nameFirst;
    this.nameLast = data.nameLast;
    this.password = data.password;
  
    this.favFood = data.favFood;  //array of strings ['s1', 's2']
    this.inventory = data.inventory; //array of objects [type inventoryItem]
};



  */
});
