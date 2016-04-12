recipeApp.controller('homeController', function($scope, utilLocalStore, weatherApi, recipesApi) {

    $scope.homeMessage = "Hello Karma Yogis";
    console.log("homeController");

    utilLocalStore.setUserName('curtis');


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
    var recipeApiSuccess = function(response) {
        console.log("Recipe Api Success");
        console.log(response);
    };
    var recipeApiFail = function(response) {
        console.log("Recipe Api Failed");
        console.log(response);
    };

    var recipeApiKey = '37bc8c9ac93cb65201786a6508da22ec';
    var recipeAppId = 'a8a27b26';
    recipesApi.getRecipes(10, 'chicken salad', recipeApiKey, recipeAppId, recipeApiSuccess, recipeApiFail);

});
