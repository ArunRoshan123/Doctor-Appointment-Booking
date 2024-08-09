import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPatient from './Components/Patient/LoginPatient'
import SignUp from './Components/Patient/SignUp'
import SignInForm from './Components/Patient/SignInForm'
import DoctorSidebar from './Components/Doctor/DoctorSidebar'
import SearchSidebar from './Components/Patient/SearchSidebar'
import HomePage from './Components/Patient/HomePage'
import AppointmentPage from './Components/Patient/AppointmentPage'
import DoctorAppointments from './Components/Doctor/DoctorAppointments'
import PatientHome from './Components/Patient/PatientHome'
import PatientProfile from './Components/Patient/PatientProfile'
import PatientAppointments from './Components/Patient/PatientAppointments'
import Transactions from './Components/Doctor/Transactions'
import FeedBacksPatient from './Components/Patient/FeedBacksPatient'
import ViewReports from './Components/Patient/ViewReports'
import BookingSuccess from './Components/Patient/BookingSuccess'
import FeedbackForm from './Components/Patient/FeedbackForm'
import TransactionsPatient from './Components/Patient/TransactionsPatient'



function App() {
  const [count, setCount] = useState(0)

  return (
  <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/patient' element={<PatientHome/>}/>
      <Route path='/login' element={<SignInForm/>}/>
      <Route path='/appointment/:docId' element={<AppointmentPage/>}/>
      <Route path='/doctor' element={<DoctorSidebar/>}/>
      <Route path='/doctor/appointment' element={<DoctorAppointments/>}/>
      <Route path='/search' element={<SearchSidebar/>}/>
      <Route path='/user/' element={<PatientProfile/>}/>
      <Route path='/patient/appointment' element={<PatientAppointments/>}/>
      <Route path='/transactions' element={<TransactionsPatient/>}/>
      <Route path='/review'  element={<FeedBacksPatient/>}/>
      <Route path='/report'element={<ViewReports/>}/>
      <Route path='/success' element={<BookingSuccess/>}/>
      <Route path='/feedbackform/:doctorid/:appointmentid' element={<FeedbackForm/>}/>
      {/* <Route path='/feedback' element={<FeedBacks/>}/> */}
    </Routes>
    </BrowserRouter>
    <ToastContainer/>
  </div>
  )
}

export default App
