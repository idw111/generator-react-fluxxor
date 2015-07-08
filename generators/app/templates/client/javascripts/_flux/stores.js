'use strict';

var RouteStore = require('./stores/RouteStore');
var SessionStore = require('./stores/SessionStore');

var Stores = {

	build: function(options) {
		var stores = {
			ROUTE: new RouteStore(options.router),
			SESSION: new SessionStore(),
		};
		return stores;
	}

};

module.exports = Stores;

