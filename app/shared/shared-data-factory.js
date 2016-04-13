recipeApp.factory('sharedData', function() {
    var sharedData = {
        searchTerm: '',
        //add other shared variables below.
        userProfile: ''
    };

    return sharedData;
});

function inventoryItem(item, qty, uom){
  this.item = item;
  this.qty = qty;
  this.uom = uom;
}