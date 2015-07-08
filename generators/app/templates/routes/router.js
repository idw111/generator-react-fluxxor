'use strict';

var express = require('express');
var router = express.Router();

router.use('/', require('./index'));
router.use('/api', require('./api/router'));

<% if (usePassport) { %>
router.use('/auth', require('./auth/router'));
<% } %>

module.exports = router;
