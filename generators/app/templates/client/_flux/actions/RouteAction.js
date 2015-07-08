'use strict';

var constants = require('../constants');

var RouteAction = {

	transitionTo: function(path) {
		this.dispatch(constants.ROUTE.MOVE, {path: path});
	},

	goBack: function() {
		this.dispatch(constants.ROUTE.BACK);
	}

};

module.exports = RouteAction;
