recipeApp.controller('recipeController', function($scope, sharedData, utilLocalStore, recipesApi) {

    console.log("search term = " + sharedData.searchTerm);

    //http://api.yummly.com/v1/api/recipes?_app_id=e0a0ad85&_app_key=30d09c4f5cd26c2e94067912d367b9c6&maxResult=50&q=
    var _apiId = 'e0a0ad85';
    var _apiKey = '30d09c4f5cd26c2e94067912d367b9c6';
    var _query = sharedData.searchTerm || 'chicken soup';
    var _max = 50;
    $scope.searchRecipes = function() {
        //var searhParm = $scope.searchTerm;
        recipesApi.getRecipes(_max, _query, _apiKey, _apiId, successFunc, failFunc);
    };
    //(max, query, apiKey, apiId, successFunc, failFunc)
    function successFunc(data) {
        $scope.recipes = data.sort(descendingRating);
        //console.log($scope.recipes);
    }

    function failFunc(error) {
        console.log("Error: " + error);
    }

    $scope.searchRecipes();

    function successFuncInv(data) {

      //  console.log(data);
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
        recipesApi.getRecipes(10, _queryInvItemsIncl, _apiKey, _apiId, successFuncInv, failFuncInv, favCuisines);
    };

    $scope.getRecommendedRecipes();

    //compare function for sorting the recipes by rating in descending order
    function descendingRating(a, b) {
        return b.rating - a.rating;
    }
});
