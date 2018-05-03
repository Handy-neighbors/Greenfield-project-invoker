import React from'react';
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
                <td style={table2}>{this.props.appointment.time}</td>
                <td><button className="btn btn-danger" onClick={this.onDelete.bind(this)} >Delete</button></td>
               </tr>
                
                )
            }
        
    }

export default PatientsInfo