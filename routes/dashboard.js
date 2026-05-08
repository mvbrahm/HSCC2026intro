var express = require('express');
var router = express.Router();
var {verifyToken}=require('../utils/usertoken');
const { eventNames } = require('../app');
const { getWithBearerToken, putWithBearerToken } = require('../utils/APIrequests');

/* GET home page. */
router.get('/', verifyToken, async function(req, res, next) {
  if (res.locals.name){
    
    const url="https://drive.api.hscc.bdpa.org/v1/users/"+res.locals.name
    const token=process.env.BEARER_TOKEN;
    const user=await getWithBearerToken(url, token);
    const email=user.user.email;
    if (process.env.PRODUCTION=="false") {
        console.log(user);
        console.log("Email:",email);
    }
    res.render('dashboard', { title: 'Dashboard' , name:res.locals.name, email: email});
  }
  else{
    res.redirect('/login');
  }
});

router.post('/', verifyToken, async function(req, res, next) {
  const url="https://drive.api.hscc.bdpa.org/v1/users/"+res.locals.name
  const token=process.env.BEARER_TOKEN;
  let email=req.body.email;
  const data={
    email
  };
  const createResponse = await putWithBearerToken(url, token, data );
    if (process.env.PRODUCTION=="false") {
      console.log(createResponse);       
    } 
  res.redirect('dashboard')
});

module.exports = router;