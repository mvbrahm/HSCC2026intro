var express = require('express');
var router = express.Router();
var {verifyToken}=require('../utils/usertoken');
var {createUserTable,getAllUsers}=require('../utils/sqltest')

/* GET home page. */
router.get('/', verifyToken, function(req, res, next) {
  createUserTable();
  // const users=getAllUsers();
  res.render('index', { title: 'Express' , name:res.locals.name});
});

module.exports = router;
