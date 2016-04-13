recipeApp.controller('userInventoryController', function($scope, utilLocalStore, userStore) {


	$scope.inventory = utilLocalStore.getInventory() || [];
	//console.log($scope.inventory);

	$scope.addInventoryItem = function() {
	    $scope.inventory.push(new inventoryItem($scope.item, $scope.qty, $scope.uom));
	 	$scope.newInventoryItem = '';
	 	utilLocalStore.setInventory($scope.inventory);
	 	console.log($scope.inventory);
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