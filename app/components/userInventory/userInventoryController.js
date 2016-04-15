recipeApp.controller('userInventoryController', function($scope, $location, userStore, sharedData, weatherApi) {

    var userProfile = sharedData.userProfile; //userStore.getUser("jeremyhilliard14@gmail.com");
    var weatherData = {};
    // $scope.inventory = sharedData.userProfile.inventory;
    $scope.inventory = userProfile.inventory;
    $scope.email = userProfile.email;
    $scope.favFood = userProfile.favFood;
    //utilLocalStore.getInventory() || [];
    console.log(sharedData.userProfile);

    $scope.addInventoryItem = function() {
        var invItem = new inventoryItem($scope.item, $scope.qty, $scope.uom, false);
        if (!$scope.inventory) {
            $scope.inventory = [];
        }

        $scope.inventory.push(invItem);
        $scope.newInventoryItem = '';

        if (!sharedData.userProfile.inventory) {
            sharedData.userProfile.inventory = [];
        }
        //userProfile.inventory.push(invItem);

        sharedData.userProfile = userProfile;
        userStore.setUser(userProfile);

        console.log(sharedData);
        console.log(sharedData.userProfile);
    };



    $scope.addFavorite = function() {

        var favoriteFood = new foodItem($scope.selectCuisine);
        if (!$scope.favFood) {
            $scope.favFood = [];
        }

        $scope.favFood.push(favoriteFood);
        $scope.newFavoriteFood = '';

        if (!sharedData.userProfile.favFood) {
            sharedData.userProfile.favFood = [];
        }

        //userProfile.favFood.push(favoriteFood);

        sharedData.userProfile = userProfile;
        userStore.setUser(userProfile);

        console.log(sharedData);
        console.log(sharedData.userProfile);

    };
    //utilLocalStore.setInventory($scope.inventory);

    //console.log(inventory);

    //console.log(getInv[0].item);
    // var item = getInv[0];
    // console.log(item);


    function inventoryItem(item, qty, uom, include) {
        this.item = item;
        this.qty = qty;
        this.uom = uom;
        this.include = include;
    }

    function foodItem(cuisine, include) {
        this.cuisine = cuisine;
        this.include = include;
    }

    $scope.includeSelected = function(include, index) {
        console.log(include);
        console.log(index);

        sharedData.userProfile.inventory[index].include = include;
        userStore.setUser(sharedData.userProfile);
    };

    $scope.removeItem = function(index) {
        var result = confirm("Do you want to remove this item?");
        if (result === true) {
            sharedData.userProfile.inventory.splice(index, 1);
            //$scope.inventory.splice(index, 1);
            userStore.setUser(sharedData.userProfile);
        } else if (result === false) {
            return;
        }
    };

    $scope.includeCuisine = function(include, index) {
        sharedData.userProfile.favFood[index].include = include;
        userStore.setUser(sharedData.userProfile);
    };

    $scope.removeCuisine = function(index) {
        var result = confirm("Do you want to remove this cuisine?");
        if (result === true) {
            sharedData.userProfile.favFood.splice(index, 1);
            //$scope.inventory.splice(index, 1);
            userStore.setUser(sharedData.userProfile);
        } else if (result === false) {
            return;
        }
    };

    function weatherSuccessFunc(data) {
    	console.log(data);
    	$scope.weather = data;
    }

    function weatherErrorFunc(data) {
    		console.log(data);
    }
    var city = sharedData.userProfile.city;
    var zip = sharedData.userProfile.zip;
    var cityOrZip;
    if (zip) {
        cityOrZip = zip;
    } else if (city) {
        cityOrZip = city;
    }
    if (cityOrZip) {
        weatherApi.getWeather(cityOrZip, weatherSuccessFunc, weatherErrorFunc);
    }

});
