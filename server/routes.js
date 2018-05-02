var router=require('express').Router();
var controller=require('../database-mongo/PatientController');
var utils=require('./utils')
var bcrypt=require('bcrypt')
var bodyParser = require('body-parser');
var path=require('path')
var mongoose=require('mongoose')
var User=mongoose.model('User')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended : true}))

router.route('/appointments')
.post(utils.checkUser,function(req, res){
  var obj = req.body
  console.log(req.session.username)
  var arr = []
  User.findOne({userName: req.session.username}, 'userName appoientment', function(err, data){
   
    //data.appoientment.push(obj)
    arr = data.appoientment
    arr.push(obj)
     //console.log(arr)
    //console.log(data.appoientment)
    //User.save(err)
    User.findOneAndUpdate({userName: req.session.username}, 
                  { appoientment: arr }, function(err, mod){
                    res.send(arr)
                  })
    
  })

})
.get(utils.checkUser, function(req, res){
  User.findOne({userName: req.session.username}, 'appoientment', function(err, data){
    res.send(data.appoientment)
  })
})
.delete(utils.checkUser,function(req, res){
  var id = req.body.id
  console.log(id)
  var arr = []
  // User.findOne({userName: req.session.username}, 'userName appoientment', function(err, data){
   
  //   //data.appoientment.push(obj)
  //   arr = data.appoientment
  //   arr.push(obj)
  //    //console.log(arr)
  //   //console.log(data.appoientment)
  //   //User.save(err)
  //   User.findOneAndUpdate({userName: req.session.username}, 
  //                 { appoientment: arr }, function(err, mod){
  //                   res.send(arr)
  //                 })
    
  // })

})

router.route('/login')
.get(function(req,res){
  res.sendFile(path.join(__dirname, '../react-client/dist/index.html'));
})

.post(utils.logIn)


router.route('/signup')
.get(function(req,res){
  res.sendFile(path.join(__dirname, '../react-client/dist/index.html'));
})

.post(function(req,res){
  var userName=req.body.userName;
  var password=req.body.password;
  var firstName=req.body.firstName;
  var lastName=req.body.lastName;

  //checking for a username,and if it doesn't exist it will create an account
  //and store the hashed password.
  User.findOne({userName:userName},function(err,user){
    if(!user){
      bcrypt.hash(password,10,function(err,hash){
          var user=new User({
            firstName:firstName,
            lastName:lastName,
            userName:userName,
            password:hash
          })
          user.save(function(err,user){
            console.log('Successful signup');
            //createSession will make a new session and store the user object in it.
            utils.createSession(req,res,user,userName,userName);
          })
      })
  }else{
    console.log('This username already exists in database ..!');
    res.send(`Sorry DR.${userName} you signup before please insert the username again and your password to log in // if you are not DR.${userName} please go to sign up page again and insert another username`)
  }
  })
});
//this route when accessed will destroy the current session.
router.route('/logout')
  .get(function(req,res){
    req.session.destroy()
    console.log('Successful logout');
    res.send(`Goodbye DR you logout now .. see you later`);
    })

//homepage route with checkUser middleware to check for a user key in the session object.
router.route('/')
.get(utils.checkUser,function(req,res){
  // console.log(req.session)
  res.sendFile(path.join(__dirname, '../react-client/dist/index.html'));
})
//go to newpatient page to can create new patient
router.route('/newpatient')
.get(utils.checkUser,function(req,res){
  res.sendFile(path.join(__dirname, '../react-client/dist/index.html'));
})
//must change here somthing by the id for this patient..26/4 12:30 PM
router.route('/patient')
//retrieve a pateint.
.get(utils.checkUser, controller.retrieveOne)
//create a patient.
.post(utils.checkUser,controller.createOne)
//update patient information.
.put(utils.checkUser,controller.updateOne)
//delete a patient.
.delete(utils.checkUser,controller.delete)

router.route('/patients')
//get all patients
.get(utils.checkUser,controller.retrieveAll)

module.exports=router;
