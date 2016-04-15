var homeController = function($scope, $http, recipesApi, sharedData) {
    $scope.sharedData = sharedData;
    //console.log($scope.sharedData);

    var _apiId = 'e0a0ad85';
    var _apiKey = '30d09c4f5cd26c2e94067912d367b9c6';
    var _max = 300;
    var loading_screen;

    var onSearchComplete = function(response) {

        $scope.recipes = response.sort(descendingRating);
        $scope.numMatches = response.totalMatchCount;
        loading_screen.finish();
    };

    var onError = function(response) {
        $scope.error = 'Whoops!, something went wrong.';
         loading_screen.finish();
    };

    $scope.search = function(term) {
        loading_screen = window.pleaseWait({
            logo: "assets/img/logo2.png",
            backgroundColor: '#8a1617', 
            // backgroundColor: '#ffffff',
            loadingHtml: '<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>'
        });
        var randomCuisines = sharedData.getRandomCuisines(5);
        var randomFoods = sharedData.getRandomFoods(5).join(" ");
        recipesApi.getRecipes(_max, term, _apiKey, _apiId, onSearchComplete, onError, randomCuisines);
        // recipesApi.getRecipes(_max, term, _apiKey, _apiId, onSearchComplete, onError);
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
