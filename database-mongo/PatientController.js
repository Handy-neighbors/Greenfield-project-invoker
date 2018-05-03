var Patient= require('./index');
var mongoose=require('mongoose');

//controller methods:
//1.create one patient
exports.createOne = function (req, res) {
  //try to solve problem not unique jozqq cant :(
  //console.log(req.body);
  req.body.number=JSON.parse(req.body.number);
  //console.log('HERE',req.body);
	var pInfo=req.body
	var patient=new Patient(pInfo)
  console.log(patient)
	patient.save(function(err,patient){
		if(err){
		console.log(err);
			res.send('This number is already taken, choose another one');
		}else{
			res.send('Success sent this data and create new patient ')
		}
	})
};

//2.update specific info for one patient
exports.updateOne = function (req, res) {
var changes = req.body.changes
var name = req._parsedOriginalUrl.path.split('=')[1]
Patient.findOne({firstName: name},function(err,data){
  Patient.findOneAndUpdate({firstName: name}, 
                  { changes : req.body.newVal }, function(err, mod){
                    res.send(mod)
                  })
})
    
};

//3.delete one patient
exports.delete=function(req,res){
  Patient.find({firstName:req.body.name},function(err,patient){
  	if(err){
  		console.log(err)
  		res.send(500);
             }
             else{
             	Patient.remove(function(err,patient){
             		if(err){
             			// console.log(err);
             			res.send(err);
             		}
             		else{
             			console.log('Success  deleted patient ^.^');
             			res.send('Success  deleted patient ^.^');
             		}
             	})
             }
  })
};
//
//4.return all info for one patient
exports.retrieveOne=function(req,res){
  //try to solve problem cant go to correct number jozaa
  //take the number sent in the GET request
  console.log(req)
  console.log(req.body.patientName)
  console.log('HEREEEEEEEEEEEE:',req._parsedOriginalUrl.path.split('=')[1]);
  var number=req._parsedOriginalUrl.path.split('=')[1].split('%20')
  //req.body.number=JSON.parse(req.body.number);
  //console.log('HERE',req.body);
  //console.log(req)
  var first = number[0]
  var last = number[1]
  console.log(number,first,last)
  Patient.find({firstName:first, lastName:last},function(err,patient){
    if(err){
    	// console.log(err)
    	res.send(500)
    }
    else{
    	// console.log(patient)
    	res.send(patient)
    }
  })
};

//5.return all info for all patients
exports.retrieveAll=function(req,res){
  Patient.find(function(err,allpatient){
  	if(err){
  		// console.log(err)
  		res.send(500);
  	}
  	else{
  		// console.log(allpatient);
  		res.send(allpatient)
  	}
  })
};








// patient.number=req.body.number;
//       patient.firstName=req.body.firstName;
//       patient.lastName=req.body.lastName;
//       patient.gender=req.body.gender;
//       patient.age=req.body.age;
//       patient.phone=req.body.phone;
//       patient.conditions=req.body.conditions;
//       patient.past_Diseases=req.body.past_Diseases;
//       patient.currentlly_Medications=req.body.currentlly_Medications;
//       patient.genetic_Diseases=req.body.genetic_Diseases;
//       patient.allergies=req.body.allergies;

