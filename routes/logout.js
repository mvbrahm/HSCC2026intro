var express = require('express');
var router = express.Router();
var {destroyToken} =require('../utils/usertoken');

router.get('/', function(req, res, next) {
  const destory=destroyToken();
  res.redirect('/login');
});

module.exports = router;