'use strict';

var $ = require('jquery');
var client = require('../client');

var SessionClient = {

	signup: function(username, password, nickname, email, done) {
		$.ajax({
			type: 'POST', 
			url: client.url('/api/auth/signup'), 
			data: {username: username, password: password, nickname: nickname, email: email}, 
			cache: false, 
			success: done
		});
	},

	login: function(username, password, done) {
		if (!username || !password) return done();
		$.ajax({
			type: 'POST', 
			url: client.url('/api/auth/login'), 
			data: {username: username, password: password}, 
			cache: false, 
			success: done
		});
	},

	logout: function(done) {
		$.ajax({
			type: 'POST', 
			url: client.url('/api/auth/logout'), 
			data: {deviceToken: deviceToken}, 
			cache: false, 
			success: done
		});
	},

	check: function(done) {
		$.ajax({
			type: 'GET', 
			url: client.url('/api/auth/check'),
			cache: false, 
			success: done
		});
	}

};

module.exports = SessionClient;