'use strict';

var mongoose = require('mongoose');

var config = {

	server: {
		host: 'localhost',
		port: 3000,
		url: function() { return config.server.host + ':' + config.server.port; }
	},

	redis: {
		host: 'redis',
		port: 6379,
		url: function() { return config.redis.host + ':' + config.redis.port; }
	},

	mongo: {
		host: 'mongo',
		port: 27017,
		database: '<%= appName %>',
		connect: function(done) { mongoose.connect('mongodb://' + config.mongo.url() + '/' + config.mongo.database, done); },
		url: function() { return config.mongo.host + ':' + config.mongo.port; }
	}
	
};

module.exports = config;
