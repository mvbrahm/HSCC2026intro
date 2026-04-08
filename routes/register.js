var express = require('express');
var router = express.Router();
var { hashPassword, verifyPassword } = require('../utils/crypto');

/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('register', { title: 'Register' , licensecode: "To be determined"});
});


/*
router.post('/', function (req, res, next) {
  
  //Test form submission
  if (process.env.PRODUCTION=="false") {
    //console.log(req.body); 
    console.log(req.body.birthdate);
    console.log(typeof req.body.birthdate);
    console.log(req.body.gender);
  }

  
  let dob=req.body.birthdate;
  let gender=req.body.gender;

  //Slice dob string into month, day, and year
  let year=dob.slice(0,4);

  let month=Number(dob.slice(5,7));
  let day=Number(dob.slice(8)); 

  if (process.env.PRODUCTION=="false") {
    console.log(year);
    console.log(month);
    console.log(day);
  }

  //Calculate code here
  let yy=year.slice(2);
  let ddd=(month-1)*40+day;

  if (process.env.PRODUCTION=="false") {
    console.log(yy);
    console.log(ddd);
  }

  if (gender=='female'){
    ddd+=500;
  }

  ddd=ddd.toString();
  //Pad to 3 characters
  ddd=String(ddd).padStart(3,'0');
  //Get final code
  code=yy+ddd;
  
  res.render('register', { title: 'Register' , licensecode: code});
});
*/

router.post('/', function (req, res, next) {
  
  //Test form submission
  if (process.env.PRODUCTION=="false") {
    //console.log(req.body); 
    console.log(req.body.birthdate);
    console.log(typeof req.body.birthdate);
    console.log(req.body.gender);
  }

  
  let password=req.body.password;
  let username=req.body.username;
  let email=req.body.email;
  try {
    // Hash password
    const { salt, key } = hashPassword(password);
    if (process.env.PRODUCTION=="false") {
      console.log("win"); 
      console.log(salt);
      console.log(key);
      
    } 
    const userData = {
      username,
      email,
      salt,
      key
    };
    res.render('register', { title: 'Register' , licensecode: userData.salt});
  }
  catch(error) {
    console.log(error)
    res.render('register', { title: 'Register' , licensecode: "botch"});
  }

});

module.exports = router;