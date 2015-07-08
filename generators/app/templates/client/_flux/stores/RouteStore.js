'use strict';

var Fluxxor = require('fluxxor');
var constants = require('../constants');

var RouteStore = Fluxxor.createStore({

	initialize: function(router) {
		this.bindActions(
			constants.ROUTE.MOVE, this.onMove,
			constants.ROUTE.BACK, this.goBack
		);

		this.clear();
		this.router = router;
	},

	clear: function() {
	},

	onMove: function(payload) {
		if (!payload.path) return;
		this.router.transitionTo(payload.path);
	},

	goBack: function() {
		return this.router.goBack();
	},

	isActive: function(router) {
		return this.router.isActive(router);
	}

});

module.exports = RouteStore;
