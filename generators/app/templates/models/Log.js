'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema
var LogSchema = new Schema({
	type: {type: String},
	log: {type: Schema.Types.Mixed},
	createdAt: {type: Date, default: Date.now}
});

// options
LogSchema.options.toJSON = {
	transform: function(user, ret) {
		delete ret.__v;
		ret.createdAt = ret.createdAt.getTime();
		return ret;
	}
};

// statics
LogSchema.statics.get = function(type, done) {
	this.find({type: type}).limit(100).exec(done);
};

// methods

// model
var Log = mongoose.model('Log', LogSchema);

module.exports = Log;
