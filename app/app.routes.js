recipeApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: function($routeParams) {
          console.log("routing to home");
            return 'app/components/home/homeView.html';
        }
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });
});