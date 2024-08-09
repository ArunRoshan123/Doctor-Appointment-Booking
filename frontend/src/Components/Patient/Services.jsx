import React from 'react'

const Services = () => {
  return (
    <div>
           <section className="container" style={{marginTop: 150, marginBottom:200}}>
            <div className='mb-5 section-title text-center'>
                <h2 className='my-heading'>Services</h2>
                <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-sm-6">
                        <div className="service-img">
                            <img src="/doc1.jpg" alt="" className="img-fluid" />
                            <img src="doc4.jpg" alt="" className="img-fluid mt-4" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="service-img mt-4 mt-lg-0">
                            <img src="/doctor 5.jpg" alt="" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="service-content ps-4 mt-4 mt-lg-0">
                            <h2>Personal care <br />healthy living</h2>
                            <p className="mt-4 mb-5 text-secondary form-text">We provide best leading medicle service Nulla perferendis veniam deleniti ipsum officia dolores repellat laudantium obcaecati neque.</p>
                            {/* <Link to={'/service'} className="btn-get-started scrollto">Services</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Services