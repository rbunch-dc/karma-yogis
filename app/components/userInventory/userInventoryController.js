recipeApp.controller('userInventoryController', function($scope, $location, userStore, sharedData) {
//This block of code MUST be at the top of this controller
// if no one is logged in but enter http://..../#/recipe [or inventory] send them to the home page
        // if ( !sharedData.isLoggedIn() ) {
        //    $location.path('/');
        // }    
//-----------
var userProfile = sharedData.userProfile;   //userStore.getUser("jeremyhilliard14@gmail.com");

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

	 	if (!sharedData.userProfile.inventory ) {
	 		sharedData.userProfile.inventory = [];
	 	}
	 	//userProfile.inventory.push(invItem);

	    sharedData.userProfile = userProfile;
	    userStore.setUser(userProfile);
	 	
	 	console.log(sharedData);
	 	console.log(sharedData.userProfile);
	};
	


	$scope.addFavorite = function(){

		var favoriteFood = new foodItem($scope.selectCuisine);
		if (!$scope.favFood) {
			$scope.favFood = [];
		}

		$scope.favFood.push(favoriteFood);
		$scope.newFavoriteFood = '';

		if (!sharedData.userProfile.favFood){
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


	function inventoryItem(item, qty, uom, include){
		this.item = item;
		this.qty = qty;
		this.uom = uom;
		this.include = include;
	}

	function foodItem(cuisine, include){
		this.cuisine = cuisine;
		this.include = include;
	}

	$scope.includeSelected = function(include, index){
		console.log(include);
		console.log(index);

		sharedData.userProfile.inventory[index].include = include;
		userStore.setUser(sharedData.userProfile);
	}

	$scope.removeItem = function(index){
		var result = confirm("Do you want to remove this item?");
		if( result === true){
			sharedData.userProfile.inventory.splice(index,1);
			//$scope.inventory.splice(index, 1);
			userStore.setUser(sharedData.userProfile);
		}else if (result === false){
			return;
		}
	}

	$scope.includeCuisine = function(include, index) {
		sharedData.userProfile.favFood[index].include = include;
		userStore.setUser(sharedData.userProfile);
	}

	$scope.removeCuisine = function(index){
		var result = confirm("Do you want to remove this cuisine?");
		if( result === true){
			sharedData.userProfile.favFood.splice(index,1);
			//$scope.inventory.splice(index, 1);
			userStore.setUser(sharedData.userProfile);
		}else if (result === false){
			return;
		}
	}

// multi-user version
// var user = new userProfilePrefs();
// user.email ='curtjenk@comcast.net';
// user.userName = 'curtis jenkins';
// user.password = 'Test123';
// user.handle = '@cj';
// user.favFood = ['pizza', 'nachos', 'cake'];
// user.inventory = inventory;
// userStore.setUser(user);

// var user2 = new userProfilePrefs(userStore.getUser('curtjenk@comcast.net'));
// console.log('user2');
// console.log(user2);
});