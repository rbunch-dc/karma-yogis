//factory for managing local storage
recipeApp.factory('utilLocalStore', function($window, $rootScope) {
    return {
        setUserName: function(val) {
            $window.localStorage.setItem('user-name', val);
            return this;
        },
        getUserName: function() {
            return $window.localStorage.getItem('user-name');
        },
        setUserPswd: function(val) {
            $window.localStorage.setItem('user-pswd', val);
            return this;
        },
        getUserPswd: function() {
            return $window.localStorage.getItem('user-pswd');
        },
        setUserEmail: function(val) {
            $window.localStorage.setItem('user-email', val);
            return this;
        },
        getUserEmail: function() {
            return $window.localStorage.getItem('user-email');
        },
        setUserHandle: function(val) {
            $window.localStorage.setItem('user-handle', val);
            return this;
        },
        getUserHandle: function() {
            return $window.localStorage.getItem('user-handle');
        },
        setUserFavFood: function(valList) {
            $window.localStorage.setItem('user-fav-food', valList);
            return this;
        },
        getUserFavFood: function() {
            return $window.localStorage.getItem('user-fav-food');
        },
        setInventory: function(inventoryItem) {
            $window.localStorage.setItem('inventory', JSON.stringify(inventoryItem));
            return this;
        },
        getInventory: function() {
            return JSON.parse($window.localStorage.getItem('inventory'));
        },
        getInventoryObj: function() {
            return $window.localStorage.getItem('inventory');
        }
    };

});


var userProfilePrefs = function(data) {
    data = data || {};
    this.email = data.email;
    this.nameFirst = data.nameFirst;
    this.nameLast = data.nameLast;
    this.password = data.password;
    this.city = data.city;
    this.state = data.state;
    this.zip = data.zip;
    this.favFood = data.favFood || []; //array of strings ['s1', 's2']
    this.inventory = data.inventory || []; //array of objects [type inventoryItem]
};

recipeApp.factory('userStore', function($window) {
    return {
        setUser: function(userProfilePrefs) {
            //use the email address as key
            $window.localStorage.setItem(userProfilePrefs.email, JSON.stringify(userProfilePrefs));
            return this;
        },
        getUser: function(emailKey) {
            return JSON.parse($window.localStorage.getItem(emailKey));
        },
    };
});

var WeatherSearchResults = function(data) {
    data = data || {};
    this.currTemp = data.currTemp;
    this.maxTemp = data.maxTemp;
    this.minTemp = data.minTemp;
    this.humidity = data.humidity;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.weatherDescription = data.weatherDescription;
    this.weatherMain = data.weatherMain;
    this.weatherIconURL = data.weatherIconURL;
    this.sunriseEpoch = data.sunrise;
    this.sunsetEpoch = data.sunset;
    this.country = data.country;
};
WeatherSearchResults.prototype.sunriseLocalTime = function() {
    var d = new Date(0);
    d.setUTCSeconds(this.sunriseEpoch);
    return d.toLocaleTimeString();
};
WeatherSearchResults.prototype.sunsetLocalTime = function() {
    var d = new Date(0);
    d.setUTCSeconds(this.sunsetEpoch);
    return d.toLocaleTimeString();
};

recipeApp.factory('weatherApi', function($http) {
    return {
        getWeather: function(cityOrZip, successFunc, failFunc) {
            var apiKey = '7496eb8b9ef9616cf145982ce0a992fe';
            var apiKeyParam = '&APPID=' + apiKey;
            var unitsParam = '&units=imperial';
            var searchParam = '?q=';
            var weatherURL = 'http://api.openweathermap.org/data/2.5/weather';
            var iconURL = 'http://openweathermap.org/img/w/';
            var URL = encodeURI(weatherURL + searchParam + cityOrZip + ',us' + unitsParam + apiKeyParam);
            //console.log("Weather url = " + URL);
            $http.get(URL).then(
                /* success*/
                function(response) {
                    var weatherData = response.data;
                    var searchResults = new WeatherSearchResults({});
                    searchResults.currTemp = weatherData.main.temp;
                    searchResults.maxTemp = weatherData.main.temp_max;
                    searchResults.minTemp = weatherData.main.temp_min;
                    searchResults.humidity = weatherData.main.humidity;
                    searchResults.latitude = weatherData.coord.lat;
                    searchResults.longitude = weatherData.coord.lon;
                    searchResults.weatherDescription = weatherData.weather[0].description;
                    searchResults.weatherMain = weatherData.weather[0].main;
                    searchResults.weatherIconURL = iconURL + weatherData.weather[0].icon + '.png';
                    searchResults.sunriseEpoch = weatherData.sys.sunrise; //seconds since EPOCH
                    searchResults.sunsetEpoch = weatherData.sys.sunset; //seconds
                    searchResults.country = weatherData.sys.country;
                    successFunc(searchResults);
                },
                /* error*/
                function(response) {
                    failFunc(response);
                });
        }
    };
});

//create common model to represent data from the recipe provider.
var RecipeArray = [];
var RecipeIngredient = function(data) {
    data = data || {};
    this.text = data.text;
    this.quantity = data.quantity;
    this.food = data.food;
    this.weight = data.weight;
    this.measure = data.measure;
};
var RecipeSearchResults = function(data) {
    data = data || {};
    this.sourceDisplayName = data.sourceDisplayName;
    this.recipeId = data.recipeId;
    this.recipeName = data.recipeName;
    this.thumbnailImageURL = data.imageURL;
    this.largeImageURL = data.largeImageURL;
    this.rating = data.rating; 
    this.ratingStars = data.ratingStars;
    this.ratingStarsImg = data.ratingStarsImg;
    this.ingredients = data.ingredients;
    this.prepTime = data.prepTime;

};

function upFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function secondsToMin(seconds) {
    var minutes = Math.ceil(seconds / 60);
    var time = '';
    if (seconds < 60) {
        return '';
    }
    if (minutes >= 60) {
        if (minutes % 60 === 0) {
            time = minutes / 60 + ' min';
        } else {
            time = Math.floor(minutes / 60) + ' hrs ' + (minutes - 60) + ' min';
        }
    } else {
        time = minutes + ' min';

    }

    return time;
}

//var starsImages = ['assets/img/star1.jpg', 'assets/img/star2.jpg', 'assets/ig']
//http://api.yummly.com/v1/api/recipe/recipe-id?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY
recipeApp.factory('recipesApi', function($http) {
    return {
        getRecipes: function(max, query, apiKey, apiId, successFunc, failFunc, favCuisine) {
            //
            //http://api.yummly.com/v1/api/recipes?_app_id=e0a0ad85&_app_key=30d09c4f5cd26c2e94067912d367b9c6&maxResult=50&q=
            //   &maxResult    
            var _apiId = '&_app_id=' + apiId;
            var _apiKey = '&_app_key=' + apiKey;
            var _query = '&q=' + query;
            var _maxRes = '&maxResult=' + (max || 10);
            var _cuisine = '&allowedCuisine[]=';
            var _URL = 'http://api.yummly.com/v1/api/recipes?requirePictures=true';
            // var _URL_Id = 'http://api.yummly.com/v1/api/recipes' + recipeId + '?';
            var results = {};
            var _cuisineList = [];
            if (favCuisine) {
                favCuisine.forEach(function(value) { 
                    _cuisineList.push(_cuisine + 'cuisine^cuisine-' + value.toLowerCase()); 
                });

                // console.log(_cuisineList);
                _URL = encodeURI(_URL + _apiKey + _apiId + _query + _maxRes + _cuisineList);
            } else {
                _URL = encodeURI(_URL + _apiKey + _apiId + _query + _maxRes);
            }
            //console.log(_URL);
            $http.get(_URL).then(
                /* success*/
                function(response) {
                    // console.log(response);
                    RecipeArray = [];
                    var hits = response.data.matches;
                    for (var i = 0; i < hits.length && i < max; i++) {
                        var hit = hits[i];
                        res = new RecipeSearchResults({});
                        res.recipeId = hit.id;
                        res.recipeName = hit.recipeName.trunc(30, true);
                        res.rating = hit.rating;
                        res.ratingStars = '';
                        res.ratingStarsImg = 'assets/img/star.png';
                        if (!isNaN(hit.rating)) {
                            for (var x = 0; x<hit.rating; x++) {
                                res.ratingStars += '*';
                            }
                             res.ratingStarsImg = 'assets/img/star' + hit.rating + '.png';
                        }
                       
                        res.sourceDisplayName = hit.sourceDisplayName;
                        if (hit.smallImageUrls && hit.smallImageUrls.length > 0) {
                            res.thumbnailImageURL = hit.smallImageUrls[0];
                            res.largeImageURL = hit.smallImageUrls[0].replace('=s90', '=s325-c-e370');
                        } else {
                            res.thumbnailImageURL = '';
                            res.largeImageURL = '';
                        }
                        res.ingredients = hit.ingredients;
                        res.prepTime = secondsToMin(hit.totalTimeInSeconds);
                        RecipeArray.push(res);
                    }
                    // console.log(RecipeArray);
                    successFunc(RecipeArray);
                },
                function(errorRes) {
                    console.log(errorRes);
                    failFunc(errorRes);
                });
        }
    };
});
