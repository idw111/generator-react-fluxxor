'use strict';

var Fluxxor = require('fluxxor');
var constants = require('../constants');

var Immutable = require('immutable');
var Profile = Immutable.Record({
	username: null, 
	nickname: 'anonymous', 
	provider: null, 
	email: null, 
	photo: null, 
	verified: false, 
	registeredAt: null
});

var SessionStore = Fluxxor.createStore({

	initialize: function() {
		this.bindActions(
			constants.SESSION.CHECK, this.onCheck,
			constants.SESSION.LOGIN, this.onLogin,
			constants.SESSION.LOGOUT, this.onLogout,
			constants.SESSION.SIGNUP, this.onSignup
		);
		
		this.clear();
	},

	clear: function() {
		this.loaded = false;
		this.authenticated = false;
		this.profile = new Profile();
	},

	_authenticate: function(payload) {
		this.loaded = true;
		this.authenticated = !!payload.user;
		this.profile = new Profile(payload.user);
	},

	onCheck: function(payload) {
		this._authenticate(payload);
		this.emit('change');
	},

	onLogin: function(payload) {
		this._authenticate(payload);
		this.emit('change');
	},

	onLogout: function(payload) {
		this.clear();
		this.loaded = true;
		this.emit('change');
	},

	onSignup: function(payload) {
		this._authenticate(payload);
		this.emit('change');
	},

	getState: function() {
		return {
			loaded: this.loaded,
			authenticated: this.authenticated,
			verified: !!this.profile.get('verified'),
			profile: this.profile
		};
	},

	getProfile: function() {
		return this.profile.clone();
	}
	
});

module.exports = SessionStore;
