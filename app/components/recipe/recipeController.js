recipeApp.controller('recipeController', function($scope, utilLocalStore, recipesApi2) {

    //http://api.yummly.com/v1/api/recipes?_app_id=e0a0ad85&_app_key=30d09c4f5cd26c2e94067912d367b9c6&maxResult=50&q=
    var _apiId = 'e0a0ad85';
    var _apiKey = '30d09c4f5cd26c2e94067912d367b9c6';
    var _query = 'chicken quesadilla';
    var _max = 10;
    $scope.searchRecipes = function() {
        var searhParm = $scope.searhParm;
        $scope.recipes = recipesApi2.getrecipesApi2(_max, _query, _apiKey, _apiId, successFunc, failFunc);
    };
//(max, query, apiKey, apiId, successFunc, failFunc)
    function successFunc(data) {
      console.log("Success: " + data);
    }
    function failFunc(error) {
      console.log("Error: " + error);
    }

});
