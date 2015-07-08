'use strict';

var config = require('./config');
var app = require('./app');

config.mongo.connect(function(err) {
    app.listen(config.server.port);
});
