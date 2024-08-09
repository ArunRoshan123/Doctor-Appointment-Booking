import React, { useEffect, useState } from "react";
import AxiosApi ,{url} from "../../Axios"; 

const ViewReports = () => {

const patient = JSON.parse(sessionStorage.getItem('patient'))

const [data, setdata] = useState()






const reports = async() =>{
  try{
    const response = await AxiosApi.get(`/patient/reports/${patient._id}`);
    console.log(response,'backend reports')
    console.log(response.data.report)
    setdata(response.data.report)

  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  reports()
},[])


const downloadreport = (report) =>{
  if(report){
   try{
    window.open(`${url}/sendreport/${report}`)
   }catch(error){
    console.log(error)
   }
  }else{
    console.log(error)
  }
}




  return (
    <div className="container mt-4 ">
        <div ></div>
        <h3>Reports</h3>
      <div className="accordion" id="accordionExample">
        { data && data.map((item)=>(

        <div className="accordion-item" key={item._id}>
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Report1
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
             {item.Reason}
              <div><button className="btn btn-outline-primary " onClick={()=>downloadreport(item.reports)}>Download Report</button></div>

            </div>
          </div>
        </div>
        ))}
        
      </div>
    </div>
  );
};

export default ViewReports;
