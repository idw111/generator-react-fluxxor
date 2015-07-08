var jade = require('jade');
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var client = require('../client/javascripts/client');
var Log = require('../models/Log');
var LogType = require('../enum/LogType');

var Email = {

	send: function(email, subject, body, done) {
		var transporter = nodemailer.createTransport(directTransport({name: client.host}));

		var options = {
			from: 'hello@' + client.host,
			to: email,
			subject: subject,
			text: '',
			html: body
		};

		transporter.sendMail(options, function(err, info) {
			var log = new Log({type: LogType.EMAIL, log: err || info});
			log.save(function() {
				return done(err, info);
			});
		});
	},

	sendVerificationEmail: function(user, done) {
		var url = client.url('/verify/' + user.verificationCode);
		var subject = 'Welcome!';
		var html = jade.renderFile(__dirname + '/../views/email/verify.jade', {title: subject, verificationUrl: url});
		Email.send(user.email, subject, html, done);
	}

};

module.exports = Email;