var ptcApp = angular.module('ptcApp', ['ngRoute', 'ngResource', 'angular-jqcloud', 'ui.bootstrap']);

ptcApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 	"partials/home.html",
			controller: 	"HomeCtrl"
		}).
		otherwise({
			redirectTo: 	"/"
		});
}]);