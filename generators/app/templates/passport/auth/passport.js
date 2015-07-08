'use strict';

var express = require('express');
var router = express.Router();
var passport = require('../../passport');

// facebook
router.get('/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email', 'user_birthday']}));
router.get('/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/',
	failureRedirect: '/',
	scope: ['public_profile', 'email', 'user_birthday']
}));

// kakao
router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
	successRedirect: '/',
	failureRedirect: '/'
}));

module.exports = router;
