$(function(){
    //collapse top menu dropdown after click on mobile view
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') ) {
            $(this).collapse('hide');
        }
    });
	
	/*share app link*/
	$('body').on('click','.btn-share-app',function(e){
		e.preventDefault();
		var options = {
		  message: 'Jamaat Islami Party Android Application, Install this app',
		  subject: 'Jamaat Islami Party Android Application, Install this app',
		  files : ['//lh3.googleusercontent.com/ztMoe75Du1pdEDzfnBIe39C2YS2WbtLZgWrWGfHdwdQSUzQN5ad-ZbqW8BQaPndzQZ8=w300-rw'],
		  url: 'https://play.google.com/store/apps/details?id=com.codingsips.ji1',
		  chooserTitle: 'Jamaat Islami Party Android Application, Install this app'
		};
		window.plugins.socialsharing.shareWithOptions(options, function(){}, function(){});
	});
	
});