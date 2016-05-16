angular
.module('exercise')
.service('lightboxService', ['$interval', function($interval) {
	var _this = this;

	return {
		progressLbConfig: { progress: 0, progressText: '', finish: 0, showLightbox: false },

		progressStart: function (duration, lightboxConfig) {
			_this = this;
			_this.progressLbConfig.progressText = lightboxConfig.startText;
			_this.progressInterval = $interval(function() {
				//console.log(_this.progressLbConfig.progress);
				if (_this.progressLbConfig.progress < lightboxConfig.finish) {
					_this.progressLbConfig.progress += 1;
				} else {
					_this.progressLbConfig.progressText = lightboxConfig.finishText;
					$interval.cancel(_this.progressInterval);
				}
			}, duration);
		},

		open: function (lightboxConfig, reset) {
			this.progressLbConfig.showLightbox = true;
			if(reset){
				this.progressLbConfig.progress = lightboxConfig.start;
				this.progressLbConfig.finish = lightboxConfig.finish;
				this.progressStart(lightboxConfig.duration / (lightboxConfig.finish - lightboxConfig.start), lightboxConfig);
			}
		},

		close: function() {
			$interval.cancel(this.progressInterval);
			this.progressLbConfig.showLightbox = false;
		},

		resetOpen: function(lightboxConfig) {
			this.open(lightboxConfig, true);
		}
	};
}])
.service('dataService', ['$http', '$log', function($http, $log) {
	this.getJSON = function (filePath) {
		return $http.get(filePath)
		.then(function (response) {
			if (response.data) {
				return response.data;
			} else {
				$log.error(response);
				return null;
			}
		}, function (response) {
			$log.error(response.status, response.statusText);
			return null;
		});
	};
}]);