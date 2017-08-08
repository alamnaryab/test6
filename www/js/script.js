var app = angular.module('myApp', ['ngRoute']);
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
app.controller('myCtrl', function ($scope,$http,$location,$route,$routeParams) {
    
    //set loading variable (is ajax running?)
    $scope.loading 	= false;
	$scope.server 	= _s.server;
	$scope.party_id = _s.party_id;
	$scope.party_sm = _s.party_sm;
	$scope.party_lg = _s.party_lg;
	$scope.menus	= dbGet('menus');
	$scope.pages	= dbGet('pages');
	$scope.page		= '';
	$scope.news 	= dbGet('news');
	$scope.newz     = '';
	$scope.videos 	= dbGet('videos');
	$scope.video     = '';
	
	$scope.getMenus = function(){
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: $scope.server+'/api/menus.php?party='+$scope.party_id,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.menus = response.data;
			dbSave('menus',$scope.menus);
        },function myError(response) {
			$scope.menus	= dbGet('menus');
            msg('Could not connect to server');
        });
		$scope.loading = false;
	}
	
	$scope.getPages = function(){
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: $scope.server+'/api/pages.php?party='+$scope.party_id,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.pages = response.data;
			dbSave('pages',$scope.pages);
        },function myError(response) {
			$scope.pages	= dbGet('pages');
            msg('Could not connect to server');
        });
		$scope.loading = false;
	}
	
	$scope.getNews = function(){
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: $scope.server+'/api/news.php?party='+$scope.party_id,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.news = response.data;
			dbSave('news',$scope.news);
        },function myError(response) {
			$scope.news	= dbGet('news');
            msg('Could not connect to server');
        });
		$scope.loading = false;
	}
	
	
	$scope.getVideos = function(){
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: $scope.server+'/api/videos.php?party='+$scope.party_id,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.videos = response.data;
			dbSave('videos',$scope.videos);
        },function myError(response) {
			$scope.videos	= dbGet('videos');
            msg('Could not connect to server');
        });
		$scope.loading = false;
	}
	
	$scope.getNews();
	$scope.getMenus();
	$scope.getPages();
	$scope.getVideos();
	
	$scope.$on('$viewContentLoaded', function(){
		if($route.current.loadedTemplateUrl == 'views/page.html'){
			console.log($routeParams.page_id);
			$scope.page = $scope.pages[$routeParams.page_id];
			console.log($scope.pages);
		}   
	});
	
	$scope.hasSub = function (menu) {
		if(menu.hasOwnProperty('sub')){
			return true;
		}else{
			return false;
		}
	};
	
	$scope.getLink = function(menu){
		if(menu.url==null || menu.url==''){
			return 'page/'+menu.page_id;
		}else{
			return menu.url;
		}
	}
	
	$scope.videoId = function(url){
		if(url.indexOf('vimeo.com')>=0){
			return vmId(url);
		}else if(url.indexOf('facebook.com')>=0){
			return fbId(url);
		}else if(url.indexOf('youtube')>=0){
			return ytId(url);
		}
	}
	$scope.videoThumb = function(url){
		if(url.indexOf('vimeo.com')>=0){
			return vmThumb(url);
		}else if(url.indexOf('facebook.com')>=0){
			return fbThumb(url);
		}else if(url.indexOf('youtube')>=0){
			return ytThumb(url);
		}
	}
	$scope.videoIframe = function(url){
		if(url.indexOf('vimeo.com')>=0){
			return vmIframe(url);
		}else if(url.indexOf('facebook.com')>=0){
			return fbIframe(url);
		}else if(url.indexOf('youtube')>=0){
			return ytIframe(url);
		}
	}
	
	
});

app.filter("h", ['$sce', function ($sce) {
	return function (str) {
		return $sce.trustAsHtml(str);
	};
}]);

$(function(){
    //collapse top menu dropdown after click on mobile view
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') ) {
            $(this).collapse('hide');
        }
    });
	
}); 

app.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
});

app.filter('myDate', function myDate($filter){
  return function(text){
    var  tempdate= new Date(text.replace(/-/g,"/"));
    return $filter('date')(tempdate, "MMM-dd-yyyy");
  }
});

