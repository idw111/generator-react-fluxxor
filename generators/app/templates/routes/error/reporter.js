var slack = require('slack-write');
var options = require('./slack');

var reporter = function(err, req, res, next) {
	if (!options.token || !options.channel || !options.username) {
		return next(err);
	}
	var messages = [];
	messages.push('*' + err.message + '*');
	messages.push('_' + req.method + ' ' + req.originalUrl + '_');
	slack.write(messages.join('\n'), options, function(slackError, result) {
		return next(err);
	});
};

module.exports = reporter;
