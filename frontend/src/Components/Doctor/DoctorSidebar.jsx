import React, { useState } from "react";
import "./DoctorSidebar.css";
import { FaHome } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import DoctorHeader from "./DoctorHeader";
import Footers from "../Patient/Footers";
import logo from "/logo.png";
import userImg from "/avatar.jpg";
import DoctorProfile from "./DoctorProfile";
import DoctorAppointments from "./DoctorAppointments";
import FeedBacks from "./FeedBacks";
import Transactions from "./Transactions";
import SendReport from "./SendReport";
// import './DoctorHeader.css';
const DoctorSidebar = () => {
  const [component, setComponent]=useState();
  const renderComponent=(comp)=>{
    setComponent(comp);
    //console.log("clicked", comp);
  }
  return (
    <div>
      <div className="header">
        <div className="header-left">
          <a href="index.html" className="logo">
            <img src={logo} alt="Logo" />
          </a>
        </div>

        <a id="toggle_btn">
          <i className="fe fe-text-align-left"></i>
        </a>

        {/* <div className="top-nav-search">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
            />
            <button className="btn" type="submit">
              <i className="fa fa-search text-dark"></i>
            </button>
          </form>
        </div> */}

        <a className="mobile_btn" id="mobile_btn">
          <i className="fa fa-bars"></i>
        </a>
        <ul className="nav user-menu">
          <li className="nav-item dropdown noti-dropdown">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <i className="fe fe-bell"></i>{" "}
              <span className="badge badge-pill">3</span>
            </a>
            <div className="dropdown-menu notifications"></div>
          </li>
          {/* <li className="nav-item dropdown has-arrow">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
            >
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src={userImg}
                  width="31"
                  alt="Ryan Taylor"
                />
              </span>
            </a>
            <div className="dropdown-menu">
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <img
                    src={userImg}
                    alt=""
                    className="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>Ryan Taylor</h6>
                  <p className="text-muted mb-0">Administrator</p>
                </div>
              </div>
              <a className="dropdown-item" href="profile.html">
                My Profile
              </a>
              <a className="dropdown-item" href="settings.html">
                Settings
              </a>
              <a className="dropdown-item" href="login.html">
                Logout
              </a>
            </div>
          </li> */}
        </ul>
      </div>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              {/* <li className="active">
                <Link to={"/doctor"}>
                  <FaHome /> <span>Home</span>
                </Link>
              </li> */}
              <li className={`${component==="appointment"?"active":""}`}>
                <Link onClick={()=>renderComponent("appointment")} >
                  <FaListUl /> <span>Appointments</span>
                </Link>
              </li>

              {/* 
                        <li>
                            <Link to={'/admin/specialites'}>
                                <FaPeopleArrows /> <span>Specialities</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/admin/doctors'}>
                                <FaUserAstronaut /> <span>Doctors</span>
                            </Link>

                        </li>
                        <li>
                            <Link to={'/admin/patients'}>
                                <FaRegUser /> <span>Patients</span>
                            </Link>

                        </li> */}
              <li className={`${component==="feedback"?"active":""}`}>
                <Link onClick={()=>renderComponent("feedback")} >
                  <FaRegStar /> <span>Reviews</span>
                </Link>
              </li>
              <li className={`${component==="transaction"?"active":""}`}>
                <Link onClick={()=>renderComponent("transaction")} >
                  <FaBriefcase />
                  <span>Transactions</span>
                </Link>
              </li>

              <li  className={`submenu ${component==="report"?"active":""}`}>
                <a href="#" onClick={()=>renderComponent("report")} >
                  <i className="fe fe-document"></i> <span>Send Reports</span>{" "}
                  <span className="menu-arrow"></span>
                </a>
                <ul style={{ display: "none" }}>
                  <li>
                    <a>Invoice Reports</a>
                  </li>
                </ul>
              </li>
              <li className="menu-title">
                <span>Pages</span>
              </li>
              <li  className={` text-white ${component==="profile"?"active":""}`}>
                <Link onClick={()=>renderComponent("profile")}>
                  <FaRegUser /> <span>Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
     
      {/*  */}
      <div style={{ minHeight: "95vh", marginLeft:"250px", marginTop:"100px", justifyContent:"center", display:"flex" }}>
        {
          component==="profile"&&<DoctorProfile/>
        }
        {
          component==="appointment"&&<DoctorAppointments/>
        }
        {
          component==="feedback"&&<FeedBacks/>
        }
        {
          component==="transaction"&&<Transactions/>
        }
        {
          component==="report"&&<SendReport/>
        }
      </div>
    </div>
  );
};

export default DoctorSidebar;
