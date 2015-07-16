var generators = require('yeoman-generator');

var Base = generators.Base.extend({

	constructor: function() {
		generators.Base.apply(this, arguments);
	}

});

module.exports = Base.extend({

	initializing: function() {

	},

	prompting: require('./prompting'),

	configuring: require('./configuring'),

	default: {

	},

	writing: require('./writing'),

	install: require('./install'),

	end: require('./end')

});
