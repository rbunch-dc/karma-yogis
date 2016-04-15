//Global funcitons go here
// trunc will truncate a string, backup to a space and add ellips
String.prototype.trunc = String.prototype.trunc ||
    function(n, isHtml) {
        // if (isHtml) {
        //     return (this.length > n) ? backupToSpace(this.substr(0, n), n-1) + '\&hellip;' : this;
        //     // return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
        // } else {
            return (this.length > n) ? backupToSpace(this.substr(0, n), n-1) + '...' : this;
        // }
    };

    function backupToSpace(s, n) {
        var ndx = 0;
        for (var i=n; i>0; i--) {
            if (s[i] === ' ') {
                ndx = i;
                break;
            }
        }
        return s.substr(0, ndx);
    }

//-----------
//This factory will contain data shared across all the controllers.
recipeApp.factory('sharedData', function() {
    // var sharedData = {
    //     searchTerm: '',
    //     //add other shared variables below.
    //     userProfile: ''
    // };
    var sharedData = {};
    var cuisineList = [
        "American", "Italian", "Asian", "Mexican",
        "Southern & Soul Food", "French", "Southwestern",
        "Barbecue", "Indian", "Chinese", "Cajun & Creole",
        "English", "Mediterranean", "Greek", "Spanish",
        "German", "Thai", "Moroccan", "Irish", "Japanese",
        "Cuban", " Hawaiin", "Swedish", "Hungarian", "Portugese"
    ];
    var foodList = ["chicken", "turkey", "eggs", "potatoe", "pretzels",
        "salmon", "bacon", "ham", "baking powder", "avocado", "graham crackers", "meatball",
        "onion", "pickle", "tomato", "kalamata", "vinegar", "beef", "coconut", "banana", "shrimp",
        "spaghetti", "asparagus", "corn", "mushroom", "cabbage", "chocolate", "rice", "broccoli",
        "talapia", "strawberry", "apple", "milk", "cheese", "pancake", "ketchup", "hot dog", "bologna",
        "mustard"
    ];

    sharedData.searchTerm = "";
    sharedData.userProfile = {};
    sharedData.isLoggedIn = function() {
        if (sharedData.userProfile.email) {
            return true;
        } else {
            return false;
        }
    };
    sharedData.cuisineList = cuisineList;

    sharedData.foodList = foodList;

    sharedData.getRandomCuisines = function(number) {
        var ndx = 0;
        var list = [];
        for (var i = 0; i < number; i++) {
            ndx = Math.floor(Math.random() * cuisineList.length);
            list.push(cuisineList[ndx]);
        }
        return list;
    };
    sharedData.getRandomFoods = function(number) {
        var ndx = 0;
        var list = [];
        for (var i = 0; i < number; i++) {
            ndx = Math.floor(Math.random() * foodList.length);
            list.push(foodList[ndx]);
        }
        return list;
    };

    return sharedData;
});

function inventoryItem(item, qty, uom) {
    this.item = item;
    this.qty = qty;
    this.uom = uom;
}
