var api = 'http://localhost:4300/';
var site_url = 'http://localhost/ecommerce-web/';
var admin_url = 'http://localhost/ecommerce-web/admin_panel';
var app = angular.module("ecommerceApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/home.html",
        controller: 'homeCtrl',
        cache: false
    }).when("/home", {
        templateUrl : "templates/home.html",
        controller: 'homeCtrl',
        cache: false
    });
    //$urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
});

app.controller('mainCtrl', function($scope,$http,$location) {
    $scope.current = $location.path();
    $scope.modules;
    if (!localStorage.getItem('login_id')) {
        window.location.href = admin_url+'/login';
    }
    $scope.logout = function() {
        localStorage.removeItem('login_id')
        window.location.href = admin_url+'/login';
    }
    $http({
        method: 'GET',
        url: api + "modules",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        var module = [];
        if (data.data.length) {}
        for (var i = 0; i < data.data.length; i++) {
            var main = data.data[i]
            if (main.parent_id == 0){
                module[i] = main
                for (var a = 0; a < data.data.length; a++) {
                    var mains = data.data[a]
                    if ( main._id == mains.parent_id ) 
                    {
                        module[i].children = mains;
                        //$ids[] = $men['id'];
                    }
                }
            }
        }
        //module = JSON.parse(module)
        //console.log(module)
        //$scope.modules = module
        //$("#side-menu").metisMenu()
        $scope.modules = data.data
    });
});


app.controller('homeCtrl', function($scope,$http) {

});
