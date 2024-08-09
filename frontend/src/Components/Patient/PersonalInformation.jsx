import { Checkbox, message } from "antd";
import { useEffect, useState } from "react";

const PersonalInformation = ({
  handleChange,
  selectValue,
  setPatientId = () => {},
}) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    reason,
    description,
    address,
    report,
  } = selectValue;

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  // useEffect(() =>{
  //     if(checked){
  //         if(data.id){
  //             setPatientId(data.id);
  //             message.success("User Has Found !")
  //         }else{
  //             message.error("User is not Found, Please Login!")
  //         }
  //     }
  // }, [checked, data, setPatientId])

  return (
    <form className="rounded p-3 mt-5" style={{ background: "#f8f9fa" }}>
      <div className="row">
        {/* <Checkbox checked={checked} onChange={onChange}>
                    Allready Have an Account ?
                </Checkbox> */}

        <div className="col-md-6 col-sm-12">
          <div className="form-group card-label mb-3">
            <label>First Name</label>
            <input
              onChange={(e) => handleChange(e)}
              name="firstname"
              value={firstname && firstname}
              className="form-control"
              type="text"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group card-label mb-3">
            <label>Last Name</label>
            <input
              onChange={(e) => handleChange(e)}
              name="lastname"
              value={lastname && lastname}
              className="form-control"
              type="text"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group card-label mb-3">
            <label>Email</label>
            <input
              onChange={(e) => handleChange(e)}
              name="email"
              value={email && email}
              className="form-control"
              type="email"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group card-label mb-3">
            <label>Phone</label>
            <input
              onChange={(e) => handleChange(e)}
              name="phone"
              value={phone && phone}
              className="form-control"
              type="text"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group card-label mb-3">
            <label>Reason For Visit</label>
            <textarea
              rows={8}
              onChange={(e) => handleChange(e)}
              name="reason"
              value={reason && reason}
              className="form-control"
              type="text"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group card-label mb-3">
            <label>Description</label>
            <textarea
              rows={8}
              onChange={(e) => handleChange(e)}
              name="description"
              value={description && description}
              className="form-control"
              type="text"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group card-label mb-3">
            <label>Address</label>
            <input
              onChange={(e) => handleChange(e)}
              name="address"
              value={address && address}
              className="form-control"
              type="text"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="form-group card-label mb-3">
            <label>Report</label>
            <input
              onChange={(e) => handleChange(e)}
              name="report"
              // value={address && address}
            //   value={report && report}
              className="form-control"
              type="file"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalInformation;
