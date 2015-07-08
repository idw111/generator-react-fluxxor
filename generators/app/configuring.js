var async = require('async');

var configuring = {

	configureGit: function() {
		var url = this.config.get('git');
		if (!url) return;
		var done = this.async();
		async.waterfall([
			function(done) {
				this.spawnCommand('git', ['init']).on('close', function() {
					return done(null);
				});
			},
			function(done) {
				this.spawnCommand('git', ['remote', 'add', 'origin', url]).on('close', function() {
					return done(null);
				});
			}
		], function(err) {
			return done();
		});
	}

};

module.exports = configuring;