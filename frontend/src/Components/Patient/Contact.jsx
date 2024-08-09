import React from 'react'
import { FaEnvelope, FaLocationArrow, FaPhoneAlt } from 'react-icons/fa'

const Contact = () => {
  return (
    <div>
        <div className="container ">
            <div className="row d-flex justify-content-center  " style={{marginTop:"100px"}}>
            <div className="col-lg-4">
                            <div className="info rounded p-3" style={{ background: '#f8f9fa' }}>
                                <div className="d-flex mb-2 gap-2">
                                    <FaLocationArrow className='icon' />
                                    <div>
                                        <h4>Location:</h4>
                                        <p>1212 My City, My State, India 456301</p>
                                    </div>
                                </div>

                                <div className="d-flex mb-2 gap-2">
                                    <FaEnvelope className='icon' />
                                    <div>
                                        <h4>Email:</h4>
                                        <p>example@example.com</p>
                                    </div>
                                </div>

                                <div className="d-flex mb-2 gap-2">
                                    <FaPhoneAlt className='icon' />
                                    <div>
                                        <h4>Call:</h4>
                                        <p>+91 0909 040404</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="container">
    {/* eslint-disable-next-line */}
    <iframe style={{ border: 0, width: "100%", height: "350px" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.717700641434!2d80.50873891488674!3d16.464311088640644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a355621c5ad09bf%3A0xe2d7b05a542e984e!2sYour%20Location!5e0!3m2!1sen!2sin!4v1646485647519" frameborder="0" allowfullscreen></iframe>
</div>

            </div>
        </div>
    </div>
  )
}

export default Contact