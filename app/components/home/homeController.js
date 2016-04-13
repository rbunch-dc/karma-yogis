
var homeController = function($scope, $http, recipesApi, sharedData) {
    $scope.sharedData = sharedData;
    //console.log($scope.sharedData);

    var _apiId = 'e0a0ad85';
    var _apiKey = '30d09c4f5cd26c2e94067912d367b9c6';
    var _max = 50;
   
    var onSearchComplete = function(response) {
        //$log.info($scope.loadingClass);
        $scope.recipes = response;
        $scope.numMatches = response.totalMatchCount;
    };

    var onError = function(response) {
        $scope.error = 'Whoops!, something went wrong.';
    };

    $scope.search = function(term) {
        // $http.get('http://api.yummly.com/v1/api/recipes?_app_id=e0a0ad85&_app_key=30d09c4f5cd26c2e94067912d367b9c6&maxResult=50&q=' + term)
        //     .then(onSearchComplete, onError);
         recipesApi.getRecipes(_max, term, _apiKey, _apiId, onSearchComplete, onError);

    };

    //TODO: Set up Pagination
    /* $scope.pagination = function() {
     var pageCount = +10;
     $http.get('http://api.yummly.com/v1/api/recipes?_app_id=46ac308e&_app_key=16cf1340c02c27af105b7618247c5e16&maxResult=10&start=' + pageCount)
     .then(onSearchComplete, onError);
     };*/

    // Create Recipe Url
    $scope.createRecipeUrl = function(id) {
        var recipeUrl = 'http://www.yummly.com/recipe/';
        return recipeUrl + id;


    };


    $scope.sgSortOrder = '-rating';

    // $scope.secondsToMin = function(seconds) {
    //     var minutes = Math.ceil(seconds / 60);
    //     var time;
    //     if (seconds < 60) {
    //         return '';
    //     }
    //     if (minutes >= 60) {
    //         if (minutes % 60 === 0) {
    //             time = minutes / 60 + ' min';
    //         } else {
    //             time = Math.floor(minutes / 60) + ' hrs ' + (minutes - 60) + ' min';
    //         }
    //     } else {
    //         time = minutes + ' min';

    //     }

    //     return time;
    // };
};
    // var apiKey = '7496eb8b9ef9616cf145982ce0a992fe';

    // var city = 'Atlanta';
    // var weatherSuccess = function(response) {
    //   console.log(response);
    // };
    // var weatherFail = function(response) {
    //   console.log(response);
    // };

    // weatherApi.getWeather(city, apiKey, weatherSuccess, weatherFail);


    // https://api.edamam.com/search?q=chicken&app_id=a8a27b26&app_key=37bc8c9ac93cb65201786a6508da22ec
    //var recipeApiSuccess = function(response) {
    //    console.log("Recipe Api Success");
    //    console.log(response);
    //};
    //var recipeApiFail = function(response) {
    //    console.log("Recipe Api Failed");
    //    console.log(response);
    //};
    //
    //var recipeApiKey = '37bc8c9ac93cb65201786a6508da22ec';
    //var recipeAppId = 'a8a27b26';
    //recipesApi.getRecipes(10, 'chicken salad', recipeApiKey, recipeAppId, recipeApiSuccess, recipeApiFail);

recipeApp.controller("homeController", homeController);
