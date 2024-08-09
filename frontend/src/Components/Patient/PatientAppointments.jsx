import React, { useEffect, useState } from 'react'
import AxiosApi from '../../Axios'

const PatientAppointments = () => {
  const [data,setdata] = useState();
  const patient = JSON.parse(sessionStorage.getItem('patient'))
  const appointment = async() =>{
    try{
      const response = await AxiosApi.get(`/patient/myappointment/${patient._id}`);
      console.log(response,'my appointment')
      setdata(response.data.appointment)

    }catch(error){
      console.log(error)
    }
  }

useEffect(()=>{
  appointment()
},[])



  return (
    <div>
        <>
  {/* component */}
  <section className="">
    <div className="container mt-3 ">
      <h3>Appointments</h3>
      <div className="">
        <table className=" table table-borderless table-hover table-responsive table-light table-striped overflow-hidden " style={{borderRadius:"10px",}}>
          <thead>
            <tr className="">
              <th >Doctor Name</th>
              
              <th >Appointment Date</th>
              <th>Time</th>
              <th>Contact Number</th>
              <th>Reason for visit</th>
              <th>Description </th>
              <th >Email</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody className="bg-white">
            {
              data && data.map((item)=>(

            <tr className="" key={item._id}>
             
              <td >
                <div className="flex items-center text-sm">
                  <div>
                    <p className="">{item.doctor.firstname+" "+item.doctor.lastname}</p>
                    
                  </div>
                </div>
              </td>
             
              <td className="">{item.date}</td>
              <td>{item.time}</td>
              <td>{item.phone}</td>
              <td>{item.reason}</td>
              <td>{item.description}</td> 
              <td>
                {item.doctor.email}
              </td>
              
            </tr>
              ))
            }
            
         
          </tbody>
        </table>
      </div>
    </div>
  </section>
</>

    </div>
  )
}

export default PatientAppointments