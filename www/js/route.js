var app = angular.module('myApp');
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
		templateUrl:"views/index.html"
	})
	.when('/page/:page_id',{
		templateUrl: 'views/page.html'
	})
	.when('/about',{
		templateUrl: 'views/about.html'
	})
	.when('/news_list/:offset/:limit',{
		templateUrl: 'views/news_list.html'
	})
	.when('/news/:nindex',{
		templateUrl: 'views/news.html'
	})
	.when('/videos/:offset/:limit',{
		templateUrl: 'views/videos.html'
	})
	.when('/video/:vindex',{
		templateUrl: 'views/video.html'
	})
	.when('/images/:offset/:limit',{
		templateUrl: 'views/images.html'
	})
	.when('/settings',{
		templateUrl: 'views/settings.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);