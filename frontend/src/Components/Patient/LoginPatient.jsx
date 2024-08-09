import React, { useState } from 'react'
import { Spinner, Toast } from 'react-bootstrap'
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import AxiosApi from '../../Axios';



const LoginPatient = () => {
    const [show, setShow]=useState()
    const [Role,setRole] = useState();
    const {handleSubmit:handleSubmit2 , register:register2} = useForm();
    const NavigateTo = useNavigate();

   const login =async(data)=>{
    try{
        if(Role === 'doctor'){
            const response = await AxiosApi.post(`/doctor/login`,data);
            console.log(response);
            const doctor = JSON.stringify(response.data.doctor)
            sessionStorage.setItem('doctor',doctor)
            toast.success(response.data.message);
           NavigateTo('/doctor')
        }else if(Role === 'patient'){
            const response = await AxiosApi.post(`/patient/login`,data);
            console.log(response);
            console.log("why this is not coming",response.data.patient)
            const patient = JSON.stringify(response.data.patient)
            sessionStorage.setItem('patient',patient)
            toast.success(response.data.message)
           NavigateTo('/patient')
        }

    }catch(error){
        console.log(error);
        toast.error(error.response.data.message)
    }
   }

   







  return (
    <div>
         <form className="sign-in-form" id='sign-in-form' onSubmit={handleSubmit2(login)}>
                       
                        <h2 className="title">Sign in</h2>
                        <div className="input-field d-flex align-items-center gap-2 justify-content-center">
          <div className="text-nowrap">I'M A</div>
          <select
            className="form-select w-50"
            aria-label="select"
            // onChange={(e) => handleUserTypeChange(e)}
           onChange={(e)=>setRole(e.target.value)}
          >
            <option value="">--Select--</option>

            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
                        <div className="input-field">
                            <span className="fIcon"><FaEnvelope /></span>
                            <input  placeholder="Enter Your Email" type="email" {
                                ...register2('email')
                            } />
                        </div>
                        {/* {errors.email && <span className="text-danger">This field is required</span>} */}
                        <div className="input-field">
                            <span className="fIcon"><FaLock /></span>
                            <input  type="password" placeholder="Enter Your Password" {
                                ...register2('password')
                            } />
                        </div>
                        {/* {errors.password && <span className="text-danger">This field is required</span>} */}
                        {/* {infoError && <p className="text-danger">{infoError}</p>} */}
                        {/* onClick={handleShowForgotPassword} */}
                        {/* <div  className='text-bold' style={{ cursor: "pointer", color: '#4C25F5' }}>Forgot Password ?</div> */}
                        <button className="iBtn" type="submit" value="sign In" >
                            {/* {isLoading ? : "Sign In"}  */}
                            {/* <Spinner animation="border" variant="info" /> */}
                            Submit
                        </button>
                       
                        {/* <p className="social-text">Or Sign in with social platforms</p> <SocialSignUp handleResponse={handleResponse} /> */}
                    </form>
    </div>
  )
}

export default LoginPatient