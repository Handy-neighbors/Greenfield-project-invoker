import React from'react';
import PatientsInfo from './PatientsInfo.jsx'
const table={
    // border: '3px solid black',
    borderCollapse: 'collapse',
    borderRadius:'4px',
    padding: '3px',
    textAlign : 'center',
    fontSize:'25px',
    fontWeight:'bold',
    color:'black',
    marginRight:'10px',
    backgroundColor: '#d0ecf4',
}
class PatientList extends React.Component{
    constructor(props){
        super(props);
    }
        render(){

            return(
                <div>
                       <table  style={{width:'80%',marginLeft:'auto',marginRight: 'auto',marginTop:'20px'}}>
              <tr>
                <th style={table}>ID</th>
                <th style={table}>Date</th>
                <th style={table}>Patient Name</th> 
                <th style={table}>Situation</th>
                <th style={table}>Time</th>
            </tr>
                    {this.props.appointments.map((appointment)=><PatientsInfo appointment={appointment} deleteArray={this.props.deleteArray}/>)} 
                     </table>

                </div>
                )
            }
        
    }

export default PatientList