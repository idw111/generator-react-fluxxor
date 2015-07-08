var slack = require('slack-write');
var options = require('./slack');

var uncaught = function(err) {
	if (!options.token || !options.channel || !options.username) {
		return process.exit(1);
	}
	var messages = [];
	messages.push('*' + err.message + '*');
	messages.push('```' + err.stack + '```');
	slack.write(messages.join('\n'), options, function(slackError, result) {
		return process.exit(1);
	});
};

module.exports = uncaught;
