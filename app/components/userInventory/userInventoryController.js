recipeApp.controller('userInventoryController', function($scope, $location, userStore, sharedData, weatherApi) {

    var userProfile = sharedData.userProfile; //userStore.getUser("jeremyhilliard14@gmail.com");
    var weatherData = {};
    $scope.nameFirst = userProfile.nameFirst;
    $scope.nameLast = userProfile.nameLast;
    $scope.city = userProfile.city;
    $scope.zip = userProfile.zip;
    // $scope.inventory = sharedData.userProfile.inventory;
    $scope.inventory = userProfile.inventory;
    $scope.email = userProfile.email;
    $scope.favFood = userProfile.favFood;
    //utilLocalStore.getInventory() || [];
    console.log(sharedData.userProfile);

    $scope.addInventoryItem = function() {
        if (!$scope.item) {
            return;
        }

        var invItem = new inventoryItem($scope.item, $scope.qty, $scope.uom, false);

        if (!$scope.inventory) {
            $scope.inventory = [];
        }

        if (!sharedData.userProfile.inventory) {
            sharedData.userProfile.inventory = [];
        }
        sharedData.userProfile.inventory.push(invItem);
        userStore.setUser(sharedData.userProfile);
        $scope.$apply();
        // $scope.inventory.push(invItem);
        // $scope.newInventoryItem = '';

        //userProfile.inventory.push(invItem);

        // sharedData.userProfile = userProfile;
        // userStore.setUser(userProfile);

        console.log(sharedData);
        console.log(sharedData.userProfile);
    };



    $scope.addFavorite = function() {
        if (!$scope.selectCuisine) {
            return;
        }
        var favoriteFood = new foodItem($scope.selectCuisine);
        if (!$scope.favFood) {
            $scope.favFood = [];
        }

        if (!sharedData.userProfile.favFood) {
            sharedData.userProfile.favFood = [];
        }
        sharedData.userProfile.favFood.push(favoriteFood);
        userStore.setUser(sharedData.userProfile);
        $scope.$apply();
        // $scope.favFood.push(favoriteFood);
        // $scope.newFavoriteFood = '';

        // if (!sharedData.userProfile.favFood) {
        //     sharedData.userProfile.favFood = [];
        // }

        // //userProfile.favFood.push(favoriteFood);

        // sharedData.userProfile = userProfile;
        // userStore.setUser(userProfile);

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
        var result = Lobibox.confirm({
            msg: "Are you sure you want to delete this item?",
            callback: function($this, type, ev) {
                if (type === 'yes') {
                    sharedData.userProfile.inventory.splice(index, 1);
                    // $scope.inventory = sharedData.userProfile.inventory;
                    userStore.setUser(sharedData.userProfile);
                    $scope.$apply();
                }
                console.log(ev);
                console.log(type);
            }
        });
    };

    $scope.includeCuisine = function(include, index) {
        sharedData.userProfile.favFood[index].include = include;
        userStore.setUser(sharedData.userProfile);
    };

    $scope.removeCuisine = function(index) {
        var result = Lobibox.confirm({
            msg: "Are you sure you want to delete this cuisine?",
            callback: function($this, type, ev) {
                if (type === 'yes') {
                    sharedData.userProfile.favFood.splice(index, 1);
                    // $scope.favFood = sharedData.userProfile.favFood;
                    userStore.setUser(sharedData.userProfile);
                    $scope.$apply();
                }
            }
        });
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
