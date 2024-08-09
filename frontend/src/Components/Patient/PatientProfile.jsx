import { Button,  } from 'antd'


import React, { useEffect, useState } from 'react'
import BuildProfilePatient from './BuildProfilePatient';
import { useNavigate } from 'react-router-dom';
import AxiosApi,{url} from '../../Axios';



const PatientProfile = () => {
  const navigateTo=useNavigate()
  const [show, setShow]= useState(true);
  const [data,setdata] = useState();
  const patient = JSON.parse(sessionStorage.getItem('patient'))

  const profile = async() =>{
    try{
      const response = await AxiosApi.get(`/patient/profile/${patient._id}`)
      console.log(response,'myprofile')
      setdata(response.data.profile)

    }catch(error){
      console.log(error)
    }
  }
  
useEffect(()=>{
  profile()
},[])




const navigate = async() =>{
  try{
    const response = await AxiosApi.post(`/patient/logout/${patient._id}`)
    console.log(response)
    sessionStorage.removeItem('patient')
    navigateTo("/")
  }catch(error){
    console.log(error)
  }
}






  return (
   <div className="container">
   {show?((data ? 
   <div className="container"> <div className="row">
        <div className="col-6">
     <div className="card shadow-sm border-0 rounded">
    <div className="card-body p-5 ms-3">
      <img
src={`${url}/patient/${data.Avathar}`}        alt=""
        className="w-50 card-img-top rounded-circle"
      />
      <div className="p-4">
        <h5 className="mb-0">{data.firstname+ " " +data.lastname} (Age: {data.age})</h5>
        <p className="small text-muted">{data.address}</p>
        <p>Email: {data.email}</p>
        <p>
            <Button size='large' type="primary" shape="round" onClick={()=>setShow(false)}>Build Profile</Button>
        </p>
        <p>
            <Button size='large' type="secondary" shape="round" onClick={()=>navigateTo("/")}>Logout</Button>
        </p>
      </div>
    </div>
  </div></div></div></div>:
   <div className="container"> <div className="row">
        <div className="col-6">
     <div className="card shadow-sm border-0 rounded">
    <div className="card-body p-5 ms-3">
      {/* <img
src={`${url}/patient/${patient.Avathar}`}        alt=""
        className="w-50 card-img-top rounded-circle"
      /> */}
      <div className="p-4">
        <h5 className="mb-0">{patient.firstname+ " " +patient.lastname}</h5>
        <p className="small text-muted">{patient.address}</p>
        <p>
            <Button size='large' type="primary" shape="round" onClick={()=>setShow(false)}>Build Profile</Button>
        </p>
        <p>
            <Button size='large' type="secondary" shape="round" onClick={navigate}>Logout</Button>
        </p>
      </div>
    </div>
  </div></div></div></div>)):<BuildProfilePatient/>}
   </div>
  
  )
}

export default PatientProfile;