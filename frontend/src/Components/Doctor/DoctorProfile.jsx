import { Button,  } from 'antd'


import React, { useEffect, useState } from 'react'
import BuildProfile from './BuildProfile';
import { useNavigate } from 'react-router-dom';
import AxiosApi ,{url} from '../../Axios';
import axios from 'axios';

const DoctorProfile = () => {
  const [show, setShow]= useState(true);
const navigateTo= useNavigate()
const doctor = JSON.parse(sessionStorage.getItem('doctor'))

const [data,setdata] = useState('');


const profile = async()=>{
  try{
   const response = await AxiosApi.get(`/doctor/profile/${doctor._id}`)
   console.log(response,'jhgfuyfuy');
   setdata(response.data.profile)
  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  profile()
},[])


const logout = async() =>{
  try{
    const res = await AxiosApi.post(`/doctor/logout/${doctor._id}`)
    console.log(res,'logout')
    sessionStorage.removeItem("doctor")
    navigateTo('/')
  }catch(error){
    console.log(error)
  }
}


  return (
   <div className="container">
   
   {show&&data?((<div className="container"> <div className="row">
        <div className="col-6">
     <div className="card shadow-sm border-0 rounded">
    <div className="card-body p-5 ms-3">
      <img
src={`${url}/doctor/${data.Avathar}`}        alt=""
        className="w-50 card-img-top rounded-circle"
      />
      <div className="p-4">
        <h5 className="mb-0">{data.firstname + " " + data.lastname}</h5>
        <p className="small text-muted">Doctor -{data.specilization}</p>
        <p>
            <Button size='large' type="primary" shape="round" onClick={()=>setShow(false)}>Build Profile</Button>
        </p>
        <p>
            <Button size='large' type="secondary" shape="round" onClick={logout}>Logout</Button>
        </p>
      </div>
    </div>
  </div></div></div></div>)):<BuildProfile/>}
   </div>
  
  )
}

export default DoctorProfile;