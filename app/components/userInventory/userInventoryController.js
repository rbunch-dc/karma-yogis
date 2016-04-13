recipeApp.controller('userInventoryController', function($scope, utilLocalStore, userStore, sharedData) {

var userProfile = sharedData.userProfile;   //userStore.getUser("jeremyhilliard14@gmail.com");

	// $scope.inventory = sharedData.userProfile.inventory;
	$scope.inventory = userProfile.inventory;

	//utilLocalStore.getInventory() || [];
	console.log(sharedData.userProfile);

	$scope.addInventoryItem = function() {
		var invItem = new inventoryItem($scope.item, $scope.qty, $scope.uom);
	    $scope.inventory.push(invItem);
	 	$scope.newInventoryItem = '';

	 	if (!sharedData.userProfile.inventory ) {
	 		sharedData.userProfile.inventory = [];
	 	}
	 	userProfile.inventory.push(invItem);

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


	function inventoryItem(item, qty, uom){
		this.item = item;
		this.qty = qty;
		this.uom = uom;
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