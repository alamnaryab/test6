var db = localStorage;
var dt = new Date();
var _s;
$(function(){
	if(!isset('settings') || 1==1){
		var settings = {
				server 		: 'http://party.codingsips.com',
				//server 		: 'http://localhost/party',
				party_id 	: 3,
				party_sm 	: 'JI',
				party_lg 	: 'Jamaat Islami',
			};
		dbSave('settings',settings);
	}
	_s = dbGet('settings');
	
	if(!isset('sliders')){
		var sliders = [{"id":"33","title":"First of All Pakistan","description":"","sort":"1","link":"","image":"img\/sliders\/33.png"},{"id":"34","title":"Pakistan The Nation","description":"","sort":"2","link":"","image":"img\/sliders\/34.png"}];
		dbSave('sliders',sliders);
	}
	
	if(!isset('menus')){
		var menus = [{"id":"1","party_id":"1","parent_id":"0","title":"Home","icon":null,"page_id":null,"url":"\/","sort":"1","status":"1","sub":[]},{"id":"2","party_id":"1","parent_id":"0","title":"Introduction","icon":"<i class=\"fa fa-globe\"><\/i>","page_id":null,"url":null,"sort":"1","status":"1","sub":[{"id":"3","party_id":"1","parent_id":"2","title":"Party name","icon":"","page_id":"1","url":null,"sort":"1","status":"1"},{"id":"4","party_id":"1","parent_id":"2","title":"test page","icon":"","page_id":"2","url":null,"sort":"1","status":"1"}]}];
		dbSave('menus',menus);
	}
	
	if(!isset('pages')){
		var pages = [{"id":"1","party_id":"1","title":"Party","content":"<h1>About PTI<\/h1>\n<div class=\"alert alert-info\">Please connect to internet to load data from server, it will take less than a minute on normal 3G or higher connection.\n<\/div>\n<p class=\"text-center\">LOADING...<\/div>\n"},{"id":"2","party_id":"1","title":"test page 2","content":"<h1>Test page 2<\/h1>\r\n<p>this is just a test page<\/p>"}];
		dbSave('pages',pages);
	}
	
	if(!isset('news')){
		var news = [{"id":"1","party_id":"1","title":"Party president called urgent meeting at PM house","content":"Party president called urgent meeting at PM house\r\nParty president called urgent meeting at PM house\r\nParty president called urgent meeting at PM house\r\nParty president called urgent meeting at PM house","date":"2017-08-05 20:07:18","tags":"pm, party, meeting, urgent","media":[{"id":"22","party_id":"1","news_id":"1","type":"2","url":"https:\/\/www.youtube.com\/watch?v=HjKdqDVJZJ4","vid":"HjKdqDVJZJ4","vthumb":"https:\/\/img.youtube.com\/vi\/HjKdqDVJZJ4\/0.jpg","vframe":"<iframe src=\"https:\/\/www.youtube.com\/embed\/HjKdqDVJZJ4?theme=dark&autoplay=1&showinfo=0&rel=0&loop=1\" frameborder=\"0\" allowfullscreen><\/iframe>","tags":"tag1, tag2","title":"test video title"},{"id":"23","party_id":"1","news_id":"1","type":"2","url":"https:\/\/vimeo.com\/69817226","vid":"69817226","vthumb":"http:\/\/i.vimeocdn.com\/video\/442761898_100x75.jpg","vframe":"<iframe src=\"https:\/\/player.vimeo.com\/video\/69817226?autoplay=1&title=0&byline=0&rel=0&loop=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen><\/iframe>","tags":"test, video, from, vimeo","title":"test video from vimeo"},{"id":"25","party_id":"1","news_id":"1","type":"1","url":"https:\/\/scontent.fisb3-1.fna.fbcdn.net\/v\/t1.0-9\/13924809_503245126551756_3711272606316907542_n.png?_nc_eui2=v1%3AAeE6QBp1fQA-6JHWWNb69tY6_dU8a99Aet9-W2zphXeBXcx-SULW7uE8duOiMj6MtFq_nmo-vFHEKM7TZLqjdN4v6BV-7Lz_rR4JAZIoy070EZtFY-fELHrtIj4jEwIp4xQ&oh=9fdd0f00f8d105b3975ccd0f4ef6bb23&oe=59F1E646","vid":"","vthumb":"","vframe":"","tags":"pakistan, flag","title":"Pakistan"}]},{"id":"2","party_id":"1","title":"Mr, wXYZ meeting with china delegation to empower Pakistan Economy ","content":"Mr, XYZ meeting with china delegation to empower Pakistan Economy \r\nMr, XYZ meeting with china delegation to empower Pakistan Economy \r\nMr, XYZ meeting with china delegation to empower Pakistan Economy \r\nMr, XYZ meeting with china delegation to empower Pakistan Economy \r\nMr, XYZ meeting with china delegation to empower Pakistan Economy \r\nMr, XYZ meeting with china delegation to empower Pakistan Economy ","date":"2017-08-05 20:08:49","tags":"economy, china, deligation","media":[{"id":"21","party_id":"1","news_id":"2","type":"1","url":"https:\/\/scontent.fisb3-1.fna.fbcdn.net\/v\/t1.0-9\/20228777_1617086984988397_8987674035655419899_n.jpg?_nc_eui2=v1%3AAeHkluJWpoQ-2lvCFDcRp6eSJQFa4OgvkT3YNrM7ag69KYhEDqZ5w-xQI1XvlMuBydXAYIaazMfib7T1E38SkF5tjhb0uhT1NvJhPIDlHitrTPmMyfXPOSjhfu4DlaYld-Q&oh=0239b57cb8b079f936269cd8dd0efc38&oe=5A37D41E","vid":"","vthumb":"","vframe":"","tags":"t1,t2,t4","title":"test"},{"id":"26","party_id":"1","news_id":"2","type":"2","url":"https:\/\/web.facebook.com\/ashiqbangash.naryab\/videos\/1925375857710593","vid":"1925375857710593","vthumb":"https:\/\/graph.facebook.com\/1925375857710593\/picture","vframe":"<iframe src=\"https:\/\/web.facebook.com\/plugins\/video.php?href=https%3A%2F%2Fweb.facebook.com%2Fbelgranohobbies%2Fvideos%2F1925375857710593%2F&show_text=0&autoplay=1&title=0&rel=0&loop=1&width=560\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allowFullScreen=\"true\"><\/iframe>","tags":"test,test22","title":"test video from facebook"}]},{"id":"3","party_id":"1","title":"test news","content":"test news","date":"2017-08-06 22:46:00","tags":"test","media":[{"id":"27","party_id":"1","news_id":"3","type":"1","url":"https:\/\/scontent.fisb3-1.fna.fbcdn.net\/v\/t1.0-9\/20638411_311832762561271_3030045327150518642_n.jpg?_nc_eui2=v1%3AAeHFAxqER9drHOW5uHXdkPEkIRbYX_Y7vRgqzXdG5-9Mufx9kj35st6FBMXgtBWQkgmFcCa9nH9t5TdQeKi5XL1IatI7ZxD2WWmsX0TOMhVVig4UgNc4ljHPwIWho_35Xks&oh=54f4a45fbc234a4cabcc977a6dd3efbf&oe=5A216F56","vid":"","vthumb":"","vframe":"","tags":"pakistan, flag, independence day","title":"test news media image 1"},{"id":"28","party_id":"1","news_id":"3","type":"1","url":"https:\/\/scontent.fisb3-1.fna.fbcdn.net\/v\/t1.0-9\/13887039_1189372611083706_7452738907823477699_n.jpg?_nc_eui2=v1%3AAeGRBgelAhND439WFAUuKsp-K-lalnXx2nXGVHrhpDWn_kOOiAXDEUpWgDBQj_FZAqtG_uJrJQzkfqPnYOfcSaq5PwHrqTCj46WmfvzJNOWNDq27tIoGlmZ3I815LPinq_M&oh=69b9ffa3c9ebab71138772480a59478a&oe=5A2E5F33","vid":"","vthumb":"","vframe":"","tags":"pak, flag, wide","title":"pakistan flag wide image"},{"id":"29","party_id":"1","news_id":"3","type":"2","url":"https:\/\/web.facebook.com\/zainumirTeamSpeedDemonsSialkot\/videos\/324731337970271\/","vid":"324731337970271","vthumb":"https:\/\/graph.facebook.com\/324731337970271\/picture","vframe":"<iframe src=\"https:\/\/web.facebook.com\/plugins\/video.php?href=https%3A%2F%2Fweb.facebook.com%2Fbelgranohobbies%2Fvideos%2F324731337970271%2F&show_text=0&autoplay=1&title=0&rel=0&loop=1&width=560\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allowFullScreen=\"true\"><\/iframe>","tags":"pak","title":"pakistan "}]}];
		dbSave('news',news);
	}
	
	if(!isset('videos')){
		var videos = [{"id":"22","party_id":"1","news_id":"1","type":"2","url":"https:\/\/www.youtube.com\/watch?v=HjKdqDVJZJ4","vid":"HjKdqDVJZJ4","vthumb":"https:\/\/img.youtube.com\/vi\/HjKdqDVJZJ4\/0.jpg","vframe":"<iframe src=\"https:\/\/www.youtube.com\/embed\/HjKdqDVJZJ4?theme=dark&autoplay=1&showinfo=0&rel=0&loop=1\" frameborder=\"0\" allowfullscreen><\/iframe>","title":"test video title","tags":"tag1, tag2"},{"id":"23","party_id":"1","news_id":"1","type":"2","url":"https:\/\/vimeo.com\/69817226","vid":"69817226","vthumb":"http:\/\/i.vimeocdn.com\/video\/442761898_100x75.jpg","vframe":"<iframe src=\"https:\/\/player.vimeo.com\/video\/69817226?autoplay=1&title=0&byline=0&rel=0&loop=1\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen><\/iframe>","title":"test video from vimeo","tags":"test, video, from, vimeo"},{"id":"26","party_id":"1","news_id":"2","type":"2","url":"https:\/\/web.facebook.com\/ashiqbangash.naryab\/videos\/1925375857710593","vid":"1925375857710593","vthumb":"https:\/\/graph.facebook.com\/1925375857710593\/picture","vframe":"<iframe src=\"https:\/\/web.facebook.com\/plugins\/video.php?href=https%3A%2F%2Fweb.facebook.com%2Fbelgranohobbies%2Fvideos%2F1925375857710593%2F&show_text=0&autoplay=1&title=0&rel=0&loop=1&width=560\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allowFullScreen=\"true\"><\/iframe>","title":"test video from facebook","tags":"test,test22"},{"id":"29","party_id":"1","news_id":"3","type":"2","url":"https:\/\/web.facebook.com\/zainumirTeamSpeedDemonsSialkot\/videos\/324731337970271\/","vid":"324731337970271","vthumb":"https:\/\/graph.facebook.com\/324731337970271\/picture","vframe":"<iframe src=\"https:\/\/web.facebook.com\/plugins\/video.php?href=https%3A%2F%2Fweb.facebook.com%2Fbelgranohobbies%2Fvideos%2F324731337970271%2F&show_text=0&autoplay=1&title=0&rel=0&loop=1&width=560\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allowFullScreen=\"true\"><\/iframe>","title":"pakistan ","tags":"pak"}];
		dbSave('videos',videos);
	}
	
	
	if(!isset('images')){
		var images = [{"id":"21","party_id":"1","news_id":"2","type":"1","url":"https:\/\/scontent.fisb3-1.fna.fbcdn.net\/v\/t1.0-9\/20228777_1617086984988397_8987674035655419899_n.jpg?_nc_eui2=v1%3AAeHkluJWpoQ-2lvCFDcRp6eSJQFa4OgvkT3YNrM7ag69KYhEDqZ5w-xQI1XvlMuBydXAYIaazMfib7T1E38SkF5tjhb0uhT1NvJhPIDlHitrTPmMyfXPOSjhfu4DlaYld-Q&oh=0239b57cb8b079f936269cd8dd0efc38&oe=5A37D41E","title":"test","tags":"t1,t2,t4"},{"id":"25","party_id":"1","news_id":"1","type":"1","url":"https:\/\/scontent.fisb3-1.fna.fbcdn.net\/v\/t1.0-9\/13924809_503245126551756_3711272606316907542_n.png?_nc_eui2=v1%3AAeE6QBp1fQA-6JHWWNb69tY6_dU8a99Aet9-W2zphXeBXcx-SULW7uE8duOiMj6MtFq_nmo-vFHEKM7TZLqjdN4v6BV-7Lz_rR4JAZIoy070EZtFY-fELHrtIj4jEwIp4xQ&oh=9fdd0f00f8d105b3975ccd0f4ef6bb23&oe=59F1E646","title":"Pakistan","tags":"pakistan, flag"},{"id":"27","party_id":"1","news_id":"3","type":"1","url":"https:\/\/scontent.fisb3-1.fna.fbcdn.net\/v\/t1.0-9\/20638411_311832762561271_3030045327150518642_n.jpg?_nc_eui2=v1%3AAeHFAxqER9drHOW5uHXdkPEkIRbYX_Y7vRgqzXdG5-9Mufx9kj35st6FBMXgtBWQkgmFcCa9nH9t5TdQeKi5XL1IatI7ZxD2WWmsX0TOMhVVig4UgNc4ljHPwIWho_35Xks&oh=54f4a45fbc234a4cabcc977a6dd3efbf&oe=5A216F56","title":"test news media image 1","tags":"pakistan, flag, independence day"},{"id":"28","party_id":"1","news_id":"3","type":"1","url":"https:\/\/scontent.fisb3-1.fna.fbcdn.net\/v\/t1.0-9\/13887039_1189372611083706_7452738907823477699_n.jpg?_nc_eui2=v1%3AAeGRBgelAhND439WFAUuKsp-K-lalnXx2nXGVHrhpDWn_kOOiAXDEUpWgDBQj_FZAqtG_uJrJQzkfqPnYOfcSaq5PwHrqTCj46WmfvzJNOWNDq27tIoGlmZ3I815LPinq_M&oh=69b9ffa3c9ebab71138772480a59478a&oe=5A2E5F33","title":"pakistan flag wide image","tags":"pak, flag, wide"}];
		dbSave('images',images);
	}
	
	if(!isset('about')){
		var about = 'Coming soon, Connect to internet and restart Application, it will be updated...';
		dbSave('about',about);
	}
});//end ready()

function update_s(key,val){
	_s[key] = val;
	dbSave('settings',_s);
	_s = dbGet('settings');
}

function dbSave(v,data){	
	db.setItem(v,JSON.stringify(data));
}

function dbGet(v){
	var d=db.getItem(v);
	return JSON.parse(d);
}

function isset(v){
	return (db.getItem(v) === null?false:true);
}

function msg(m,c){
	c = c || 'success';
	str = '<div class="alert-wrapper" style="position:fixed;top:55px;width:80%;left:10%;"><div style="display:none;" class="text-center alert alert-';
	str+= c+' alert-dismissable">';
	str+= '<span class="close" data-dismiss="alert" aria-label="close">&times;</span>'+m+'</div></div>';
	$('.alert-wrapper').remove();
	$('body').after(str);
	$('.alert-wrapper .alert').slideDown();
}

function inet(){
	$.ajax({
		url:_s.server+'/api/checknet',
		success:function(r){return true;},
		error:function(a,b){return false;}
	});
}
