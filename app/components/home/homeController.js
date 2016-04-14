
var homeController = function($scope, $http, recipesApi, sharedData) {
    $scope.sharedData = sharedData;
    //console.log($scope.sharedData);

    var _apiId = 'e0a0ad85';
    var _apiKey = '30d09c4f5cd26c2e94067912d367b9c6';
    var _max = 150;
   
    var onSearchComplete = function(response) {
        $scope.recipes = response.sort(descendingRating);
        $scope.numMatches = response.totalMatchCount;
    };

    var onError = function(response) {
        $scope.error = 'Whoops!, something went wrong.';
    };

    $scope.search = function(term) {
         recipesApi.getRecipes(_max, term, _apiKey, _apiId, onSearchComplete, onError);
    };

    //TODO: Set up Pagination

    // Create Recipe Url
    $scope.createRecipeUrl = function(id) {
        var recipeUrl = 'http://www.yummly.com/recipe/';
        return recipeUrl + id;
    };

   // $scope.sgSortOrder = '-rating';

     //compare function for sorting the recipes by rating in descending order
    function descendingRating(a, b) {
        return b.rating - a.rating;
    }
    
};
   

recipeApp.controller("homeController", homeController);
