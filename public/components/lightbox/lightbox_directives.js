angular
.module('exercise')
.directive('lightBox', function() {
	return {
		restrict: 'E',
		scope: true,
		controller: 'lightboxCtrl',
		controllerAs: 'ctrl',
		templateUrl: 'components/lightbox/lightbox.html'
	};
})
.directive('lightBoxProgress', function () {
	return {
		restrict: 'E',
		scope: {},
		controller: function($scope, lightboxService) {
			$scope.progressLbConfig = lightboxService.progressLbConfig;
			$scope.close = function(){
				lightboxService.close();
			};
		},
		templateUrl: 'components/lightbox/lightbox_progress.html'
	};
});