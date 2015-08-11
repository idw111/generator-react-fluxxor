'use strict';

var express = require('express');
var router = express.Router();

router.use('/', require('./index'));
router.use('/api', require('./api/router'));

<% if (useSocialLogin) { %>
router.use('/auth', require('./auth/router'));
<% } %>

module.exports = router;
