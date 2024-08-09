// src/FeedbackForm.js
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import AxiosApi from '../../Axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; 

import { useNavigate } from 'react-router-dom';



const FeedbackForm = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [text,settext] = useState('')
    const patient = JSON.parse(sessionStorage.getItem('patient'))
    const {doctorid} = useParams();
    const {appointmentid} = useParams();
    const Navigate = useNavigate()

    const feedback =async()=>{
       // console.log("feedback:", rating, text);
        try{
            const response = await AxiosApi.post(`/patient/feedbackform/${patient._id}/${doctorid}/${appointmentid}`,{'rating':rating,'text':text})
            console.log(response,'sent feedback');
            toast.success(response.data.message,'dydeu')
            Navigate('/patient')

        }catch(error){
            console.log(error.response,'errror')
            
            toast.error(error.response?.data.message)
        }
    }


    return (
        <div>
            <div className="container d-flex  justify-content-center text-center m-5  ">
                <div className="row">
                    
                    <div className="col-8">
                        <div className="card  ">
                        <h3 className=' p-4 '>Fedback form</h3>
                            <div className="card-body p-5">
                            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                   
                    <label key={index}>
                        {/* <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        /> */}
                        <FaStar
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                            className="star"
                            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            size={50}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                
                );
            })}
             <textarea className=' mt-3 ' cols="30" rows="8" onChange={(e)=>settext(e.target.value)}></textarea><br/>
             <button className='btn btn-outline-secondary  ' onClick={feedback}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    );
};

export default FeedbackForm;
