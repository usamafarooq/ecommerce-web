var api = 'http://localhost:4300/';
var site_url = 'http://localhost/ecommerce-web/';
var admin_url = 'http://localhost/ecommerce-web/admin_panel';
var app = angular.module("ecommerceApp", ["ngRoute"]);
// app.config(function($routeProvider) {
//     $routeProvider
//     .when("/", {
//         templateUrl : "templates/home.html",
//         controller: 'homeCtrl',
//         cache: false
//     });
// });

// app.controller('mainCtrl', function($scope,$http) {
//     if (!localStorage.getItem('login_id')) {
//         window.location.href = admin_url+'/login';
//     }
// });

app.controller('loginCtrl', function($scope,$http) {
    if (localStorage.getItem('login_id')) {
        window.location.href = admin_url;
    }
    $scope.submitForm = function() {
        //console.log($scope.form)
        //$http.defaults.headers.post["Content-Type"] = "text/plain;charset=utf-8";
        //$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http({
            method: 'POST',
            //cache: false,
            url: api + "login",
            data: {
                'email' : $scope.form.email,
                'password' : $scope.form.password
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            if (data.data._id) {
                localStorage.setItem('login_id',data.data._id)
                window.location.href = admin_url;
            }
        })
    }
});