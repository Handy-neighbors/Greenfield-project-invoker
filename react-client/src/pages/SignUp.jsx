//to work react
import React from 'react';
//to work in ajax
import $ from 'jquery';
//the style for the main header
const header={
  color:'#d0ecf4',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'40px',
  fontFamily: 'Lobster',
  marginTop:'2px',
  marginBottom:'-15px',
};
//the style for the main header
const header2={
  color:'#d0ecf4',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'25px',
  fontFamily: 'Lobster',
  marginBottom:'-10px',
  marginTop:'5px',
};
//the style for first name
const fName={
  color:'#d0ecf4',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};
//the style for last name
const lName={
  color:'#d0ecf4',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};
//the style for the user
const user={
  color:'#d0ecf4',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};
//the style for the password
const password={
  color:'#bb280e',
  fontWeight:'bold',
  textAlign:'center',
  fontSize:'20px',
  marginBottom:'-10px',
};
//the style for the user and password input
const input={
  padding: '10px 10px 10px 10px',
  //this three to make it center
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  color:'#d0ecf4',
  fontSize:'15px',
  border: '2px solid black',
  borderRadius: '15px',
};
//the style for the button Sign Up
const button={
  padding:'5px',
  //this three to make it center
  display: 'block',
  marginRight: 'auto',
  marginLeft: 'auto',
  backgroundColor: '#123456',
  color: 'white',
  border: '2px solid #123456',
  marginTop:'20px',
  fontSize:'20px',
  borderRadius: '10px',
  fontFamily: 'Lobster',
};
//the page login what inside render
class SignUp extends React.Component {
  //constructor to undestand state
  constructor(){
    super();
    //all the data save before sent in state
    this.state={
      firstName:'',
      lastName: '',
      userName: '',
      password: ''
    };
  }
  //when change  ... change the
  //first name
  onWrite1 (e) {
    this.setState({
      firstName: e.target.value,
    });
  };
  //last name
  onWrite2 (e) {
    this.setState({
      lastName: e.target.value,
    });
  };
  //username
  onWrite3 (e) {
    this.setState({
      userName: e.target.value,
    });
  };
  //password
  onWrite4 (e) {
    this.setState({
      password: e.target.value,
    });
  };
  //for sign in button
  saveUser() {
    console.log(`you try to create new user:  DR.${this.state.userName}`);
    const that=this;
    //ajax request to sent the data to server then data base
    $.ajax({
      type: 'POST',
      url: '/signup',
      data: {
        firstName: `${this.state.firstName}`,
        lastName: `${this.state.lastName}`,
        userName: `${this.state.userName}`,
        password: `${this.state.password}`
      },
      //when success do this
      success: function (res) {
        //if sign up new user login him and go to home page
        if (res[0]==='W') {
          alert(res);
          console.log(res[0]);          
          window.location.href= window.location.origin+'/'
        //if sign up exist user use go to login
        }else{
          alert(res);
          console.log(res[0]); 
          window.location.href= window.location.origin+'/login' 
        }
      },
      //when error do this
      error: function (res){
        alert(`Failed sigup please try again DR.${that.state.userName}`);
        console.log(`Failed sigup please try again DR.${that.state.userName}`);
      },
    }); 
  };
  //try router
  login(){
    window.location.href= window.location.origin+'/login'
  }
  //for home button
  home(){
    window.location.href= window.location.origin+'/'
  };
  //what render -----------------need change style to be nice
  render () {
    return (
      <div>
        <h2 style={header}>Welcome To Medical Record</h2>
        <h3 style={fName}>First name: 
          <input value={this.state.firstName} onChange={this.onWrite1.bind(this)} placeholder="First name" style={input}>
          </input>
        </h3>       
        <h3 style={lName}>Last name: 
          <input value={this.state.lastName} onChange={this.onWrite2.bind(this)} placeholder="Last name" style={input}>
          </input>
        </h3>        
        <h3 style={user}>Username:
         <input value={this.state.userName} onChange={this.onWrite3.bind(this)} placeholder="Username" style={input}>
         </input>
        </h3>
        <h3 style={password}>Password:
         <input type='password' value={this.state.password} onChange={this.onWrite4.bind(this)} placeholder="Password" style={input}>
         </input>
        </h3>
        <button onClick={this.saveUser.bind(this)} style={button}>Sign Up</button>
        <h3 style={header2}>Have an account ? </h3>
        <button  onClick={this.login.bind(this)} style={button}>Login</button>
        <button  onClick={this.home.bind(this)} style={button}>Back to Home</button>
        
      </div>
    )
  }
}
//export this component to can use
export default SignUp;
