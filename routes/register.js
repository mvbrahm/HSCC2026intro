var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  res.render('register', { title: 'Register' });
});


module.exports = router;
