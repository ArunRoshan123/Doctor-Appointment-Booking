import React, { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaAngleDoubleRight, FaBars, FaCheckDouble, FaClock, FaHeadset, FaHouseUser } from "react-icons/fa";
import "./headers.css";
import HeroSection from "./HeroSection";
import Gallery from "./Gallery";
import Contact from "./Contact";

import Footers from "./Footers";
import Services from "./Services";
import ViewDoctors from "./ViewDoctors";
const HomePage = () => {
  const serviceRef = useRef(null);
  const doctorsRef = useRef(null);
const navigateTo=useNavigate()
  const scrollToService = () => {
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToDoctors = () => {
    if (doctorsRef.current) {
      doctorsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [showContact, setShowContact] = useState(false); // State to control the visibility of the Contact component

  const toggleContact = () => {
    setShowContact(!showContact); // Toggle the state to show/hide Contact component
  };

  return (
    <div>
      {/* ${!show && "stickyHeader"} */}
      {/* <header id="header" className={`fixed-top`}>
            
                <div className="container d-flex align-items-center">

                    <Link to={'/'} className="logo me-auto">
                        <img src="/logo.png" alt="" className="img-fluid" />
                    </Link>

                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li><NavLink to={'/'} className="nav-link scrollto active" >Home</NavLink></li>
                            <li><NavLink to={'/about'} className="nav-link scrollto active">About</NavLink></li>
                            <li><NavLink to={'/service'} className="nav-link scrollto active">Service</NavLink></li>
                            <li><NavLink to={'/doctors'} className="nav-link scrollto active">Doctors</NavLink></li>
                            <li><NavLink to={'/contact'} className="nav-link scrollto active">Contact</NavLink></li>
                            <li><NavLink to={'/blog'} className="nav-link scrollto active">Blog</NavLink></li>
                            <li><Link to={'/login'} className="nav-link scrollto">Login</Link></li>
                        </ul>
                       
                        <FaBars className='mobile-nav-toggle' />
                    </nav>

                    <Link to={'/appointment'} className="appointment-btn scrollto"><span className="d-none d-md-inline">Make an</span> Appointment</Link>
                </div>
            </header> */}
      <nav className="navbar navbar-expand-lg stickyHeader fixed-top " id="header">
        <div className="container-fluid">
          <a className="navbar-brand logo me-auto" href="#">
            {" "}
            <img src="/logo.png" alt="" className="img-fluid" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
             className="collapse navbar-collapse"
             
             id="navbarNavAltMarkup"
          >
            <div className="navbar-nav ms-auto ">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
              {/* <a className="nav-link" href="#">
                About
              </a> */}
              <a className="nav-link" href="#" onClick={scrollToService}>
                Service
              </a>
              {/* <a className="nav-link" href="#" onClick={scrollToDoctors}>
                Doctors
              </a> */}
              <Link  className="nav-link"  onClick={toggleContact}>
                Contact
              </Link >
              {/* <a className="nav-link" href="#">
                Blog
              </a> */}
              <Link className="nav-link" to={`/login`}>
                Login
              </Link>
            </div>
            {/* <Link
              to={"/appointment"}
              className="appointment-btn scrollto text-decoration-none text-light p-2"
            >
              <span className="d-none d-md-inline">Make an</span> Appointment
            </Link> */}
          </div>
        </div>
      </nav>
      {/* contact us */}
      {
        showContact&&<Contact/>
      }
      {/* hero section */}
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div>
            <small>TOTAL HEALTH CARE SOLUTION</small>
            <h1>
              Your Most Trusted <br />
              Health Partner
            </h1>
            <small>
              A repudiandae ipsam labore ipsa voluptatum quidem quae laudantium
              quisquam aperiam maiores sunt fugit, deserunt rem suscipit
              placeat.
            </small>
          </div>
          <div className="d-flex justify-content-start gap-2">
            <Link
              to={"/login"}
              className="btn-get-started scrollto text-decoration-none "
            >
              Get Started
            </Link>
            {/* <Link
              to={"/track-appointment"}
              className="btn-get-started scrollto text-decoration-none"
            >
              Track Appointment
            </Link> */}
          </div>
        </div>
      </section>
{/* why us */}
      <section id="why-us" className="why-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="content">
                <h3 >Why Choose Us?</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Duis aute irure dolor in reprehenderit Asperiores dolores sed
                  et. Tenetur quia eos. Autem tempore quibusdam vel
                  necessitatibus optio ad corporis.
                </p>
                <div className="text-center">
                  <Link href="/" className="more-btn text-decoration-none ">
                    Learn More <i className="bx bx-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="icon-boxes d-flex flex-column justify-content-center">
                <div className="row">
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <FaHouseUser className="icon" />
                      <h4>Appointment</h4>
                      <small className="text-secondary">24 Hours Service</small>
                      <p>
                        Consequuntur sunt aut quasi enim aliquam quae harum
                        pariatur laboris nisi ut aliquip
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <FaHeadset className="icon" />
                      <h4>Emegency Cases</h4>
                      <h6 className="text-secondary">+91 98765 040425</h6>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Qui facilis perferendis quia maxime. Laborum
                        excepturi pariatur laboriosam nihil, dolor molestias.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <FaClock className="icon" />
                      <h4>Working Hours</h4>
                      <small className="text-secondary">Timing schedule</small>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between text-nowrap">
                          <p>Sun - Wed : </p> <p>8:00 - 17: 00</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between text-nowrap">
                          <p>Thus - Fri : </p> <p>9:00 - 17: 00</p>
                        </li>
                        <li className="list-group-item d-flex justify-content-between text-nowrap">
                          <p>Sat - Sun : </p> <p>10:00 - 17: 00</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
      {/* Services */}
      <div ref={serviceRef}>

   <Services/>
      </div>
      {/* <div>
      <h2 className='my-heading bg-light ' ref={doctorsRef} >Our Doctors</h2>
        <ViewDoctors/>
      </div> */}
        {/* Speciallities */}
        <section className="section section-specialities position-relative">
			<div className="container-fluid">
				<div className='mb-5 section-title text-center'>
					<h2 className='my-heading'>Clinic and Specialities</h2>
					<p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
				</div>

				<div className="row justify-content-center">
					<div className="col-md-9">
						<div className="specialities-slider slider d-flex justify-content-center align-items-center gap-5">
							<div className="speicality-item text-center">
								<div className="speicality-img">
									<img src="/specialities-01.png" className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Urology</p>
							</div>
							<div className="speicality-item text-center">
								<div className="speicality-img">
									<img src="/specialities-02.png" className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Neurology</p>
							</div>
							<div className="speicality-item text-center">
								<div className="speicality-img">
									<img src="/specialities-03.png" className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Orthopedic</p>
							</div>
							<div className="speicality-item text-center">
								<div className="speicality-img">
									<img src="/specialities-04.png" className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Cardiologist</p>
							</div>
							<div className="speicality-item text-center">
								<div className="speicality-img">
									<img src="/specialities-05.png" className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Dentist</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    <Gallery/>
  
    <Footers/>
    </div>
  );
};

export default HomePage;
