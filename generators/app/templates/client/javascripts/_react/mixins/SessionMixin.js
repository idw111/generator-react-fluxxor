'use strict';

var SessionMixin = {

	shouldRender: function(session) {
		if (!this.context || !this.context.router) return false;

		var isActive = this.context.router.isActive;
		var transitionTo = this.context.router.transitionTo;

		// initial
		if (!session.loaded) return false;

		// authentication
		if (!session.authenticated) return isActive('Authentication') ? true : transitionTo('/auth/index');

		return isActive('Application') ? true : transitionTo('/');
	}

};

module.exports = SessionMixin;
