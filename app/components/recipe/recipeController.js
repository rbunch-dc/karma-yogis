recipeApp.controller('recipeController', function($scope, $location, sharedData, utilLocalStore, recipesApi) {

    //This block must be at the top of this controller
    // if no one is logged in but enter http://..../#/recipe [or inventory] send them to the home page
    // if ( !sharedData.isLoggedIn() ) {
    //    $location.path('/');
    // }    
    //-----
    console.log("search term = " + sharedData.searchTerm);
    var loading_screen;
    //http://api.yummly.com/v1/api/recipes?_app_id=e0a0ad85&_app_key=30d09c4f5cd26c2e94067912d367b9c6&maxResult=50&q=
    var _apiId = 'e0a0ad85';
    var _apiKey = '30d09c4f5cd26c2e94067912d367b9c6';
    var _query = sharedData.searchTerm || 'chicken soup';
    var _max = 150;
    $scope.searchRecipes = function() {
        loading_screen = window.pleaseWait({
            logo: "assets/img/logo2.png",
            backgroundColor: '#8a1617',
            // backgroundColor: '#ffffff',
            loadingHtml: '<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>'
        });
        recipesApi.getRecipes(_max, _query, _apiKey, _apiId, successFunc, failFunc);
    };
    //(max, query, apiKey, apiId, successFunc, failFunc)
    function successFunc(data) {
        $scope.recipes = data.sort(descendingRating);
        loading_screen.finish();
        //console.log($scope.recipes);
    }

    function failFunc(error) {
        console.log("Error: " + error);
        loading_screen.finish();
    }

    $scope.searchRecipes();

    function successFuncInv(data) {
        $scope.recommendations = data.sort(descendingRating);
    }

    function failFuncInv(error) {
        console.log("Cuisine Error: " + error);
    }


    $scope.getRecommendedRecipes = function() {
        //var searhParm = $scope.searchTerm;  //include
        var _queryInvItemsIncl = "";
        // console.log(sharedData.userProfile.inventory);
        if (sharedData.userProfile.inventory) {
            sharedData.userProfile.inventory.forEach(function(val) {
                if (val.include) {
                    _queryInvItemsIncl += _queryInvItemsIncl + ' ' + val.item;
                }
            });
        }
        var favCuisines = [];
        if (sharedData.userProfile.favFood) {
            sharedData.userProfile.favFood.forEach(function(val) {
                if (val.include) {
                    favCuisines.push(val.cuisine);
                }
            });
        }
        if (favCuisines.length === 0 && _queryInvItemsIncl.length === 0) {
            console.log("Can't make recommendations. Need at least 1 Inventory item or Favorite Cuisine");
            return;
        }
        recipesApi.getRecipes(75, _queryInvItemsIncl, _apiKey, _apiId, successFuncInv, failFuncInv, favCuisines);
    };

    $scope.getRecommendedRecipes();

    //compare function for sorting the recipes by rating in descending order
    function descendingRating(a, b) {
        return b.rating - a.rating;
    }
});
