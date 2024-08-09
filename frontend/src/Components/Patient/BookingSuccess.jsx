import React, { useEffect } from 'react';
import { FaBriefcase, FaCalendarAlt, FaCalendarCheck, FaLink, FaLocationArrow, FaRegClock } from 'react-icons/fa';

const BookingSuccess = () => {
  

    return (
        <>
      
            <div className="container mx-auto d-flex justify-content-center align-items-center text-center">
              

                        <div className=" p-3" style={{ marginTop: '8rem', marginBottom: '5rem', height: '60vh', background: '#f8f9fa', maxWidth: '400px' }}>
                            <div className='border-bottom my-2'>
                                <FaCalendarCheck style={{ fontSize: '2.5rem' }} className='text-success' />
                                <h6 className='py-2'>Appointment is scheduled</h6>
                                {/* <p className='text-secondary border rounded-pill form-text text-success border-success'>Check your Inbox an email with all details!</p> */}
                            </div>

                            <div className='card border-0 p-3 rounded mb-5'>
                                <div className='d-flex gap-3 mb-1'>
                                    <FaBriefcase style={{ fontSize: '1rem' }} />
                                    <p>With Doctor</p>
                                </div>
                                <div className='d-flex gap-3 mb-1'>
                                    <FaRegClock style={{ fontSize: '1rem' }} />
                                    <p>30 Min</p>
                                </div>
                                <div className='d-flex gap-3 mb-1'>
                                    <div><FaLocationArrow style={{ fontSize: '1rem' }} /></div>
                                    <p className='text-start'>Sylhet, Bangladesh<br /><span className="form-text">1020BD, Amertam, NorthEast,Srimongol</span></p>
                                </div>
                                <div className='d-flex gap-3 mb-2'>
                                    <div><FaLink style={{ fontSize: '1rem' }} /></div>
                                    <div><a href='https://meet.google.com/udx-kieq-sng' target='_blank' rel='noreferrer'>https://meet.google.com/udx-kieq-sng</a></div>
                                </div>
                                <div className='d-flex gap-3'>
                                    <div><FaCalendarAlt style={{ fontSize: '1rem' }} /> </div>
                                    <p> 13/04/2024 AT 06.00 PM</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* <div className='rounded p-3 d-flex flex-column justify-content-center align-items-center' style={{ background: "#f8f9fa",marginTop: '8rem', marginBottom: '5rem' }} >
                            
                            <h6 className='p-2 my-3'>You will be redirect to homepage !</h6>
                        </div> */}
                
            </div>
        </>

    )
}

export default BookingSuccess