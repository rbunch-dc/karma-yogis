recipeApp.controller('homeController', function($scope, utilLocalStore, weatherApi, recipesApi) {

var inventory = [];
function inventoryItem(item, qty, uom){
	this.item = item;
	this.qty = qty;
	this.uom = uom;
}

inventory.push(new inventoryItem("milk", 1, "gallon"));
inventory.push(new inventoryItem("bread", 1, "loaf"));

utilLocalStore.setInventory(inventory);



});