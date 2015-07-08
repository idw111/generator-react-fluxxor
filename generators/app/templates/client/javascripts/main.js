var $ = require('jquery');
var ServiceRouter = require('./_react/Router');

$(function() {

	window.flux = ServiceRouter.run();
	window.flux.actions.SESSION.check();

});
