'use strict';
var expect = require('expect.js');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var path = require('path');

describe('react-fluxxor:app', function() {

	before(function(done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.withPrompts({
				appName: 'generator-react-fluxxor-test',
				passport: true
			})
			.on('end', done);
	});

	it('creates root files', function() {
		assert.file(['app.js', 'index.js', 'config.js', 'config.docker.js', 'package.json', 'passport.js', 'webpack.config.js', '.gitignore', 'gulpfile.js']);
	});

	it('creates client files', function() {
		assert.file(['client/javascripts/main.js', 'client/stylesheets/style.less']);
	});

	it('creates model files', function() {
		assert.file(['models/Log.js', 'models/User.js']);
	});

	it('creates enum files', function() {
		assert.file(['enum/Enum.js', 'enum/UserProvider.js']);
	});

	it('creates routes files', function() {
		assert.file(['routes/index.js', 'routes/router.js']);
	});

	it('creates views files', function() {
		assert.file(['views/index.jade', 'views/error.jade']);
	});

});
