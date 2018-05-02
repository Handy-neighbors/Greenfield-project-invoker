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
        onDelete(){
           var that=this;
            $.ajax({
                type:"DELETE",
                url:"/appointments",
                data:{id:that.props.appointment.id},
                success: function(data){
                    console.log(data)
                    that.props.deleteArray(data)
                },
                error: function(err){
                    console.log(err)
                }
            })
        }
        render(){
            return(
         
          
                <tr>
                <td style={table2}>{this.props.appointment.id}</td>
                <td style={table2}>{this.props.appointment.date}</td>
                <td style={table2}>{this.props.appointment.patientName}</td>
                <td style={table2}>{this.props.appointment.situation}</td>
                <td style={table2}>{this.props.appointment.gender}</td>
                <td><button onClick={this.onDelete.bind(this)} >Delete</button></td>
               </tr>
                
                )
            }
        
    }

export default PatientsInfo