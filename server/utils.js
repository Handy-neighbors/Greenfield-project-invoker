//helping functions to check if the user is logged in.
var session=require('express-session');
var path=require('path')
var mongoose=require('mongoose')
var controller=require('../database-mongo/PatientController');
var utils=require('./utils')
var bcrypt=require('bcrypt')
var bodyParser = require('body-parser');
var User=mongoose.model('User')

//this function will check for a user key in the session object
//returns true if it exists,false if not.
exports.isLoggedIn=function(req,res){
  if(req.session.user){
    //console.log(req.session.user);
    return true
  }
  return false;
}

exports.logIn=function(req, res){
    var userName=req.body.userName;
    var password=req.body.password;
    //searching for user by the username and comparing passwords.
    User.findOne({userName:userName},function(err,user){
      if(!user){
        console.log('This username does not exist in database ..!');
        res.send(`Sorry DR. this username does not exist in database please create new user now // if you have account but insert wrong username please go to login page again and insert your correct username`)
      }else{
      bcrypt.compare(password,user.password,function(err,match){
            if(match){
              console.log('Successful login');
              utils.createSession(req,res,user,userName);
            }else{
              console.log('Wrong password ..!');
              res.send(`Sorry DR.${userName} this password is wrong please insert the username again and your correct password`);
        }
      })}
    })
}
//this function will use the isLoggedIn function and will make a check on most
//routes,if the user is logged in it will handle his request.
exports.checkUser=function(req,res,next){
  if(!exports.isLoggedIn(req)){
    console.log('You Are not logged in');
    res.send('<script>alert("Sorry DR you are not logged in please login first to can access this page")</script>'+'<script>window.location.href= window.location.origin+"/login" </script>')
  }else{
    
    next()
  }
}

//this function will create a session and store the user info in it.
exports.createSession=function(req,res,aUser,username,b){
  req.session.regenerate(function(){
    req.session.username = username;
    req.session.user=aUser;
    //console.log(req.session)
    if (b) {
      res.send(`Welcome DR.${username} you create new user and you are logged in now`)
    }else{
      res.send(`Welcome DR.${username} you are logged in now`)
    }
  })
}
