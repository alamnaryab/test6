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
app.controller('myCtrl', function ($scope,$http,$location,$route,$routeParams) {
    
    //set loading variable (is ajax running?)
	$scope.identifier= 'com.codingsips.pti1';
	$scope.about 	= dbGet('about');
	$scope.adCounter= 1;
    $scope.loading 	= false;
	$scope.server 	= _s.server;
	$scope.party_id = _s.party_id;
	$scope.party_sm = _s.party_sm;
	$scope.party_lg = _s.party_lg;
	$scope.menus	= dbGet('menus');
	$scope.pages	= dbGet('pages');
	$scope.page		= [];
	$scope.news 	= dbGet('news');
	$scope.nindex 	= 0;
	$scope.newz     = [];
	$scope.sliders 	= dbGet('sliders');
	$scope.videos 	= dbGet('videos');
	$scope.video    = [];
	$scope.vindex   = 0;
	$scope.limit    = 50;
	$scope.noffset  = 0;
	$scope.voffset  = 0;
	$scope.ioffset  = 0;
	$scope.images 	= dbGet('images');
	$scope.image    = '';
	
	$scope.getMenus = function(){
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: $scope.server+'/api/menus/'+$scope.party_id,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.menus = response.data;
			dbSave('menus',$scope.menus);
        },function myError(response) {
			$scope.menus	= dbGet('menus');
            msg('Could not connect to server.[menus]');
        });
		$scope.loading = false;
	}
	
	$scope.getPages = function(){
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: $scope.server+'/api/pages/'+$scope.party_id,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.pages = response.data;
			dbSave('pages',$scope.pages);
        },function myError(response) {
			$scope.pages	= dbGet('pages');
            msg('Could not connect to server.[pages]');
        });
		$scope.loading = false;
	}
	
	$scope.getNews = function(offset,limit){
		offset = typeof offset !== 'undefined' ? offset : 0;
		limit = typeof limit !== 'undefined' ? limit : $scope.limit;
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: $scope.server+'/api/news/'+$scope.party_id+'/'+offset+'/'+limit,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.news = response.data;
			dbSave('news',$scope.news);
        },function myError(response) {
			$scope.news	= dbGet('news');
            msg('Could not connect to server.[news]');
        });
		$scope.loading = false;
	}
	
	$scope.getSliders = function(){
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: $scope.server+'/api/sliders/'+$scope.party_id,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.sliders = response.data;
			dbSave('sliders',$scope.sliders);
        },function myError(response) {
			$scope.news	= dbGet('sliders');
            msg('Could not connect to server.[sliders]');
        });
		$scope.loading = false;
	}
	
	
	$scope.getVideos = function(offset,limit){
		offset = typeof offset !== 'undefined' ? offset : 0;
		limit = typeof limit !== 'undefined' ? limit : $scope.limit;
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: $scope.server+'/api/videos/'+$scope.party_id+'/'+offset+'/'+limit,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.videos = response.data;
			dbSave('videos',$scope.videos);
        },function myError(response) {
			$scope.videos	= dbGet('videos');
            msg('Could not connect to server.[videos]');
        });
		$scope.loading = false;
	}
	
	$scope.getImages = function(offset,limit){
		offset = typeof offset !== 'undefined' ? offset : 0;
		limit = typeof limit !== 'undefined' ? limit : $scope.limit;
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: $scope.server+'/api/images/'+$scope.party_id+'/'+offset+'/'+limit,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.images = response.data;
			dbSave('images',$scope.images);
        },function myError(response) {
			$scope.images	= dbGet('images');
            msg('Could not connect to server.[images]');
        });
		$scope.loading = false;
	}
	
	$scope.getSliders();
	$scope.getNews();
	$scope.getMenus();
	$scope.getPages();
	$scope.getVideos();
	$scope.getImages();
		
	
	$scope.$on('$routeChangeStart', function(event, next, current){
		if(next.templateUrl == 'views/videos.html'){
			$scope.getVideos(next.params.offset,next.params.limit);
		}else if(next.templateUrl == 'views/video.html'){
			$scope.vindex = next.params.vindex;
			$scope.video = $scope.videos[next.params.vindex];
		}else if(next.templateUrl == 'views/news.html'){
			$scope.nindex = next.params.nindex;
			$scope.newz = $scope.news[next.params.nindex];			
		}else if(next.templateUrl == 'views/page.html'){
			$scope.setPage(next.params.page_id);
		}
	});
	
	$scope.setPage = function(id){
		$.each($scope.pages,function(i,p){
			if(p.id == id){
				$scope.page = $scope.pages[i];
				return;
			}
		});
	}
	
	$scope.$on('$viewContentLoaded', function(){
		if($route.current.loadedTemplateUrl == 'views/index.html'){			
			$('.swipebox').swipebox();
		}else if($route.current.loadedTemplateUrl == 'views/images.html'){			
			$('.swipebox').swipebox();
		}
		$scope.intad();	
	});
	
	$scope.hasSub = function (menu) {
		if(menu.sub.length > 0){
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
	
	$scope.makeTags = function(str){
		if(str==null){return '';}
		var tags = str.split(',');
		var _tags = '';
		$.each(tags,function(i,tag){
			if(tag.trim() != ''){
				_tags += '<span class="badge">'+tag+'</span> ';
			}
		});
		return _tags;
	}
	
	$scope.videoNavs = function(){
		var navz = '';
		var nxt = parseInt($scope.vindex) + 1;
		var prv = parseInt($scope.vindex) - 1;
		if($scope.videos[prv]!==undefined){
			navz += '<a href="#/video/'+prv+'" class="btn btn-xs btn-info pull-left"><i class="fa fa-arrow-left"></i> Previous Video</a>';
		}
		if($scope.videos[nxt]!==undefined){
			navz += '<a href="#/video/'+nxt+'" class="btn btn-xs btn-info pull-right"><i class="fa fa-arrow-right"></i> Next Video</a>';
		}
		navz +='<div class="clearfix"></div>';
		return navz;
	}
	
	$scope.newsNavs = function(){
		var navz = '';
		var nxt = parseInt($scope.nindex) + 1;
		var prv = parseInt($scope.nindex) - 1;
		if($scope.news[prv]!==undefined){
			navz += '<a href="#/news/'+prv+'" class="btn btn-xs btn-info pull-left"><i class="fa fa-arrow-left"></i> Previous News</a>';
		}
		if($scope.news[nxt]!==undefined){
			navz += '<a href="#/news/'+nxt+'" class="btn btn-xs btn-info pull-right"><i class="fa fa-arrow-right"></i> Next News</a>';
		}
		navz +='<div class="clearfix"></div>';
		return navz;
	}
	
	$scope.intad = function(){
		$scope.adCounter++;
		if($scope.adCounter==2){
			if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
		}
		if($scope.adCounter==10){
			$scope.adCounter=0;
			if(AdMob) AdMob.showInterstitial();			
		}
	}
	
	/*about starts here*/
	var about = JSON.parse(localStorage.getItem("about"));
	if(about == null){
		about = 'coming soon';
	}
	$http({
		method:"GET", 
		async :true,
		url: 'http://apps.alampk.com/api/mobile-apps-by-alam.php?id='+$scope.identifier,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).then(function(response) {				
		about = response.data;
		dbSave("about", about);
		
	},function myError(jqXHR, exception) {
		//nothing to display
	});
	$scope.about = about;
   /*about ends here*/
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

app.filter('nl2br', function myDate($sce){
	return function(str,is_xhtml) { 
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display
		var msg = (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
		return $sce.trustAsHtml(msg);
	}
});

