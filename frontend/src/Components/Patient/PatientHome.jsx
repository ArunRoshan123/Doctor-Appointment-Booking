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
import FootersPatient from "./FootersPatient";
import PatientProfile from "./PatientProfile";
import AppointmentPage from "./AppointmentPage";
import DoctorAppointments from "../Doctor/DoctorAppointments";
import PatientAppointments from "./PatientAppointments";
const PatientHome = () => {
  const serviceRef = useRef(null);
const navigateTo=useNavigate()
  const scrollToService = () => {
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [showContact, setShowContact] = useState(false); // State to control the visibility of the Contact component

  const toggleContact = () => {
    setShowContact(!showContact); // Toggle the state to show/hide Contact component
  };
  const [component, setComponent]=useState("doctors");
  const renderComponent=(comp)=>{
    setComponent(comp);
    console.log("clicked", comp);
  }
  return (
    <div>
     
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
              <Link className="nav-link active" aria-current="page" to={'/patient'}>
                Home
              </Link>
              {/* <a className="nav-link" href="#">
                About
              </a> */}
              {/* <a className="nav-link" href="#" onClick={scrollToService}>
                Service
              </a> */}
              <a className="nav-link" href="#" onClick={()=>renderComponent("doctors")}>
                Doctors
              </a>
              <Link  className="nav-link"  
              to={'/search'}
              // onClick={()=>renderComponent("appointments")}
              >
              Search Doctor
              </Link >
              <a className="nav-link" href="#" onClick={()=>renderComponent("view")}>
                My Appointments
              </a>
              <Link className="nav-link" onClick={()=>renderComponent("profile")}>
             My Profile
              </Link>
            </div>
           
          </div>
        </div>
      </nav> 
      <div className="p-home "  style={{marginTop:"75px"}}> 
        {
         component==="profile"&&<PatientProfile/>
        }
        {
          component==="doctors"&& <ViewDoctors/>
        }
        {
          component==="appointments"&&<AppointmentPage/>
        }
        {
          component==="view"&&<PatientAppointments/>
        }
          <FootersPatient/>
      </div>
    
  
    </div>
  );
};

export default PatientHome;
