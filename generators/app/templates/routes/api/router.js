'use strict';

var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));

module.exports = router;
