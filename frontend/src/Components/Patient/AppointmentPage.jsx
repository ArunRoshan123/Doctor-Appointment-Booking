import { useEffect, useState } from "react";
import { Button, Steps, message } from "antd";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import SelectApppointment from "./SelectAppointment";
import PersonalInformation from "./PersonalInformation";
import CheckoutPage from "./CheckoutPage";
import AxiosApi from "../../Axios";
import { toast } from "react-toastify";

let initialValue = {
  paymentMethod: "",
  date: "",
  time: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  reason: "",
  description: "",
  address: "",
  emergency: false,
  name: "", // For both card and insurance
  cardnumber: "",
  expireymonth: "",
  expiryyear: "",
  cvv: "",
  insuranceName: "", // Only for insurance
  number: "",
  person: "",
  mobileNumber: "",
  expirydate: "",
  nomineename: "",
  nomineeage: "",
  totalsum: "",
  report: null,
};

const AppointmentPage = () => {
  const { docId, price } = useParams();
  const [current, setCurrent] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectTime, setSelectTime] = useState("");
  const [isCheck, setIsChecked] = useState(false);
  const [selectValue, setSelectValue] = useState(initialValue);
  const [IsDisable, setIsDisable] = useState(true);
  const [isConfirmDisable, setIsConfirmDisable] = useState(true);
  const [patientId, setPatientId] = useState("");
  const [doctor, setDoctor] = useState();
  const navigation = useNavigate();

  const getDoctorById = async (data) => {
    try {
      const response = await AxiosApi.get(`/patient/doctor/${docId}`);
      //console.log(response,'doc')
      console.log(response.data.profile, "doctor");
      setDoctor(response.data.doctor);
    } catch (error) {
      console.log("doctor errrvn,vm,n", error);
    }
  };
  useEffect(() => {
    getDoctorById();
  }, []);
  const [report, setReport] = useState();
  // const handleUploadReport=(e)=>setReport(e.target.files[0])
  const handleChange = (e) => {
    if (e.target.name == "report") {
      setReport(e.target.files[0]);
      setSelectValue({ ...selectValue, report: e.target.files[0] });
    } else {
      setSelectValue({ ...selectValue, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    setSelectValue({ ...selectValue, date: selectedDate, time: selectTime });
  }, [selectTime, selectedDate]);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    const {
      firstname,
      lastname,
      email,
      phone,
      name,
      cardnumber,
      expireymonth,
      expiryyear,
      cvv,
      reason,
    } = selectValue;
    const isInputEmpty = !firstname || !lastname || !email || !phone || !reason;
    const isConfirmInputEmpty =  !isCheck;
    setIsDisable(isInputEmpty);
    setIsConfirmDisable(isConfirmInputEmpty);
  }, [selectValue, isCheck]);
  const patient = JSON.parse(sessionStorage.getItem("patient"));
  const handleConfirmSchedule = async () => {
    try {
      const formData = new FormData();
      for (const [key,value] of Object.entries(selectValue)) {
        formData.append(key, value);
      }
      const res = await AxiosApi.post(
        `patient/bookdoctor/${patient._id}/${docId}`,
        formData
      );
      console.log("booking", res);
      toast.success("appointment confirm");
      navigation("/patient");
    } catch (error) {
      toast.error(error?.response?.data.message)
      console.log(" appointment error", error);
    }
    // const obj = {};
    // obj.patientInfo = {
    //   firstName: selectValue.firstName,
    //   lastName: selectValue.lastName,
    //   email: selectValue.email,
    //   phone: selectValue.phone,
    //   patientId: role !== '' && role === 'patient' ? data.id : undefined,
    //   scheduleDate: selectedDate,
    //   scheduleTime: selectTime,
    // obj.}
    const payment = {
      paymentMethod: selectValue.paymentMethod,
      cardNumber: selectValue.cardnumber,
      cardExpiredYear: selectValue.expiryyear,
      cvv: selectValue.cvv,
      expiredMonth: selectValue.expireymonth,
      nameOnCard: selectValue.nameOnCard,
    };
    //navigation("/success")
  };

  //   useEffect(() => {
  //     if (isSuccess) {
  //         message.success("Succcessfully Appointment Scheduled")
  //         setSelectValue(initialValue);
  //         dispatch(addInvoice({ ...appointmentData }))
  //         navigation(`/booking/success/${appointmentData?.id}`)
  //     }
  //     if (isError) {
  //         message.error(error?.data?.message);
  //     }
  // }, [isSuccess, isError, isLoading, appointmentData])

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD HH:mm:ss"));
  };

  const steps = [
    {
      title: "Select Appointment Date & Time",
      content: (
        <SelectApppointment
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          selectTime={selectTime}
          setSelectTime={setSelectTime}
        />
      ),
    },
    {
      title: "Patient Information",
      content: (
        <PersonalInformation
          handleChange={handleChange}
          selectValue={selectValue}
          setPatientId={setPatientId}
        />
      ),
    },
    {
      title: "Payment",
      content: (
        <CheckoutPage
          handleChange={handleChange}
          selectValue={selectValue}
          isCheck={isCheck}
          setIsChecked={setIsChecked}
          data={false}
          selectedDate={selectedDate}
          selectTime={selectTime}
          doctorId={docId}
          doctor={doctor}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  console.log(selectValue, " all values");
  return (
    <>
      <div className="container" style={{ marginTop: "8rem", bottom: "5rem" }}>
        <div
          className="container"
          style={{ marginBottom: "12rem", marginTop: "8rem" }}
        >
          <Steps current={current} items={items} />
          <div className="mb-5 mt-3 mx-3">{steps[current].content}</div>
          <div className="text-end mx-3">
            {current < steps.length - 1 && (
              <Button
                type="primary"
                size="large"
                disabled={
                  current === 0
                    ? selectTime
                      ? false
                      : true
                    : IsDisable || !selectTime
                }
                onClick={() => next()}
              >
                Next
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button
                type="primary"
                size="large"
                disabled={isConfirmDisable}
                onClick={handleConfirmSchedule}
              >
                Confirm
              </Button>
            )}
            {current > 0 && (
              <Button
                style={{ margin: "0 8px" }}
                size="large"
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentPage;

// appoint
// date, time, firstname, lastname, email, phone, reason, description,
// address, emergency, paymentMethod, name, cardnumber, expireymonth,insuranceName,
// expiryyear, cvv, totalsum, number, person, mobileNumber, expirydate, nomineename, nomineeage
