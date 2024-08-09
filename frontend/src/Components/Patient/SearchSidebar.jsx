import React, { useState } from 'react'
import { Slider, Button, DatePicker, Radio } from 'antd';
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import Search from 'antd/es/input/Search';
import SubHeader from './SubHeader';
import Header from './Header';
import ViewDoctors from './ViewDoctors';
import FootersPatient from './FootersPatient';
import ViewSearchDoctor from './ViewSearchDoctor';
import AxiosApi from '../../Axios';
import { toast } from "react-toastify";
// import { doctorSpecialistOptions } from '../../../constant/global';

const SearchSidebar = ({     resetFilter, query  }) => {
  const [searchTerm,setSearchTerm ]=useState();
  const [specialist,setSpecialist]=useState();
  const [sortByGender , setSorByGender ]=useState();
  const [date , setDate]=useState();
  const [data , setData]=useState()
  const handleDateChange = (_date, _dateString) => { 
   setDate(_dateString);
  }
  const [priceRange, setPriceRange]=useState();
  const doctorSpecialistArray = [
    { id: 1, value: "Cardiologist" },
    { id: 2, value: "Dermatologist" },
    { id: 3, value: "Orthopedic Surgeon", },
    { id: 4, value: "Gynecologist" },
    { id: 5, value: "Neurology" },
    { id: 6, value: "Ophthalmologist" },
    { id: 7, value: "Pediatrician" },
    { id: 8, value: "Endocrinologist" },
    { id: 9, value: "Gastroenterologist" },
    { id: 10, value: "Pulmonologist" },
    { id: 11, value: "Orthopedic" }
]

 const doctorSpecialistOptions = doctorSpecialistArray.map(data => {
    return {
        label: data.value,
        value: data.value
    }
});
  const options = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Shemale',
      value: 'shemale',
    },
  ];
  const onSelectGender = (e) => setSorByGender(e.target.value)

  const onSelectSepcialist = (e) => setSpecialist(e.target.value)

  const onRangeChange = (range) => {
    //console.log("range", range.target.value);
    const obj = {
      min: range[0],
      max: range[1]
    }
    setPriceRange(obj)
  }
  const onSearch = (value) => {
    setSearchTerm(value);
  }
  console.log(" search values: ",sortByGender , specialist , searchTerm , priceRange, date);
  const patient= JSON.parse(sessionStorage.getItem("patient"))
const handleSearch=async()=>{
  try {
    const patientId = patient?._id;
const sortByGenderParam = sortByGender !== undefined ? `&gender=${sortByGender}` : '';
const specialistParam = specialist !== undefined ? `&specilization=${specialist}` : '';
const priceRangeParam = priceRange?.min !== undefined ? `&price=${priceRange?.min}` : '';
const searchTermParam = searchTerm !== undefined ? `&name=${searchTerm}` : '';

const res= await AxiosApi.get(`/patient/filterdoctor/${patientId}?${sortByGenderParam}${specialistParam}${priceRangeParam}${searchTermParam}`)
  
    //const res= await AxiosApi.get('http://localhost:3000/patient/filterdoctor/65eee1acf54e794311af96fc?gender=male')
//  const res= await AxiosApi.get(`/patient/filterdoctor/${patient?._id}?gender=${sortByGender}&specilization=${specialist}&price=${priceRange?.min}&name=${searchTerm}`)
  console.log("search response:", res); 
  setData(res.data.doctors)
  } catch (error) {

    console.log("search error:",error);
    toast.error(error.response.data.message)
    
  }
}
  return (
  <div className='row'>
   
    <div className="col-md-12 col-lg-4 col-xl-3">

      <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
        <h5 className='text-center mb-3' style={{ color: '#05335c' }}>Doctor Filter</h5>
        <div className="mb-3">
          <Search placeholder="Search..." onSearch={onSearch} enterButton allowClear />
        </div>

        {/* <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Date </h6>
          <DatePicker
            style={{ width: "100%" }}
            format="DD-MM-YYYY"
            onChange={handleDateChange}
          />
        </div> */}

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Gender</h6>
          <div className='d-flex flex-column'>
            <Radio.Group options={options} onChange={onSelectGender} className='d-flex flex-column'/>
          </div>
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Price Range</h6>
          {/* <input type="range"min="150" max="3000" defaultValue="150" step="1" onChange={onRangeChange}/> */}
          <Slider range 
        defaultValue={[150, 3000]}
          // defaultValue={3000}
          onChange={onRangeChange} />
        </div>

        <div className='mb-3'>
          <h6 style={{ color: '#05335c' }}>Select Specialist</h6>
          <div className='d-flex flex-column'>
           
            <Radio.Group options={doctorSpecialistOptions} onChange={onSelectSepcialist} className='d-flex flex-column' />
          </div>
        </div>

        <Button className='w-100 mt-4 mb-2' type="primary" style={{backgroundColor:'#1977cc'}} shape="round" icon={<FaSearch />} size="sm" onClick={handleSearch}>Search</Button>
        {/* {
          Object.keys(query).length > 4 && <Button className='w-100 mt-4 mb-2' style={{backgroundColor:'#1977cc'}} onClick={resetFilter} type="primary" shape="round" icon={<FaRedoAlt />} size="sm">Reset</Button>
        } */}
   </div>
    </div> 
    <div className="col-md-12 col-lg-8 col-xl-9">
       {data&& <ViewSearchDoctor  data={data}/>}
      </div>
      <FootersPatient/>
    </div>
  )
}

export default SearchSidebar