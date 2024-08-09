import React, { useEffect, useState } from 'react';
import AxiosApi from '../../Axios';
import { toast } from 'react-toastify'


const SendReport = () => {

  const [data, setdata] = useState('');
  const doctor = JSON.parse(sessionStorage.getItem('doctor'));



  const [image, setimage] = useState()
  const handleimage = (e) => setimage(e.target.files[0])


  const Document = async (item, reason) => {
const formData=new FormData()
formData.append("reports", image)
formData.append('Reason', reason )
    try {
      const response = await AxiosApi.post(`/doctor/report/${doctor._id}/${item}`, formData);
      console.log("report response:", response);
      toast.success(response.data.message)

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    }
  }














  const report = async () => {
    try {
      const response = await AxiosApi.get(`/doctor/report/${doctor._id}`);
      console.log(response);
      setdata(response.data.appointment)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    report()
  }, [])


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]

  }


  return (
    <div>
      <>
        {/* component */}
        <section className="">
          <div className="container mt-3 ">
            <h3>Send Reports</h3>
            <div className="">
              <table className=" table table-borderless table-hover table-responsive table-light table-striped overflow-hidden " style={{ borderRadius: "10px", }}>
                <thead>
                  <tr className="">
                    <th >Name</th>

                    <th >Appointment Date</th>
                    <th>Time</th>
                    <th>Contact Number</th>
                    <th>Reason for visit</th>
                    <th>Description </th>
                    <th >Payment Status</th>
                    <th>Send Report</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {
                    data && data.map((item) => (

                      <tr className="" key={item._id} >
                        <td >
                          <div className="flex items-center text-sm">
                            <div>
                              <p className="">{item.firstname + " " + item.lastname}</p>

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
                        <td className=' align-content-center '>
                          <form encType='multipart/file' > <input type="file" className=' btn btn-outline-dark w-75' onChange={handleimage} /> <button className='btn btn-outline-primary  mt-1 ' type='button' onClick={() => Document(item.patient, item.reason)}>send</button></form>
                        </td>
                      </tr>
                    ))
                  }
                  {/* <tr className="text-gray-700">
              <td >
                <div className="flex items-center text-sm">
                  <div className="relative w-8 h-8 mr-3 rounded-full">
                   
                    <div
                      className="absolute inset-0 rounded-full shadow-inner"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-black">Stevens</p>
                    <p className="text-xs text-gray-600">Programmer</p>
                  </div>
                </div>
              </td>
            
              <td className="px-4 py-3 text-sm ">6/10/2020</td>
              <td>03.00 pm</td>
              <td>9876543210</td>

              <td>Reason for visit</td>
              <td>Reason for visit</td>
              <td className="px-4 py-3 text-xs ">
                <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-gray-100 rounded-sm">
                
                  Pending
                </span>
              </td>
              <td className=' align-content-center '>
              <input type="file" className=' btn btn-outline-dark w-75'  /> <button className='btn btn-outline-primary  mt-1 '>send</button>
              </td>
            </tr> */}

                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>

    </div>
  )
}

export default SendReport