recipeApp.controller('userInventoryController', function($scope, utilLocalStore) {

var inventory = [];
function inventoryItem(item, qty, uom){
	this.item = item;
	this.qty = qty;
	this.uom = uom;
}

inventory.push(new inventoryItem("milk", 1, "gallon"));
inventory.push(new inventoryItem("bread", 1, "loaf"));

utilLocalStore.setInventory(inventory);

console.log(inventory);

var getInv = utilLocalStore.getInventory();

console.log(getInv);
var item = getInv[0];
console.log(item);
});