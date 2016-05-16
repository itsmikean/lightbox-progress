angular
.module('exercise')
.controller('lightboxCtrl', ['dataService', 'lightboxService', function(dataService, lightboxService) {
	var ctrl = {};
	var lightboxConfig = '';
	
	dataService.getJSON('json/data.json').then(function(data){
		if(data && data.data.lightbox){
			lightboxConfig = data.data.lightbox;
			lightboxService.open(lightboxConfig, true);
		}
	});

	ctrl.open = function(){
		lightboxService.open(lightboxConfig, false);
	};

	ctrl.resetOpen = function(){
		lightboxService.resetOpen(lightboxConfig);
	};

	return ctrl;
}]);