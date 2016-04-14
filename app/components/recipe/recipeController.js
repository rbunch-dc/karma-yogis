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

     $scope.searchRecipesByInventory = function() {
        //var searhParm = $scope.searchTerm;
        var query = sharedData.userProfile;
        console.log('search by inventory query below');
        console.log(query);
        //recipesApi.getRecipes(_max, _apiKey, _apiId, successFunc, failFunc);
    };

    $scope.searchRecipesByInventory();

//compare function for sorting the recipes by rating in descending order
    function descendingRating(a, b) {
        return b.rating - a.rating;
    }
});
