import React ,{useState,useEffect} from 'react'
import AxiosApi from '../../Axios';

const TransactionsPatient = () => {
  const [data,setdata] = useState();
const doctor = JSON.parse(sessionStorage.getItem('patient'))

const appointment = async()=>{
  try{
    const response = await AxiosApi.get(`/patient/transaction/${doctor._id}`)
    console.log(response,"amount")
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
      <h3>Transactions</h3>
      <div className="">
        <table className=" table table-borderless table-hover table-responsive table-light table-striped overflow-hidden " style={{borderRadius:"10px",}}>
          <thead>
            <tr className="">
              <th >Name</th>
              
              <th >Appointment Date</th>
              <th>Time</th>
              <th>Contact Number</th>
              <th>Paid Through</th>
              <th>Amount </th>
              <th >Payment Status</th>
              
            </tr>
          </thead>
          <tbody className="bg-white">
            { 
              data && data.map((item)=>(

            <tr className="" key={item._id}>
              <td >
                <div className="flex items-center text-sm">
                  <div>
                    <p className="">{item.firstname+ " " + item.lastname}</p>
                  </div>
                </div>
              </td>
             
              <td className="">{item.date}</td>
              <td>{item.time}</td>
              <td>{item.phone}</td>
              <td>{item.paymentmethod}</td>
              <td>{item.amount}</td> 
              <td>
                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                  {" "}
                  Successfull
                </span>
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

export default TransactionsPatient