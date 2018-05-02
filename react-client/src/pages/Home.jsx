//to work react
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
//to work in ajax
import $ from 'jquery';

import PatientList from './PatientList.jsx';

//the style for the main header
const header1={
  color:'black',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'50px',
  fontFamily: 'Lobster',
  marginTop:'2px',
};

//the style for retrieve one patient
const header3={
  color:'black',
  fontWeight:'bold',
  textAlign:'centezr',
  fontSize:'25px',
  fontFamily: 'Lobster',
  marginTop:'5px',
  marginLeft: '200px',
};
//style for input retrieve one patient
const input3={
  padding: '10px 10px 10px 10px',
  marginRight: '-80px',
  marginLeft: '-30px',
  color:'black',
  fontSize:'15px',
  border: '2px solid black',
  borderRadius: '15px',
};
//the style for the button retrieve one patient
const button3={
  padding:'6px',
  backgroundColor: '#123456',
  color: 'white',
  border: '2px solid black',
  fontSize:'20px',
  borderRadius: '15px',
  fontFamily: 'Lobster',
};
//style for th / the const thing
const table={
    border: '3px solid black',
    borderCollapse: 'collapse',
    padding: '3px',
    textAlign : 'center',
    fontSize:'25px',
    fontWeight:'bold',
    color:'black',
    backgroundColor: 'white',
}
//style for td / the changed thing
const table2={
    border: '3px solid black',
    borderCollapse: 'collapse',
    padding: '3px',
    textAlign : 'center',
    fontSize:'25px',
    //fontWeight:'bold',
    color:'white',
    backgroundColor: 'gray',

}
//the style for the button logout
const button1={
  padding:'5px',
  //this three to make it center
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  backgroundColor: '#bb280e',
  color: 'white',
  border: '2px solid #bb280e',
  marginTop:'10px',
  fontSize:'20px',
  borderRadius: '10px',
  fontFamily: 'Lobster',
};
//the style for the button create new patient
const button2={
  padding:'5px',
  //this three to make it center
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  backgroundColor: '#123456',
  color: 'white',
  border: '2px solid #123456',
  marginTop:'0px',
  fontSize:'20px',
  borderRadius: '10px',
  fontFamily: 'Lobster',
};
const button4={
  padding:'5px',
  //this three to make it center
  display: 'block',
  margin: 'auto',
  backgroundColor: '#123456',
  color: 'white',
  border: '2px solid #123456',
  marginTop:'0px',
  fontSize:'20px',
  borderRadius: '10px',
  fontFamily: 'Lobster',
};
//the page home what inside render
class Home extends React.Component {
  constructor(){
    super();
    //all the data save before sent in state
    this.state={
      loggedIn:true,
      patientName:"",
      change:"",
      newVal:"",
      name:"",
      //the data get from retrieve
      data:{},
      id:0,
      date:'',
      patientName:'',
      situation:'',
      gender:'',
      appointments:[]
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteArray=this.deleteArray.bind(this);
  }
  //when change  ... change the
  //patient number
  onWrite1 (e) {
    this.setState({
      patientName: e.target.value,
    });
  };
    onChange (e) {
    this.setState({
      newVal: e.target.value
    });
  };
  onClick(e){
    var that = this
    that.setState({
          change:e.target.id
        },()=> console.log(that.state.change,that.state.newVal))
    $.ajax({
      url: '/update',
      type: 'POST',
      data: { changes:that.state.change,
              newVal : that.state.newVal
      }
})

  };
  delete(){
    var that = this
    $.ajax({
      url: '/patient',
      type: 'DELETE',
      data: {name:that.state.name },
      success:function(){
        window.location.href= window.location.origin+'/'
      }
    })
  }
  //for logout button
  logout(){
    console.log('you try to logoutDR');
    const that=this
    // ajax request to logout
    $.ajax({
      type: 'GET',
      url: '/logout',
      //when success do this
      success: function (res) {
        alert(res);
        that.setState({loggedIn:false});
        window.location.href= window.location.origin+'/login'
      },
      //when error do this
      error: function (){
        alert('Failed logout please try again DR');
        console.log('Failed logout please try again DR');
      },
    }); 
  };
  //for button create new patient
  newPatient(){
    console.log('you try to go to create new patient:');
    window.location.href=window.location.origin+'/newpatient';
  };
  //for retrieve one patient
  retrieveOne(){
    console.log('you try to retrieve one patient', typeof this.state.patientName);
    const that=this
    //ajax request to logout
    $.ajax({
      type: 'GET',
      url: '/patient',
      data:{number:`${that.state.patientName}`},
      //when success do this
      success: function (res) {
        console.log('Sucess retrieve patient have name: ',res[0].firstName);
        alert('Sucess retrieve patient have name: '+res[0].firstName);
        that.setState({data:res});
        //console.log(that.state.data);
        that.renderData()
      },
      //when error do this
      error: function (){
        alert('Failed retrieve one patient please try again DR');
        console.log('Failed retrieve one patient please try again DR');
      },
    }); 
  };
  //to save data to can use and render
  renderData(){
    //console.log('HERE: ',this.state.data[0]);
    //i get the data now i neeed to render it
    var data=this.state.data[0]
    console.log('HERE: ',this.state.data[0]);
    $('.number').html(data.number);
    $('.firstName').html(data.firstName);
    $('.lastName').html(data.lastName);
    $('.gender').html(data.gender);
    $('.age').html(data.age);
    $('.phone').html(data.phone);
    $('.conditions').html(data.conditions);
    $('.pastDiseases').html(data.past_Diseases);
    $('.currMedications').html(data.currentlly_Medications);
    $('.geneticDisease').html(data.genetic_Diseases);
    $('.allergies').html(data.allergies);
    $('.description').html(data.description);    
  };
  toggle(){
     $("#hidden").on('click',function(){
        $("#hi").toggle();

    });
   
  } 

  handleChanges(event){
      var name = event.target.name
      var value = event.target.value
      var obj = {}
      obj[name] = value
      this.setState(obj)
      console.log(this.state[name])
  }
  componentDidMount(){
    $.ajax({
      type : 'GET',
      url: '/appointments',
      success: (data) => {
        console.log(data.appointments)
        this.setState({
          appointments:data
        })

      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  deleteArray(array){

    this.setState({
      appointments:array
    })
  }

  handleSubmit(event) {
    $.ajax({
      type : 'POST',
      url: '/appointments',
      data: {
        id:++this.state.id,
        date: this.state.date,
        patientName:this.state.patientName,
        situation: this.state.situation,
        gender:this.state.gender
      }, 
      success: (data) => {
        console.log(data)
        this.setState({
          appointments:data
        })

      },
      error: (err) => {
        console.log('err', err);
      }
    });
    event.preventDefault();
  } 

  render () {
    return (
        <div1 className="container">
        <Row>
          <Col md="6">
          
        
          <h2 style={header1}>Retrieve data for patient  by his Name</h2>
          <div2 className='row' style={{marginLeft:'auto',marginRight: 'auto'}}>
            <h3 className='col-xs-4 col-xs-offset-1' style={header3}>Get all info for this patient:</h3>
            <input className='col-xs-1 col-xs-offset-1' value={this.state.patientName} type='text' onChange={this.onWrite1.bind(this)} placeholder="Patient Name" style={input3}></input>
            <button className='col-xs-2 col-xs-offset-1' onClick={this.retrieveOne.bind(this)} style={button3}>Show the data now</button>
          </div2>
          <div3>
            <table style={{width:'80%',marginLeft:'auto',marginRight: 'auto',marginTop:'20px'}}>
              <tr>
                <th style={table}>Number</th>
                <th style={table}>First name</th> 
                <th style={table}>Last name</th>
                <th style={table}>Gender</th>
              </tr>
              <tr>
                <td className='number' value='tttttt' style={table2}></td>
                <td className='firstName' style={table2}></td>
                <td className='lastName' style={table2}></td>
                <td className='gender' style={table2}></td>
              </tr>
              <tr>
                <th style={table}>Age</th>
                <th style={table}>Phone</th> 
                <th style={table}>Conditions</th>
                <th style={table}>Past Diseases</th>
              </tr>
              <tr>
                <td className='age' style={table2}></td>
                <td className='phone' style={table2}></td>
                <td className='conditions' style={table2}></td>
                <td className='pastDiseases' style={table2}></td>
              </tr>
              <tr>
                <th style={table}>Curr. Medications</th>
                <th style={table}>Genetic Diseases</th>
                <th style={table}>Allergies</th> 
                <th style={table}>Description</th>
              </tr>
              <tr>
                <td className='currMedications' style={table2}></td>
                <td className='geneticDisease' style={table2}></td>
                <td className='allergies' style={table2}></td>
                <td className='description' style={table2}></td>
              </tr> 
            </table>
          </div3>
          <div4 className='row'> 
             <div  style = {{marginRight: 'auto', marginLeft: 'auto', marginTop: '10px', width:" 600px"}}className="container">
          <div className = 'center'>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button  style={button2} className="btn btn-secondary"onClick={this.newPatient.bind(this)} >Create New Patient</button>
        <div className="dropdown">
          <button className="dropbtn" style = {button2}>Edit Patient Info</button>
            <div className="dropdown-content">
            <input onChange={this.onChange.bind(this)} style={{width:'100%'}} type="text" placeholder="New Entry Here"></input>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="number">Number</button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="firstName">First Name</button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="lastName">Last Name</button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="gender">Gender</button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="age">Age</button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="phone">Phone</button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="conditions">Conditions</button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="pastDiseases">Past Diseases
              </button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="currMedications">Curr. Medications
              </button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="geneticDisease">Genetic Diseases
              </button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="allergies">Allergies</button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="description">Description</button>
            </div>  
        </div>
              <button onClick={this.delete.bind(this)} style={button2} className="btn btn-secondary" style={button2}>Delete Patient Info</button>
            </div> 
          </div>
          </div>
             </div4>
             <div>
             <div>
              <button id="hidden" onClick={this.toggle.bind(this)} style={button4}>Add appointments</button> 
             <center>
             <div style={{marginRight:'70px',display:"none"}} id="hi">
             <form onSubmit={this.handleSubmit}>  
           
          <div>
            <p style={{fontSize:'20px', textAlign:'center',fontWeight: 'bold'}}>Date:</p>
            <input type="Date" placeholder="Enter service" style={input3} name="date" value={this.state.date} onChange={this.handleChanges}/>
          </div>
          <div>
           <p style={{fontSize:'20px', textAlign:'center',fontWeight: 'bold'}}>Patient Name:</p>
            <input type="text" placeholder="Enter Patient Name" style={input3} name="patientName" value={this.state.patientName} onChange={this.handleChanges}/>
          </div>
          <div>
           <p style={{fontSize:'20px', textAlign:'center',fontWeight: 'bold'}}>Situation:</p>
            <input type="text" placeholder="Enter Situation" style={input3} name="situation" value={this.state.situation} onChange={this.handleChanges}/>
          </div>
          <div>
            <p style={{fontSize:'20px', textAlign:'center',fontWeight: 'bold'}}>Gender:</p>
            <input type="text" placeholder="Enter Gender" style={input3} name="gender" value={this.state.gender} onChange={this.handleChanges}/>
          </div>
          <p></p>
        <input  type="submit" value="Submit" style={button3}/>
            </form>
             </div>
            
         </center>
          </div>
        
           </div>
           
             <button onClick={this.logout.bind(this)} style={button1}>Logout</button>
             </Col>
           <Col md="6"> <div style={{margin: '80px'}}>
        
        
        <PatientList appointments={this.state.appointments} deleteArray={this.deleteArray}/>
        
       
        </div> </Col>
             </Row>
        </div1>
    )
  }
}
//export this component to can use
export default Home;


