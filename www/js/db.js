var db = localStorage;
var dt = new Date();
var _s;
$(function(){
	if(!isset('settings') || 1==1){
		var settings = {
				server 		: 'http://party.codingsips.com',/*'http://localhost/party',*/
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
