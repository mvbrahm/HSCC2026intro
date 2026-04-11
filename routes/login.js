var express = require('express');
var router = express.Router();
var { generateKey} = require('../utils/crypto');
var { getWithBearerToken, postWithBearerToken} = require('../utils/APIrequests');

/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login' , result: "To be determined"});
});

router.post('/', async function (req, res, next) {
  //Getting info from form
  let password=req.body.password;
  let username=req.body.username;

  let usernameurl='https://drive.api.hscc.bdpa.org/v1/users/' + username
  if (process.env.PRODUCTION=="false") {
      console.log(usernameurl);       
  }
  let token=process.env.BEARER_TOKEN
  
  const getResponse= await getWithBearerToken(usernameurl,token)
  if (process.env.PRODUCTION=="false") {
      console.log(getResponse);       
  } 
  res.render('login', { title: 'Login' , result: getResponse.success});
});

module.exports=router;