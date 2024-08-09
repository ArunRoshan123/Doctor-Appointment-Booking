// ViewSearchDoctor
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AxiosApi ,{url} from "../../Axios";
import { useNavigate } from "react-router-dom";

const ViewSearchDoctor = ({data}) => {

// const [data,setdata] = useState();
// const patient = JSON.parse(sessionStorage.getItem('patient'));

// const doctor = async() =>{
//   try{
//     const response = await AxiosApi.get(`/patient/doctors/${patient._id}`);
//     console.log(response)
//     setdata(response.data.doctors)

//   }catch(error){
//     console.log(error)
//   }
// }


// useEffect(()=>{
//   doctor()
// },[])





  return (
    <div>
      { data ? data.map((item)=>(

      <div className="container " style={{ marginTop: "70px" }} key={item._id}>
        <div className="row">
          <div className="col-4 mt-2">
            <div className="card" style={{ width: "18rem" }}>
              <img src={`${url}/doctor/${item.Avathar}`} className="card-img-top w-75 rounded-circle ms-4" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.firstname+"  "+item.lastname}</h5>
                <h4 className="card-title">{item.specilization}</h4>
                <p className="card-text">
                 {item.about}
                </p>
                <Link to={`/appointment/${item.doctor}`} className="btn btn-primary">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="col-4 mt-2">
            <div className="card" style={{ width: "18rem" }}>
              <img src="/user.png" className="card-img-top w-75" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Doctor Name</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  quas autem ut,{" "}
                </p>
                <a href="#" className="btn btn-primary">
                  Book Appointment
                </a>
              </div>
            </div>
          </div>
          <div className="col-4 mt-2">
            <div className="card" style={{ width: "18rem" }}>
              <img src="/user.png" className="card-img-top w-75" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Doctor Name</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  quas autem ut,{" "}
                </p>
                <a href="#" className="btn btn-primary">
                  Book Appointment
                </a>
              </div>
            </div>
          </div>
          <div className="col-4 mt-2">
            <div className="card" style={{ width: "18rem" }}>
              <img src="/user.png" className="card-img-top w-75" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Doctor Name</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  quas autem ut,{" "}
                </p>
                <a href="#" className="btn btn-primary">
                  Book Appointment
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      )):<div className="alert alert-danger h-50 mt-lg-5  ">No Doctors.... </div>}
    </div>
  );
};

export default ViewSearchDoctor;
