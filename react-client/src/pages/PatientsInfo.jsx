import React from'react';
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
class PatientsInfo extends React.Component{
   
        render(){
            return(
         
          
                <tr>
                <td style={table2}>{this.props.appointment.id}</td>
                <td style={table2}>{this.props.appointment.date}</td>
                <td style={table2}>{this.props.appointment.patientName}</td>
                <td style={table2}>{this.props.appointment.situation}</td>
                <td style={table2}>{this.props.appointment.gender}</td>
               </tr>
                
                )
            }
        
    }

export default PatientsInfo