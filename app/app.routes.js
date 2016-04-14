recipeApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: function($routeParams) {
          // console.log("routing to home");
            return 'app/components/home/homeView.html';
        }
    });
    $routeProvider.when('/recipe', {
        controller: 'recipeController',
        templateUrl: function($routeParams) {
          // console.log("routing to recipe page");
            return 'app/components/recipe/recipeView.html';
        }
    });
    $routeProvider.when('/inventory', {
        controller: 'userInventoryController',
        templateUrl: function($routeParams) {
          // console.log("routing to userInventory page");
            return 'app/components/userInventory/userInventoryView.html';
        }
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});