var writing = {

	writePackage: function() {
		// package.json
		this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.config.getAll());
	},

	writeGitignore: function() {
		// .gitignore
		this.fs.copyTpl(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
	},

	writeConfig: function() {
		// config.js
		this.fs.copyTpl(this.templatePath('config.js'), this.destinationPath('config.js'), this.config.getAll());
		this.fs.copyTpl(this.templatePath('config.docker.js'), this.destinationPath('config.docker.js'), this.config.getAll());
		// webpack.config.js
		this.fs.copyTpl(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'));
		// gulpfile.js
		this.fs.copyTpl(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
	},

	writeMain: function() {
		// app.js
		this.fs.copyTpl(this.templatePath('app.js'), this.destinationPath('app.js'), this.config.getAll());
		// index.js
		this.fs.copyTpl(this.templatePath('index.js'), this.destinationPath('index.js'));
	},

	writeModels: function() {
		// models/
		this.fs.copy(this.templatePath('models/'), this.destinationPath('models/'));
		// enum
		this.fs.copy(this.templatePath('enum/'), this.destinationPath('enum/'));
	},

	writeRoutes: function() {
		// routes/
		this.fs.copy(this.templatePath('routes/'), this.destinationPath('routes/'));
		this.fs.copyTpl(this.templatePath('routes/index.js'), this.destinationPath('routes/index.js'), this.config.getAll());
		this.fs.copyTpl(this.templatePath('routes/router.js'), this.destinationPath('routes/router.js'), this.config.getAll());
	},

	writeViews: function() {
		// views/
		this.fs.copy(this.templatePath('views/'), this.destinationPath('views/'));
	},

	writeClient: function() {
		// client/
		this.fs.copy(this.templatePath('client/'), this.destinationPath('client/'));
	},

	writePublic: function() {
		// public/
		this.fs.copy(this.templatePath('public/'), this.destinationPath('public/'));
	},

	writePassport: function() {
		// passport.js
		this.fs.copyTpl(this.templatePath('passport/passport.js'), this.destinationPath('passport.js'), this.config.getAll());
		if (!this.config.get('useSocialLogin')) return;
		this.fs.copy(this.templatePath('passport/auth/'), this.destinationPath('routes/auth/'));
	}

};

module.exports = writing;
