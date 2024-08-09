import React, { useEffect, useState } from 'react';
import AxiosApi, { url } from '../../Axios';

const DoctorAppointments = () => {

const [data,setdata] = useState();
const doctor = JSON.parse(sessionStorage.getItem('doctor'))

const appointment = async()=>{
  try{
    const response = await AxiosApi.get(`/doctor/appointment/${doctor._id}`)
    console.log(response,"doctor app")
    setdata(response.data.appointment)

  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  appointment()
},[])

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const [reportPath, setReportPath] = useState('');


  
const downloadReport = async(report) => {
    //  if (report) {
        // Use a download library or direct link to download the report
       
     try {
        //const response = await axios.get(`/${url}/reports/${report}`);
 window.open(`${url}/reports/${report}`, '_blank');
        // setReportPath(response.data.reportPath);
    } catch (error) {
        console.error('Error generating report:', error);
    }
  // } else {
  //       console.error('No report available');
  //   }
};



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
              <th >Name</th>
              
              <th >Appointment Date</th>
              <th>Time</th>
              <th>Contact Number</th>
              <th>Reason for visit</th>
              <th>Description </th>
              <th >Payment Status</th>
              <th>Emergency</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {
              data && data.map((item)=>(



            <tr className="" key={item._id}>
              <td >
                <div className="flex items-center text-sm">
                  <div>
                    <p className="">{item.firstname+ "" + item.lastname}</p>
                 
                  </div>
                </div>
              </td>
             
              <td className="">{formatDate(item.date)}</td>
              <td>{item.time}</td>
              <td>{item.phone}</td>
              <td>{item.reason}</td>
              <td>{item.description}</td> 
              <td>
                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                  {" "}
                  Acceptable{" "}
                </span>
              </td>
              <td>
               {item.emergency ? "Yes" : "No"}
              </td>
              <td><button onClick={()=>downloadReport(item.report)}><i class="fa-regular fa-circle-down"></i></button></td>
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

export default DoctorAppointments