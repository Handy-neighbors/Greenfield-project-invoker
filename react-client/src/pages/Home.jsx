//to work react
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
//to work in ajax
import $ from 'jquery';

import PatientList from './PatientList.jsx';

//the style for the main header
const header1={
  color:'#d0ecf4',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'50px',
  fontFamily: 'Lobster',
  marginTop:'2px',
};

//the style for retrieve one patient
const header3={
  color:'#d0ecf4',
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
  // marginRight: 'auto',
  margin: 'auto',
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
  margin:'auto',
};
//style for th / the const thing
const table={
    // border: '3px solid black',
    borderCollapse: 'collapse',
    borderRadius:'4px',
    padding: '3px',
    textAlign : 'center',
    fontSize:'25px',
    fontWeight:'bold',
    color:'black',
    backgroundColor: '#d0ecf4',
}
//style for td / the changed thing
const table2={
    // border: '3px solid black',
    borderCollapse: 'collapse',
    borderRadius:'10px',
    padding: '3px',
    textAlign : 'center',
    fontSize:'25px',
    //fontWeight:'bold',
    color:'#d0ecf4'
    // backgroundColor: '#026887',

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
      id:'',
      date:'',
      patientName:'',
      situation:'',
      time:'',
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
    $('.'+e.target.id).html(that.state.newVal);
    console.log(that.state.newVal,'whaaaa')
    that.setState({
          change:e.target.id
        })
    $.ajax({
      url: '/patient',
      type: 'PUT',
      data: { changes:e.target.id,
              newVal : that.state.newVal,
              name:that.state.name
      },
      success:function(data) {
        console.log(data)
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
    //console.log('you try to retrieve one patient', typeof this.state.patientName);
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
        that.setState({data:res,
                        name:res[0].firstName
        });
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
    $('.past_Diseases').html(data.past_Diseases);
    $('.currentlly_Medications').html(data.currentlly_Medications);
    $('.genetic_Diseases').html(data.genetic_Diseases);
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
        id:this.state.id,
        date: this.state.date,
        patientName:this.state.patientName,
        situation: this.state.situation,
        time:this.state.time
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
          <Col md="5">
          
        
          <h2 style={header1}>Retrieve data for patient  by his Name</h2>
          <div2 className='row' style={{marginLeft:'auto',marginRight: 'auto'}}>
            <h3 className='col-xs-4 col-xs-offset-1' style={header3}>Get all info for this patient:</h3>
              <input value={this.state.patientName} type='text' onChange={this.onWrite1.bind(this)} placeholder="Patient Name" style={input3}></input>
              <br/>
              <br/>
           <button className='col-xs-2 col-xs-offset-1 btn btn-block' onClick={this.retrieveOne.bind(this)} style={button3}>Show data</button>              

            
          </div2>
          <div3>
            <table style={{width:'80%',marginLeft:'auto',marginRight: 'auto',marginTop:'20px','borderRadius':'10px'}}>
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
                <td className='past_Diseases' style={table2}></td>
              </tr>
              <tr>
                <th style={table}>Curr. Medications</th>
                <th style={table}>Genetic Diseases</th>
                <th style={table}>Allergies</th> 
                <th style={table}>Description</th>
              </tr>
              <tr>
                <td className='currentlly_Medications' style={table2}></td>
                <td className='genetic_Diseases' style={table2}></td>
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
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="past_Diseases">Past Diseases
              </button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="currentlly_Medications">Curr. Medications
              </button>
              <button onClick={this.onClick.bind(this)} style={{width:'100%'}} id="genetic_Diseases">Genetic Diseases
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
           <table style={table2}>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Patient Name</th> 
                
              </tr>
              <tr>
                
                <td> <input type="text" placeholder="Enter ID" style={input3} name="id" value={this.state.id} onChange={this.handleChanges}/></td>
                <td> <input type="Date" placeholder="Enter Date" style={input3} name="date" value={this.state.date} onChange={this.handleChanges}/></td>
                <td> <input type="text" placeholder="Enter Patient Name" style={input3} name="patientName" value={this.state.patientName} onChange={this.handleChanges}/></td>
              
              </tr>
              <tr>
              <th>Situation</th>
                <th>Time</th>
                
               
              </tr>
              <tr>
                <td><input type="text" placeholder="Enter Situation" style={input3} name="situation" value={this.state.situation} onChange={this.handleChanges}/></td>
                <td><input type="time" placeholder="Enter Time" style={input3} name="time" value={this.state.time} onChange={this.handleChanges}/></td>
              </tr>
            </table>
        <input  type="submit" value="Submit" style={button3}/>
            </form>
             </div>
            
         </center>
          </div>
        
           </div>
           
             <button onClick={this.logout.bind(this)} style={button1}>Logout</button>
             </Col>
           <Col md="7"> <div style={{margin: '80px'}}>
        
        
        <PatientList appointments={this.state.appointments} deleteArray={this.deleteArray}/>
        
       
        </div> </Col>
             </Row>
        </div1>
    )
  }
}
//export this component to can use
export default Home;


