var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

// Handle inputs from the register form and display in the console.log
router.post('/', function (req, res, next) {
  console.log(req.body)
  console.log('username is ' + req.body.username)
});

// router.post('/', (req, res) => {

//   res.send('Hello ' + req.body.username + ', you have successfully registered with the email: ' + req.body.email);

// })

module.exports = router;