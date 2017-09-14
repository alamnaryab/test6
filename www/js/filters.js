var app = angular.module('myApp');
app.filter("h", ['$sce', function ($sce) {
	return function (str) {
		return $sce.trustAsHtml(str);
	};
}]);

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

app.filter('isEng', function () {
  return function (text) {
    var rtlRegex = new RegExp('[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]+');
    var textalign = ( rtlRegex.test(text) ) ? 'rtl': 'ltr';
    return textalign;
  }
});

