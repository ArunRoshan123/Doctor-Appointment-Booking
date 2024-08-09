import React, { useEffect, useState } from 'react'
import AxiosApi from '../../Axios';
import {Link} from 'react-router-dom';

const FeedbacksPatient = () => {
  const [data,setdata] = useState();
  const patient = JSON.parse(sessionStorage.getItem('patient'))
  const appointment = async() =>{
    try{
      const response = await AxiosApi.get(`/patient/lastappointment/${patient._id}`);
      console.log(response,'my appointment')
      setdata(response.data.lastAppointment);
      

    }catch(error){
      console.log(error)
    }
  }

useEffect(()=>{
  appointment()
},[])

const dateformate = (date) =>{
  const dates = new Date(date)
  return dates.toISOString().split('T')[0];
}

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
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {
              data && data.map((item)=>(

            <tr className="" key={item._id}>
             
              <td >
                <div className="flex items-center text-sm">
                  <div>
                    <p className="">{item?.doctors[0]?.firstname+" "+item?.doctors[0]?.lastname}</p>
                    
                  </div>
                </div>
              </td>
             
              <td className="">{dateformate(item.date)}</td>
              <td>{item.time}</td>
              <td>{item.phone}</td>
              <td>{item.reason}</td>
              <td>{item.description}</td> 
              <td>
                {item?.doctors[0]?.email}
              </td>
              <td>
                <Link to={`/feedbackform/${item.doctor}/${item._id}`}>Give Feedback</Link>
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

export default FeedbacksPatient