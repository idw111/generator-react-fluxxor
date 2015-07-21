'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var UserProvider = require('../enum/UserProvider');
var generatePassword = require('password-generator');

// schema
var UserSchema = new Schema({
	username: {type: String, required: true, lowercase: true, index: true},
	password: {type: String, required: true},
	nickname: {type: String, required: true},
	provider: {type: String, required: true, enum: UserProvider.toArray()},
	email: {type: String, required: false, index: true},
	photo: {type: String, required: false},
	verified: {type: Boolean, default: false},
	verificationCode: {type: String, default: null},
	registeredAt: {type: Date, default: Date.now}
});

// options
UserSchema.options.toJSON = {
	transform: function(user, ret) {
		delete ret.__v;
		delete ret.password;
		delete ret.verificationCode;
		ret.registeredAt = ret.registeredAt.getTime();
		return ret;
	}
};

// statics
UserSchema.statics.findByUsernameAndProvider = function(username, provider, done) {
	this.findOne({username: username.toLowerCase(), provider: provider}, done);
};

UserSchema.statics.findByUsername = function(username, done) {
	this.findByUsernameAndProvider(username, UserProvider.LOCAL, done);
};

UserSchema.statics.register = function(username, password, nickname, email, done) {
	if (!username || !password) {
		if (!username) return done(new Error('username is empty'));
		if (!password) return done(new Error('password is empty'));
	}

	nickname = nickname || username;
	email = email || '';

	this.findOne({username: username.toLowerCase(), provider: UserProvider.LOCAL}, function(err, user) {
		if (err) return done(err);
		if (user) return done(new Error('username already exists'));
		user = new User({username: username, nickname: nickname, password: bcrypt.hashSync(password), email: email, provider: UserProvider.LOCAL});
		user.save(function(err, user) {
			if (err) return done(err);
			return done(null, user);
		});
	});
};

UserSchema.statics.validate = function(username, password, done) {
	this.findOne({username: username.toLowerCase(), provider: UserProvider.LOCAL}, function(err, user) {
		if (err) return done(err);
		if (!user) return done(new Error('username does not exist'));
		if (!bcrypt.compareSync(password, user.password)) return done(new Error('password is invalid'));
		return done(null, user);
	});
};

UserSchema.statics.verify = function(code, done) {
	this.findOneAndUpdate({verificationCode: code, verified: false}, {$set: {verificationCode: null, verified: true}}, {new: true}, function(err, user) {
		if (err) return done(err);
		return done(null, user);
	});
};

// methods
UserSchema.methods.updateProfile = function(profile, done) {
	if (profile.password) return done(new Error('password cannot be updated using updateProfile'));
	for (var key in profile) {
		this[key] = profile[key];
	}
	this.save(function(err, user) {
		if (err) return done(err);
		return done(null, user);
	});
};

UserSchema.methods.updatePassword = function(oldPassword, newPassword, done) {
	if (!bcrypt.compareSync(oldPassword, this.password)) return done(new Error('password is invalid'));
	this.password = bcrypt.hashSync(newPassword);
	this.save(function(err, user) {
		if (err) return done(err);
		return done(null, user);
	});
};

UserSchema.methods.issueVerificationCode = function(done) {
	this.verificationCode = generatePassword(8, false, /[0-9A-Z]/);
	this.save(function(err, user) {
		if (err) return done(err);
		return done(null, user);
	});
};

// model
var User = mongoose.model('User', UserSchema);

module.exports = User;
