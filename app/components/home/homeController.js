recipeApp.controller('homeController', function($scope, utilLocalStore, weather) {

    $scope.homeMessage = "Hello Karma Yogis";
    console.log("homeController");

    utilLocalStore.setUserName('curtis');


    var apiKey = '7496eb8b9ef9616cf145982ce0a992fe';

    var city = 'Atlanta';
    var weatherSuccess = function(response) {
      console.log(response);
    };
    var weatherFail = function(response) {
      console.log(response);
    };
    
    weather.getWeather(city, apiKey, weatherSuccess, weatherFail);

   

});
