import { Form, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import AxiosApi from "../../Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const BuildProfilePatient = () => {
  const { handleSubmit: handleSubmit6, register: register6 } = useForm();
  const patient = JSON.parse(sessionStorage.getItem("patient"));
  const [image, setimage] = useState();
  const handleimage = (e) => setimage(e.target.files[0]);

  const profile = async (data) => {
    const mydata = new FormData();
    for (let [key, value] of Object.entries(data)) {
      mydata.append(key, value);
    }
    mydata.append("Avathar", image);
    try {
      const response = await AxiosApi.post(
        `/patient/profile/${patient._id}`,
        mydata
      );
      console.log(response);
      toast.success("profile build success");
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
    }
  };
const [insurance, setInsurance]=useState(false);
const handleInsuranceChange = () => {
  setInsurance(prevInsurance => !prevInsurance);
};
  return (
    <div>
      <div className="container">
        <div className=" text-center mt-5 ">
          <h1>Build Profile</h1>
        </div>
        <div className="row ">
          <div className="col-lg-12 mx-auto">
            <div className="card mt-2 mx-auto p-4 bg-light">
              <div className="card-body bg-light">
                <div className="container">
                  <form
                    id="contact-form"
                    role="form"
                    onSubmit={handleSubmit6(profile)}
                    encType="multipart/file"
                  >
                    <div className="controls">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="form_name">Firstname *</label>
                            <input
                              id="form_name"
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Please enter your firstname *"
                              required="required"
                              data-error="Firstname is required."
                              {...register6("firstname")}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="form_lastname">Lastname *</label>
                            <input
                              id="form_lastname"
                              type="text"
                              name="surname"
                              className="form-control"
                              placeholder="Please enter your lastname *"
                              required="required"
                              data-error="Lastname is required."
                              {...register6("lastname")}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="form_email">Email *</label>
                            <input
                              id="form_email"
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Please enter your email *"
                              required="required"
                              data-error="Valid email is required."
                              {...register6("email")}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="form_need">Age</label>
                            <input
                              type="text"
                              className="form-control"
                              {...register6("age")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="form_message">Address </label>
                            <textarea
                              id="form_message"
                              name="message"
                              className="form-control"
                              placeholder="Address"
                              rows={4}
                              {...register6("address")}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="file">Photo</label>
                              <input
                                type="file"
                                name="Avathar"
                                className=" form-control "
                                onChange={handleimage}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 ">
                          <label >
                            Do you have Insurance <input checked={insurance} type="checkbox" {...register6("insurance")} onChange={handleInsuranceChange} />
                          </label>
                        </div>
                      </div>
                     {insurance&&( <div className="row">
                        <div className="col-md-6">
                          <div className="form-group card-label mb-3">
                            <label htmlFor="card_name">
                              Name of Insuarance Company
                            </label>
                            <select
                              name="insuranceName"
                              className="form-select"
                              {...register6("insuranceName")}
                            >
                              <option value="HDFC ERGO General Insurance">
                                HDFC ERGO General Insurance
                              </option>
                              <option value="SBI General Insurance">
                                SBI General Insurance
                              </option>
                              <option value="ICICI Lombard General Insurance">
                                ICICI Lombard General Insurance
                              </option>
                              <option value="Relience General Insurance">
                                Relience General Insurance
                              </option>
                              <option value="Aditya Birla Health Insurance">
                                Aditya Birla Health Insurance
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group card-label mb-3">
                            <label htmlFor="card_number">
                              Insurance Number
                            </label>
                            <input
                              className="form-control"
                              placeholder="1234  5678  9876  5432"
                              type="number"
                              name="number"
                              {...register6("number")}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group card-label mb-3">
                            <label>Name of Insured Person</label>
                            <input className="form-control" name="person"  {...register6("person")}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group card-label mb-3">
                            <label>Mobile Number</label>
                            <input
                              className="form-control"
                              placeholder="9876xxxxxx"
                              type="number"
                              name="mobileNumber"
                              {...register6("mobileNumber")}
                            />
                          </div>
                        </div>
                  

                        <div className="col-md-6">
                          <div className="form-group card-label mb-3">
                            <label>Expiry Date</label>
                            <input
                              className="form-control"
                              type="text"
                              name="expirydate"
                              {...register6("expirydate")}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group card-label mb-3">
                            <label>Nominee Name</label>
                            <input
                              className="form-control"
                              type="text"
                              name="nomineename"
                              {...register6("nomineename")}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group card-label mb-3">
                            <label>Nominee Age</label>
                            <input
                              className="form-control"
                              type="number"
                              name="nomineeage"
                              {...register6("nomineeage")}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group card-label mb-3">
                            <label> Total Sum Insured</label>
                            <input
                              className="form-control"
                              type="text"
                              name="totalsum"
                              {...register6("totalsum")}
                            />
                          </div>
                        </div>
                      </div>)}
                      {/* 
                      insuranceName: "", // Only for insurance
  number: "",
  person: "",
  mobileNumber: "",
  expirydate: "",
  nomineename: "",
  nomineeage: "",
  totalsum: "", */}
                      <div className="row d-flex justify-content-center align-item-center ">
                        <div className="col-md-12 mt-3  d-flex justify-content-center align-item-center">
                          <button
                            type="submit"
                            className="btn btn-outline-primary btn-send  pt-2 btn-block btn-lg w-50 "
                          >
                            Build
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* /.8 */}
          </div>
          {/* /.row*/}
        </div>
      </div>
    </div>
  );
};

export default BuildProfilePatient;
