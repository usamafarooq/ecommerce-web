var api = 'http://localhost:4300/';
var site_url = 'http://localhost/ecommerce-web/';
var admin_url = 'http://localhost/ecommerce-web/admin_panel';
var media = 'http://localhost/ecommerce-web/uploads';
var app = angular.module("ecommerceApp", ["ngRoute"]);
function reload_js(src) {
    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');
}
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/home.html",
        controller: 'homeCtrl',
        cache: false
    });
    $locationProvider.html5Mode(true);
});
app.controller('mainCtrl', function($scope,$http,$location) {});
app.controller('homeCtrl', function($scope,$http,$location) {
	reload_js('js/main.js');
});