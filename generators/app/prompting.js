var prompting = {

	askAppName: function() {
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'appName',
			message: 'project name',
		},
		function(answer) {
			if (!answer.appName) {
				this.log('project name should be set');
				return process.exit(1);
			}
			this.config.set('appName', answer.appName);
			return done();
		}.bind(this));
	},

	askPassport: function() {
		var done = this.async();
		this.prompt({
			type: 'confirm',
			name: 'passport',
			message: 'use passport',
		}, function(answer) {
			this.config.set('usePassport', answer.passport);
			return done();
		}.bind(this));
	},

	askFacebookClientId: function() {
		if (!this.config.get('usePassport')) return;
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'facebookClientId',
			message: 'facebook client id',
			default: 'FACEBOOK_CLIENT_ID'
		},
		function(answer) {
			this.config.set('facebookClientId', answer.facebookClientId);
			return done();
		}.bind(this));
	},

	askFacebookClientSecret: function() {
		if (!this.config.get('usePassport')) return;
		if (!this.config.get('facebookClientId')) return;
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'facebookClientSecret',
			message: 'facebook client secret',
			default: 'FACEBOOK_CLIENT_SECRET'
		},
		function(answer) {
			this.config.set('facebookClientSecret', answer.facebookClientSecret);
			return done();
		}.bind(this));
	},

	askKakaoClientId: function() {
		if (!this.config.get('usePassport')) return;
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'kakaoClientId',
			message: 'kakao client id',
			default: 'KAKAO_CLIENT_ID'
		},
		function(answer) {
			this.config.set('kakaoClientId', answer.kakaoClientId);
			return done();
		}.bind(this));
	},

	askKakaoClientSecret: function() {
		if (!this.config.get('usePassport')) return;
		if (!this.config.get('kakaoClientId')) return;
		var done = this.async();
		this.prompt({
			type: 'input',
			name: 'kakaoClientSecret',
			message: 'kakao client secret',
			default: 'KAKAO_CLIENT_SECRET'
		},
		function(answer) {
			this.config.set('kakaoClientSecret', answer.kakaoClientSecret);
			return done();
		}.bind(this));
	},

};

module.exports = prompting;
