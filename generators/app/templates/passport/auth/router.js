'use strict';

var express = require('express');
var router = express.Router();

router.use('/', require('./passport'));

module.exports = router;
