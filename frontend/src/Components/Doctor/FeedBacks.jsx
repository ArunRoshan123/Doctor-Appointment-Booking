import React, { useEffect, useState } from 'react'
import AxiosApi from '../../Axios';
import {Link} from 'react-router-dom';
import { Rate } from 'antd';

const Feedbacks = () => {
  const [data,setdata] = useState();
  const doctor = JSON.parse(sessionStorage.getItem('doctor'))
  const appointment = async() =>{
    try{
      const response = await AxiosApi.get(`/doctor/feedbacks/${doctor._id}`);
      console.log(response,'my feedback')
      setdata(response.data.feedbacks)

    }catch(error){
      console.log(error)
    }
  }

useEffect(()=>{
  appointment()
},[])

const formatedate = (datestring)=>{
  const date =  new Date(datestring);
  return date.toISOString().split('T')[0]

}

  return (
    <div>
        <>
  {/* component */}
  <section className="">
    <div className="container mt-3 ">
      <h3>Patient Feedbacks</h3>
      <div className="">
        <table className=" table table-borderless table-hover table-responsive table-light table-striped overflow-hidden " style={{borderRadius:"10px",}}>
          <thead>
            <tr className="">
              <th >Patient Name</th>
              
              <th >Appointment Date</th>
              <th>Time</th>
              <th>Contact Number</th>
              <th>Reason for visit</th>
              <th>Description </th>
              <th >Email</th>
              <th>Rating</th>
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
                    <p className="">{item.Doctors[0]?.firstname+" "+item.Doctors[0]?.lastname}</p>
                    
                  </div>
                </div>
              </td>
             
              <td className="">{formatedate(item.details[0]?.date)}</td>
              <td>{item.details[0]?.time}</td>
              <td>{item.details[0]?.phone}</td>
              <td>{item.details[0]?.reason}</td>
              <td>{item.details[0]?.description}</td> 
              <td>
                {item.details[0]?.email}
              </td>
              <td className='w-25 '>
              <Rate disabled defaultValue={item.rating} />
           
              </td>
              <td>{item.text}</td>
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

export default Feedbacks