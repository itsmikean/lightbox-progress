/*jslint node: true */
"use strict";

var app = angular.module('exercise', []);

angular
.module('exercise')
.filter('interpolate', ['$interpolate', function($interpolate) {
	return function(value, scope) {
		return $interpolate(value)(scope);
	};
}])