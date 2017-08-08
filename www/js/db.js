var db = localStorage;
var dt = new Date();
var _s;
$(function(){
	if(!isset('settings') || 1==1){
		var settings = {
				server 		: 'http://localhost/apps/pti/',
				party_id 	: 1,
				party_sm 	: 'PTI',
				party_lg 	: 'Pakistan Tehreek e Insaf',
			};
		dbSave('settings',settings);
	}
	_s = dbGet('settings');
		
	if(!isset('menus')){
		var menus = {"1":{"id":"1","party_id":"1","title":"Party","content":"<div class=\"alert alert-info\">Please connect to internet to load data from server, it will take less than a minute on normal 3G or higher connection.\r\n<\/div>\r\n<p class=\"text-center\">LOADING...<\/div>\r\n","status":"1"}};
		dbSave('menus',menus);
	}
	
	if(!isset('pages')){
		var pages = {"1":{"id":"1","party_id":"1","title":"Party","content":"<div class=\"alert alert-info\">Please connect to internet to load data from server, it will take less than a minute on normal 3G or higher connection.\r\n<\/div>\r\n<p class=\"text-center\">LOADING...<\/div>\r\n","status":"1"}};
		dbSave('pages',pages);
	}
	
	if(!isset('news')){
		var news = {"2":{"id":"2","party_id":"1","title":"Mr, XYZ meeting with china delegation to empower Pakistan Economy ","content":"Mr, XYZ meeting with china delegation to empower Pakistan Economy \r\nMr, XYZ meeting with china delegation to empower Pakistan Economy \r\nMr, XYZ meeting with china delegation to empower Pakistan Economy \r\nMr, XYZ meeting with china delegation to empower Pakistan Economy \r\nMr, XYZ meeting with china delegation to empower Pakistan Economy \r\nMr, XYZ meeting with china delegation to empower Pakistan Economy ","date":"2017-08-05 20:08:49","status":"1","sort":null,"tags":"economy, china, deligation","media":[]},"1":{"id":"1","party_id":"1","title":"Party president called urgent meeting at PM house","content":"Party president called urgent meeting at PM house\r\nParty president called urgent meeting at PM house\r\nParty president called urgent meeting at PM house\r\nParty president called urgent meeting at PM house","date":"2017-08-05 20:07:18","status":"1","sort":null,"tags":"pm, party, meeting, urgent","media":[]}};
		dbSave('news',news);
	}
	
	if(!isset('videos')){
		var videos = {"1":{"id":"1","party_id":"1","news_id":"1","type":"2","url":"https:\/\/www.youtube.com\/watch?v=-ZesjuyDpR4","sort":"1","status":"1","tags":"abc"},"2":{"id":"2","party_id":"1","news_id":"-1","type":"2","url":"https:\/\/web.facebook.com\/belgranohobbies\/videos\/1876896955882850\/","sort":"1","status":"1","tags":"facebook"},"3":{"id":"3","party_id":"1","news_id":"-1","type":"2","url":"https:\/\/vimeo.com\/69817226","sort":"1","status":"1","tags":"facebook"}};
		dbSave('videos',videos);
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
	str = '<div class="alert-wrapper" style="position:absolute;top:55px;width:80%;left:10%;"><div style="display:none;" class="text-center alert alert-';
	str+= c+' alert-dismissable">';
	str+= '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+m+'</div></div>';
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

function vmId(url){
	var r = /(videos|video|channels|\.com)\/([\d]+)/,
    a = "https://vimeo.com/album/2222222/video/11111111";
	return a.match(r)[2];
}
function vmThumb(url){
	var vid = vmId(url);
	$.getJSON('http://www.vimeo.com/api/v2/video/' + vid + '.json?callback=?', {format: "json"}, function(data) {
		return data[0].thumbnail_medium;
	});
}
function vmIframe(url){
	var vid = vmId(url);
	str = '<iframe src="https://player.vimeo.com/video/'+vid+'" '
		+ 'frameborder="0" '
		+ 'webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
	return str;
}

function fbId(url) {
	var myRegexp = /2F(\d+)%/g;
	var match = myRegexp.exec(url);
	return match[1];
}
function fbThumb(url){
	var vid = fbId(url);
	return 'https://graph.facebook.com/'+vid+'/picture';
}
function fbIframe(url){
	var vid = fbId(url);
	str = '<iframe src="https://web.facebook.com/plugins/video.php?href=https%3A%2F%2Fweb.facebook.com%2Fbelgranohobbies%2Fvideos%2F'+vid+'%2F&show_text=0&width=560" '
		+ 'style="border:none;overflow:hidden" scrolling="no" '
		+ 'frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>';
	return str;
}

function ytId(url){
	var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
	return videoid[1];
}
function ytThumb(url){
	var vid = ytId(url);
	return 'https://img.youtube.com/vi/'+vid+'/mqdefault.jpg';
}
function ytIframe(url){
	var vid = ytId(url);
	str = '<iframe src="https://www.youtube.com/embed/'+vid+'" '
		+ 'frameborder="0" allowfullscreen></iframe>';
	return str;
}

