recipeApp.factory('sharedData', function() {
    // var sharedData = {
    //     searchTerm: '',
    //     //add other shared variables below.
    //     userProfile: ''
    // };
    var sharedData = {};
    sharedData.searchTerm = "";
    sharedData.userProfile = {};
    // sharedData.getUserProfile = function() {
    //     return this.userProfile;
    // };
    // sharedData.setUserProfile = function(userProfile) {
    //    this.userProfile = userProfile;
    // };
    //add other shared variables below.

    return sharedData;
});

function inventoryItem(item, qty, uom) {
    this.item = item;
    this.qty = qty;
    this.uom = uom;
}
