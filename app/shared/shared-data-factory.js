recipeApp.factory('sharedData', function() {
    // var sharedData = {
    //     searchTerm: '',
    //     //add other shared variables below.
    //     userProfile: ''
    // };
    var sharedData = {};
    sharedData.searchTerm = "";
    sharedData.userProfile = {};
    sharedData.isLoggedIn = function () {
        if ( sharedData.userProfile.email)  {
            return true;
        }
        else {
            return false;
        }
    };

    return sharedData;
});

function inventoryItem(item, qty, uom) {
    this.item = item;
    this.qty = qty;
    this.uom = uom;
}
