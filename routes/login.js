var express = require('express');
var router = express.Router();
var { generateKey} = require('../utils/crypto');
var { getWithBearerToken, postWithBearerToken} = require('../utils/APIrequests');
var {createToken, verifyToken}=require('../utils/usertoken');
var {getUser}=require('../utils/sqltest');

/* GET register page. */
router.get('/', verifyToken, function (req, res, next) {
  if (res.locals.name){
    res.redirect('/');
  }
  else{
  res.render('login', { title: 'Login' , result: "To be determined"});
  }
});

router.post('/', async function (req, res, next) {
  //Getting info from form
  let password=req.body.password;
  let username=req.body.username;

  // let usernameurl='https://drive.api.hscc.bdpa.org/v1/users/' + username
  // if (process.env.PRODUCTION=="false") {
  //     console.log(usernameurl);       
  // }
  // let token=process.env.BEARER_TOKEN

  // const getResponse= await getWithBearerToken(usernameurl,token)
  // if (process.env.PRODUCTION=="false") {
  //     console.log(getResponse);       
  // } 

  // if (!getResponse.success){
  //   res.render('login', { title: 'Login' , result: "User not defined"});
  //   return
  // }
  // //If user exists get salt
  // var salt=getResponse.user.salt;
  // if (process.env.PRODUCTION=="false") {
  //     console.log(salt);       
  // }

  // var key=generateKey(password,salt)
  // //Test key
  // const keyData={
  //   key
  // }
  // const keyURL="https://drive.api.hscc.bdpa.org/v1/users/" + username + "/auth"
  // const keyResponse=await postWithBearerToken(keyURL,token,keyData)
 
  // if (process.env.PRODUCTION=="false") {
  //   console.log(keyResponse);       
  // }

  rows=getUser(username);
  console.log(rows.length);

  if (rows.length>0){
    
    salt=rows[0].salt;
    var key=generateKey(password,salt)
    console.log("KEY=",key,"\n",rows[0].key)
    if (key==rows[0].key){
      token=createToken(username);  //Creating our auth token
      res.redirect('/');
    }
    // console.log(salt)
    else{
      res.render('login', { title: 'Login' , result: "Invalid Password"});
    }
  }
  else{
    res.render('login', { title: 'Login' , result: "User does not exist"});
  }
  
});

module.exports=router;