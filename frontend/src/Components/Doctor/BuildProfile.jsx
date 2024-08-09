import { Form, Upload } from 'antd';
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import AxiosApi from '../../Axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const BuildProfile = () => {
  const {handleSubmit:handleSubmit3 , register:register3}= useForm();
  const [image,setimage] = useState()
  const handleimage =(e)=>setimage(e.target.files[0]);
  const doctor = JSON.parse(sessionStorage.getItem('doctor'))
  // console.log(doctor)

 const profile =async(data)=>{
  const mydata = new FormData();
  for (let[key,value] of Object.entries(data)){
    mydata.append(key,value)
  }
  mydata.append('Avathar',image)
  try{
    const response = await AxiosApi.post(`doctor/profile/${doctor._id}`,mydata);
    console.log(response)
toast.success(response?.data?.message)
  }catch(error){
    toast.error(error?.response?.data?.message)
    console.log(error)
  }
 }






  return (
    <div>
        <div className="container">
  
  <div className=" text-center mt-5 ">
    <h1>Build Profile</h1>
  </div>
  <div className="row ">
    <div className="col-lg-12 mx-auto">
      <div className="card mt-2 mx-auto p-4 bg-light">
        <div className="card-body bg-light">
          <div className="container">
            <form id="contact-form" role="form" onSubmit={handleSubmit3(profile)} encType='multipart/file'>
              <div className="controls">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="form_name">Firstname *</label>
                      <input
                        id="form_name"
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Please enter your firstname *"
                        required="required"
                        data-error="Firstname is required."
                          {
                            ...register3('firstname')
                          } />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="form_lastname">Lastname *</label>
                      <input
                        id="form_lastname"
                        type="text"
                        name="surname"
                        className="form-control"
                        placeholder="Please enter your lastname *"
                        required="required"
                        data-error="Lastname is required."
                     {
                      ...register3('lastname')
                     } />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="form_name">Qualification *</label>
                      <input
                        id="form_name"
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Please enter your Qualification *"
                        required="required"
                        data-error="Qualification is required."
                     {
                      ...register3('qualification')
                     } />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="form_lastname">Price</label>
                      <input
                        
                        type="text"
                        name="surname"
                        className="form-control"
                        placeholder="$price"
                      {
                        ...register3('price')
                      }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="form_lastname">University /Location</label>
                      <input
                        
                        type="text"
                        name="surname"
                        className="form-control"
                        placeholder="University /Locatoin *"
                      {
                        ...register3('university')
                      }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="form_need">
                        Select your Gender
                      </label>
                      <select
                        id="form_need"
                        name="need"
                        className="form-control"
                        required="required"
                        data-error="Please specify your need."{
                          ...register3('gender')
                        }
                      >
                        <option value="" selected="" disabled="">
                          --Select --
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="shemale">Shemale</option>
                        
                        
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="form_email">Email *</label>
                      <input
                        id="form_email"
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Please enter your email *"
                        required="required"
                        data-error="Valid email is required."
                        {
                          ...register3('email')
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="form_need">
                        Select your Specialization
                      </label>
                      <select
                        id="form_need"
                        name="need"
                        className="form-control"
                        required="required"
                        data-error="Please specify your need."{
                          ...register3('specilization')
                        }
                      >
                        <option value="" selected="" disabled="">
                          --Select --
                        </option> 
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Dermatologist">Dermatologist</option>

                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Ophthalmologist">Ophthalmologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Endocrinologist">Endocrinologist</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                        <option value="Pulmonologist">Pulmonologist</option>
                        <option value="Urology">Urology</option>
                        <option value="Orthopedic">Orthopedic</option>
                        <option value="Dentist">Dentist</option>
                        <option value="Others">Others</option>
                        
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="form_message">About </label>
                      <textarea
                        id="form_message"
                        name="message"
                        className="form-control"
                        placeholder="About"
                        rows={4}
                        {
                          ...register3('about')
                        }
                        
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="file">Photo</label>
                            <input type="file" name="Avathar" className=' form-control ' onChange={handleimage}/>
                           
                        </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center align-item-center ">
                  <div className="col-md-12 mt-3  d-flex justify-content-center align-item-center">
                    <button
                      type="submit"
                      className="btn btn-outline-primary btn-send  pt-2 btn-block btn-lg w-50 "
                     
                    >Build</button>
                  </div></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* /.8 */}
    </div>
    {/* /.row*/}
  </div>
</div>

    </div>
  )
}

export default BuildProfile;