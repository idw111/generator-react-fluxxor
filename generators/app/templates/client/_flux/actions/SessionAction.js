'use strict';

var constants = require('../constants');
var SessionClient = require('../../_ajax/SessionClient');
var AnalyticsClient = require('../../_ajax/AnalyticsClient');

var SessionAction = {

	load: function() {

	},

	signup: function(username, password, nickname, email) {
		SignupClient.signup(username, password, nickname, email, function(result) {
			if (!result.ok) return;
			if (result.user) AnalyticsClient.setUser(result.user._id);
			this.flux.actions.SESSION.load();
			this.dispatch(constants.SESSION.SIGNUP, {user: result.user || null});
		}.bind(this));
	},

	login: function(username, password) {
		SessionClient.login(username, password, function(result) {
			if (!result.ok) return;
			if (result.user) AnalyticsClient.setUser(result.user._id);
			this.flux.actions.SESSION.load();
			this.dispatch(constants.SESSION.LOGIN, {user: result.user || null});
		}.bind(this));
	},

	logout: function() {
		SessionClient.logout(function(result) {
			if (!result.ok) return;
			this.dispatch(constants.SESSION.LOGOUT);
		}.bind(this));
	},

	check: function() {
		SessionClient.check(function(result) {
			if (!result.ok) return;
			if (result.user) AnalyticsClient.setUser(result.user._id);
			this.flux.actions.SESSION.load();
			this.dispatch(constants.SESSION.CHECK, {user: result.user || null});
		}.bind(this));
	}

};

module.exports = SessionAction;