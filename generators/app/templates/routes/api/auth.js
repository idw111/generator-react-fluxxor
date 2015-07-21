'use strict';

var express = require('express');
var router = express.Router();
var async = require('async');
var User = require('../../models/User');
var passport = require('../../passport');

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) return res.json({ok: true, user: null});
		async.waterfall([
			function(done) {
				req.login(user, function(err) {
					if (err) return done(err);
					return done(null, user);
				});
			}
		], function(err, user) {
			if (err) return res.json({ok: true, user: null});
			return res.json({ok: true, user: user.toJSON()});
		});
	})(req, res, next);
});

router.post('/logout', function(req, res) {
	req.logout();
	return res.json({ok: true});
});

router.post('/signup', function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	var nickname = req.param('nickname');
	var email = req.param('email');

	if (!username || !password || !nickname || !email) return res.json({ok: false});

	async.waterfall([
		function(done) {
			User.register(username, password, nickname, email, function(err, user) {
				if (err) return done(err);
				return done(null, user);
			});
		},
		function(user, done) {
			user.issueVerificationCode(function (err, user) {
				if (err) return done(err);
				return done(null, user);
			});
		},
		function(user, done) {
			Email.sendVerificationEmail(user, function (err, info) {
				if (err) return done(err);
				return done(null, user);
			});
		},
		function(user, done) {
			req.login(user, function(err) {
				if (err) return done(err);
				return done(null, user);
			});
		}
	], function(err, user) {
		if (!err) return res.json({ok: true, user: user.toJSON()});
		User.findOneAndRemove({username: username}, function(err) {
			return res.json({ok: true, user: null});
		});
	});
});

router.get('/check', function(req, res) {
	return res.json({ok: true, user: req.isAuthenticated() ? req.user.toJSON() : null});
});

module.exports = router;
