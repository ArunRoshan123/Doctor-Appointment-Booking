import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
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
  return (
    <div>
        <nav className="navbar navbar-expand-lg stickyHeader" id="header">
        <div className="container-fluid">
          <a className="navbar-brand logo me-auto" href="#">
            {" "}
            <img src="/logo.png" alt="" classNameName="img-fluid" />
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
            className="collapse navbar-collapse me-5 "
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
              <a className="nav-link" href="#">
                Doctors
              </a>
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
            <Link
              to={"/appointment"}
              className="appointment-btn scrollto text-decoration-none text-light p-2"
            >
              <span className="d-none d-md-inline">Make an</span> Appointment
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header