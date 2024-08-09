import React, { useState } from "react";
import { FaCheck, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosApi from '../../Axios'

const SignUp = () => {
  const {handleSubmit , register} = useForm()
const [role, setRole]=useState()
  const doctorregister = async(data) =>{
    try{
      if(role==="doctor"){
     try {
      const response = await AxiosApi.post(`/doctor/register`,data);
      console.log(response)
      console.log(response.data)
      toast.success(response.data.message)
     } catch (error) {
      toast.error(error.response.data.error)
      console.log("doc reg err:", error);
     }
      }
      else if(role==="patient"){
      try {
        const response = await AxiosApi.post(`/patient/register`,data);
        console.log(response)
        toast.success(response?.data?.message)
      } catch (error) {
        console.log("pat reg err:", error);
      }
      }
    }catch(error){
      console.log(error);
      const message = error?.response?.data?.message
      toast.error(message)
    }
  }
  return (
    <div>
        {/* onSubmit={hanldeOnSubmit} */}
      <form className="sign-up-form" id="sign-up-form" onSubmit={handleSubmit(doctorregister)} >
        <h2 className="title">Sign Up</h2>
        <div className="input-field">
          <span className="fIcon">
            <FaUser />
          </span>
          <input placeholder="First Name" name="firstName" type="text" {
            ...register('firstname')
          } />
        </div>
        <div className="input-field">
          <span className="fIcon">
            <FaUser />
          </span>
          <input placeholder="Last Name" name="lastName" type="text" {
            ...register('lastname')
          }/>
        </div>
        <div className="input-field">
          <span className="fIcon">
            <FaEnvelope />
          </span>
          <input placeholder="Email" name="email" type="email" {
            ...register('email')
          }/>
        </div>
        <div className="input-field">
          <span className="fIcon">
            <FaLock />
          </span>
          <input type="password" name="password" placeholder="password" {
            ...register('password')
          }/>
        </div>
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
        {/* {error.length && <h6 className="text-danger text-center">{error}</h6>}
        {infoError && <h6 className="text-danger text-center">{infoError}</h6>} */}
        <button
          type="submit"
          className="btn btn-primary btn-block mt-2 iBtn"
        //   disabled={
        //     passwordValidation.carLength &&
        //     passwordValidation.numeric &&
        //     passwordValidation.upperLowerCase &&
        //     passwordValidation.specailChar &&
        //     emailError.emailError
        //       ? ""
        //       : true
        //   }
        >
          {/* {loading ? <Spinner animation="border" variant="info" /> : "Sign Up"} */}Sign Up
        </button>


        {/* <p className="social-text">Or Sign up with social account</p> */}
        {/* <SocialSignUp /> */}
      </form>
    </div>
  );
};

export default SignUp;
