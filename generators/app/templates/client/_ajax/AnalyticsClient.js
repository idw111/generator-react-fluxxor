'use strict';

var AnalyticsClient = {

	setUser: function(userId) {
		if (window.ga_uid || !userId) return;
		window.ga_uid = userId;

		var ga = window.ga || function() {};
		ga('set', '&uid', userId);
	},

	sendPageview: function(page, title) {
		if (!page) return;
		
		var ga = window.ga || function() {};
		ga('send', 'pageview', {page: page, title: title || page});
	}

};

module.exports = AnalyticsClient;