var express = require('express');
var router = express.Router();
var {verifyToken}=require('../utils/usertoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('hsccref', { title: 'HSCC Reference page', name:res.locals.name });
});

module.exports = router;
