var generators = require('yeoman-generator');

var Base = generators.Base.extend({

	constructor: function() {
		generators.Base.apply(this, arguments);
	}

});

module.exports = Base.extend({

	initializing: function() {
		// check if there is a package.json file
		// and if it has a dependency on express
	},

	prompting: require('./prompting'),

	configuring: require('./configuring'),

	default: {

	},

	writing: require('./writing'),

	install: require('./install'),

	end: require('./end')

});