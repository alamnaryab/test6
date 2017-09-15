var app = angular.module('myApp', ['ngRoute']);


app.controller('myCtrl', function ($scope,$http,$location,$route,$routeParams) {
    
    //set loading variable (is ajax running?)//
	$scope.at = 'EAAMk1cj16xIBALOqTqPtYnyxkSlhfWtYuZCZCoyE1QbeTwMoKHfQi5hFUtvWbdNALXjdYvMZBpwUjbd1HIviyHlKCAzY4HcjHgxf2ZCgKoSYfYQ3PgmrdOvReT6V7EA4ozZCWRulMcA9ORNBGqGmxmEHkPcuf52tp0siRZBFvecE7746g2MKNo';
	$scope.gid = '144494398930201';
	$scope.qs = '?fields=source,attachments{title,media,subattachments,type,url},type,created_time,description,message,message_tags&limit=100';
	$scope.fburl = 'https://graph.facebook.com/v2.10/'+$scope.gid+'/feed'+$scope.qs+'&access_token='+$scope.at;
	$scope.fbids = {
		'sliders':'469518966751244_477675325935608',
		'pages':'469518966751244_477675182602289',
		'menus':'469518966751244_477673025935838',
		'about':'469518966751244_477731075930033',
		'dashboard':'469518966751244_477679459268528'
	};
	$scope.identifier= 'com.codingsips.ji1';
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
	$scope.video    = $scope.videos[0];
	$scope.vindex   = 0;
	$scope.limit    = 100;
	$scope.images 	= dbGet('images');
	$scope.image    = '';
	$scope.tmp_news = [];
	$scope.tmp_images = [];
	$scope.tmp_videos = [];
	 
	$scope.getFeed = function(){
		$http({
			method:"GET", 
            async : false,
            url: $scope.fburl,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
				$scope.processData(response.data.data);				
				if($scope.tmp_news.length > 0){
					$scope.news = $scope.tmp_news;
					dbSave('news',$scope.news);
				}else{
					$scope.news	= dbGet('news');
				}
				
				if($scope.tmp_videos.length > 0){
					$scope.videos = $scope.tmp_videos;
					dbSave('videos',$scope.news);
				}else{
					$scope.videos	= dbGet('videos');
				}
				
				if($scope.tmp_images.length > 0){
					$scope.images = $scope.tmp_images;
					dbSave('images',$scope.news);
				}else{
					$scope.images	= dbGet('images');
				}				
        },function myError(response) {
			msg('Could not connect to server.<br>Please check your internet.','warning');
            
			$scope.news	= dbGet('news');
			$scope.videos	= dbGet('videos');
			$scope.images	= dbGet('images');
        });
	}
	
	
	$scope.getMenus = function(){
		$scope.loading = true;
		$http({
			method:"GET", 
            async : false,
            url: 'https://graph.facebook.com/v2.10/'+$scope.fbids.menus+'?fields=message&access_token='+$scope.at,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.menus = JSON.parse(response.data.message);
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
            url: 'https://graph.facebook.com/v2.10/'+$scope.fbids.pages+'?fields=message&access_token='+$scope.at,
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(response) {
            $scope.pages = JSON.parse(response.data.message);
			dbSave('pages',$scope.pages);
        },function myError(response) {
			$scope.pages	= dbGet('pages');
            msg('Could not connect to server.[pages]');
        });
		$scope.loading = false;
	} 
	 
	
	$scope.getSliders = function(){
		$http({
			method:'GET',
			async : false,
			url   : 'https://graph.facebook.com/v2.10/'+$scope.fbids.sliders+$scope.qs+'&access_token='+$scope.at,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response){
			var sliderz = [];
			$.each(response.data.attachments.data[0].subattachments.data,function(i,s){
				sliderz.push({
					'title':(s.hasOwnProperty('description')?(s.description):''),
					'image': s.media.image.src
				});				
			});
			$scope.sliders = sliderz;
			dbSave('sliders',$scope.sliders);
		},function myError(response){
			$scope.news	= dbGet('sliders');
            msg('Could not connect to server.[sliders]');
		});
	} 
	
	
	
	
	
	$scope.getSliders();
	$scope.getFeed();
	$scope.getMenus();
	$scope.getPages();	
		
	
	
	$scope.processData = function(data){
		$.each(data,function(i,d){
			var exc = false;
			$.each($scope.fbids,function(i,u){
				if(u == d.id){
					exc = true;//exclude pages,menus,sliders
				}
			});
			if(exc==false){
				if(d.hasOwnProperty('message') && d.message.length > 30){
					var msg = d.message;
					msg = msg.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
					//msg = msg.substring(0,40)+'...';
					$scope.tmp_news.push({
						'media': $scope.processMedia(d),
						'content':d.message,
						'title':msg,
						'date':d.created_time.substring(0,10),
					});
				}else{
					$scope.processMedia(d);
				}
			}
		});
	}
	
	$scope.processMedia = function(d){
			var mediaz = [];
			var postid = d.id;
			var msg = (d.hasOwnProperty('message')?(d.message):'');
			msg = msg.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
			msg = msg.substring(0,30);
			
			if(d.hasOwnProperty('attachments')){
				if(d.attachments.hasOwnProperty('data') && 
					d.attachments.data.length>0 && 
					d.attachments.data[0].hasOwnProperty('subattachments') && 
					d.attachments.data[0].subattachments.hasOwnProperty('data') &&
					d.attachments.data[0].subattachments.data.length > 0){
					$.each(d.attachments.data[0].subattachments.data,function(i,att){						
						if(att.type.indexOf('video')>=0){
							var vf = '<div class="video-container"><iframe src="'+att.media.image.src+'&autoplay=1&title=0&rel=0&loop=1" frameborder="0" allowfullscreen></iframe></div>';
							var processd = 0;
							if(d.hasOwnProperty('source') && d.attachments.data[0].subattachments.data.length==1){
								vf = '<div class="video-container"><iframe src="'+d.source+'&autoplay=1&title=0&rel=0&loop=1" frameborder="0" allowfullscreen></iframe></div>';
								processd = 1;
							}
							postid = (att.hasOwnProperty('target')?(att.target.id):postid);
							var v = {
								'vid':postid,
								'vthumb':att.media.image.src,
								'height':att.media.image.height,
								'width':att.media.image.width,
								'url':att.url,
								'type':2,
								'title':msg,
								'from':att.type,
								'vframe':vf,
								'processed':processd
							};
							$scope.tmp_videos.push(v);
							mediaz.push(v);
						}else if(att.type == 'photo'){
							var i = {
								'url':att.media.image.src,
								'type':1,
								'title':msg
							}
							$scope.tmp_images.push(i);
							mediaz.push(i);
						}
					});
				}else if(d.attachments.hasOwnProperty('data') 
						&& d.attachments.data.length > 0){							
					$.each(d.attachments.data,function(i,att){	
						if(att.type.indexOf('video')>=0){
							var vf = '<div class="video-container"><iframe src="'+att.media.image.src+'&autoplay=1&title=0&rel=0&loop=1" frameborder="0" allowfullscreen></iframe></div>';
							var processd = 0;
							if(d.hasOwnProperty('source')){
								vf = '<div class="video-container"><iframe src="'+d.source+'&autoplay=1&title=0&rel=0&loop=1" frameborder="0" allowfullscreen></iframe></div>';
								processd = 1;
							}
							postid = (att.hasOwnProperty('target')?(att.target.id):postid);
							var v = {
								'vid':postid,
								'vthumb':att.media.image.src,
								'height':att.media.image.height,
								'width':att.media.image.width,
								'url':att.url,
								'type':2,
								'title':msg,
								'from':att.type,
								'vframe':vf,
								'processed':processd
							};
							$scope.tmp_videos.push(v);
							mediaz.push(v);
						}else if(att.type == 'photo' || att.type == 'share'){
							var i = {
								'url':att.media.image.src,
								'type':1,
								'title':msg
							}
							$scope.tmp_images.push(i);
							mediaz.push(i);
						}
					});
				}
			}
			return mediaz;
	}
	
	
	
	$scope.getVframe = function(vid,vindex,i){
		if(i==-1 && $scope.videos[vindex].processed == 1){
			return false;
		}else if(i>=0 && $scope.news[vindex].media[i].processes==1){
			return false;	
		}else{
			if(i == -1){
				vh = $scope.videos[vindex].height;
				vw = $scope.videos[vindex].width;
			}else{
				vh = $scope.newz.media[i].height;
				vw = $scope.newz.media[i].width;
			}
			$http({
				method:'GET',
				async : false,
				url   : 'https://graph.facebook.com/v2.10/'+vid+'?fields=source&access_token='+$scope.at,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(response){
				
				if(response.data.hasOwnProperty('source') && typeof response.data.source != 'undefined'){
					var vf =  '<div class="video-container" style="padding-bottom:'+((h/w)*100)+'%;"><iframe src="'+response.data.source+'&autoplay=1&title=0&rel=0&loop=1" frameborder="0"  allowfullscreen></iframe></div>';
					if(i == -1){
						$scope.videos[vindex].vframe = vf;
						$scope.videos[vindex].processed = 1;
					}else{
						$scope.newz.media[i].vframe = vf;
						$scope.newz.media[i].processed = 1;
					}
				}else{
					if(i == -1){
						$scope.videos[vindex].vframe = $scope.vframe2($scope.videos[vindex].url,vh,vw);
						$scope.videos[vindex].processed = 1;
					}else{
						$scope.newz.media[i].vframe = $scope.vframe2($scope.newz.media[i].url,vh,vw);
						$scope.newz.media[i].processed = 1;
					}
				}
			},function myError(response){
				if(i == -1){
					$scope.videos[vindex].vframe = $scope.vframe2($scope.videos[vindex].url,vh,vw);
					$scope.videos[vindex].processed = 1;
				}else{
					$scope.newz.media[i].vframe = $scope.vframe2($scope.newz.media[i].url,vh,vw);
					$scope.newz.media[i].processed = 1;
				}
				return false;
			});
		}
	}
	
	$scope.vframe2 = function(url,h,w){
		var vf = '<div class="video-container" style="padding-bottom:'+((h/w)*100)+'%;"><iframe src="https://web.facebook.com/plugins/video.php?href='+url+'?show_text=0&autoplay=1&title=0&rel=0&loop=1" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe></div>';
		return vf;
	}
	
	$scope.setPage = function(id){
		$.each($scope.pages,function(i,p){
			if(p.id == id){
				$scope.page = $scope.pages[i];
				return;
			}
		});
	}
	$scope.$on('$routeChangeStart', function(event, next, current){
		if(next.templateUrl == 'views/videos.html'){
			//$scope.getVideos(next.params.offset,next.params.limit);
		}else if(next.templateUrl == 'views/video.html'){
			$scope.vindex = next.params.vindex;
			$scope.video = $scope.videos[next.params.vindex];			
		}else if(next.templateUrl == 'views/news.html'){
			$scope.nindex = next.params.nindex;
			$scope.newz = $scope.news[next.params.nindex];			
		}else if(next.templateUrl == 'views/page.html'){
			$scope.setPage(next.params.page_id);
		}
		
		$('.alert').remove();
	});
	$scope.$on('$viewContentLoaded', function(){
		if($route.current.loadedTemplateUrl == 'views/index.html'){			
			$('.swipebox').swipebox();
			$('#myCarousel').carousel({
				interval: 2000
			});
		}else if($route.current.loadedTemplateUrl == 'views/images.html'){			
			$('.swipebox').swipebox();
		}else if($route.current.loadedTemplateUrl == 'views/news.html'){
			$('.swipebox').swipebox();
			$.each($scope.newz.media,function(i,n){
				if(n.type==2){
					$scope.getVframe(n.vid,$routeParams.nindex,i);
				}
			});
		}else if($route.current.loadedTemplateUrl == 'views/video.html'){
			$scope.getVframe($scope.video.vid,$routeParams.vindex,-1);			
		}
		window.scrollTo(0, 0);//on view change scroll to top
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
			navz += '<a href="#/video/'+prv+'" class="btn btn-xs btn-danger pull-left"><i class="fa fa-arrow-left"></i> Previous Video</a>';
		}
		if($scope.videos[nxt]!==undefined){
			navz += '<a href="#/video/'+nxt+'" class="btn btn-xs btn-danger pull-right"><i class="fa fa-arrow-right"></i> Next Video</a>';
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
			//if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
		}
		if($scope.adCounter>9){
			$scope.adCounter=0;
			//if(AdMob) AdMob.showInterstitial();			
		}
	}
		
	/*about starts here*/
	var about = localStorage.getItem("about");
	if(about == null){
		about = 'coming soon';
	}
	$http({
		method:"GET", 
		async :true,
		url: 'https://graph.facebook.com/v2.10/'+$scope.fbids.about+'?fields=message&access_token='+$scope.at,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).then(function(response) {
		about = response.data.message + '';
		dbSave("about", about);
		
	},function myError(jqXHR, exception) {
		//nothing to display
	});
	$scope.about = about;
   /*about ends here*/
});

