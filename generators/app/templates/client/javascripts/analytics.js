var ga_uid = ''; // UA-XXXXXXXX-X

if (ga_uid) {
	(function(i,s,o,g,r,a,m) {i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	ga('create', ga_uid, 'auto');
}

var AnalyticsAction = {

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

module.exports = AnalyticsAction;
