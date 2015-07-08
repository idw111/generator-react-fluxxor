'use strict';

var RouteAction = require('./actions/RouteAction');
var SessionAction = require('./actions/SessionAction');

var Actions = {

	build: function() {
		var actions = {
			ROUTE: RouteAction,
			SESSION: SessionAction,
		};
		return actions;
	}

};

module.exports = Actions;
