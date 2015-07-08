var passport = require('passport');
var User = require('./models/User');
var UserProvider = require('./enum/UserProvider');
var async = require('async');

<% if (facebookClientId) { %>
var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
	clientID: '<%= facebookClientId %>',
	clientSecret: '<%= facebookClientSecret %>',
	callbackURL: '/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
	async.waterfall([
		function(done) {
			User.findByUsernameAndProvider(profile.id.toString(), UserProvider.FACEBOOK, function(err, user) {
				if (err) return done(err);
				if (user) return done(null, user);
				user = new User({
					username: profile.id,
					nickname: profile.displayName,
					email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
					photo: 'http://graph.facebook.com/' + profile.id + '/picture?width=60&height=60',
					provider: UserProvider.FACEBOOK,
					verified: profile._json.verified || false
				});
				user.save(function (err, user) {
					if (err) return done(err);
					return done(null, user);
				});
			});
		},
		function(user, done) {
			if (user.verified || user.verificationCode) return done(null, user);
			if (!user.email) return done(null, user);
			user.issueVerificationCode(function (err, user) {
				if (err) return done(err);
				Email.sendVerificationEmail(user, function (err, info) {
					if (err) return done(err);
					return done(null, user);
				});
			});
		}
	], function(err, user){
		if (err) return done(err);
		return done(null, user);
	});
}));
<% } %>

<% if (kakaoClientId) { %>
var KakaoStrategy = require('passport-kakao').Strategy;
passport.use(new KakaoStrategy({
	clientID: '<%= kakaoClientId %>',
	clientSecret: '<%= kakaoClientSecret %>',
	callbackURL: '/auth/kakao/callback'
}, function(accessToken, refreshToken, profile, done) {
	async.waterfall([
		function(done) {
			User.findByUsernameAndProvider(profile.id.toString(), UserProvider.KAKAO, function(err, user) {
				if (err) return done(err);
				if (user) return done(null, user);
				user = new User({
					username: profile.id, 
					nickname: profile.username, 
					email: null, 
					photo: profile._json.properties.thumbnail_image || null, 
					provider: UserProvider.KAKAO
				});
				user.save(function(err, user) {
					if (err) return done(err);
					return done(null, user);
				});
			});
		}
	], function(err, user){
		if (err) return done(err);
		return done(null, user)
	});
}));
<% } %>

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
	usernameField: 'username', 
	passwordField: 'password'
}, function(username, password, done) {
	User.validate(username, password, function(err, user) {
		if (err) return done(err);
		return done(null, user);
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
	User.findById(userId, done);
});

module.exports = passport;