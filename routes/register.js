var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

// Handle inputs from the register form and display in the console.log
router.post('/', function(req, res, next) {
  console.log(req.body)
});



module.exports = router;