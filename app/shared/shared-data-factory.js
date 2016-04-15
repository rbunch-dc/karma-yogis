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
        for (var i=0; i<number; i++) {
            ndx = Math.floor(Math.random() * cuisineList.length);
            list.push(cuisineList[ndx]);
        }
        return list;
    };
    sharedData.getRandomFoods = function(number) {
        var ndx = 0;
        var list = [];
        for (var i=0; i<number; i++) {
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
