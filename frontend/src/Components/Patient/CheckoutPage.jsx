import moment from 'moment';
import img from '/doctor 3.jpg';
import { Link } from 'react-router-dom';
import { url } from '../../Axios';


const CheckoutPage = ({ handleChange, selectValue, isCheck, setIsChecked, selectedDate, selectTime, price, doctor }) => {
    const {
        date,
        time,
        firstname,
        lastname,
        email,
        phone,
        reason,
        description,
        address,
        name, // For both card and insurance
        cardnumber,
        expireymonth,
        expiryyear,
        cvv,
        insuranceName, // Only for insurance
        number,
        person,
        mobileNumber,
        expirydate,
        nomineename,
        nomineeage,
        totalsum, paymentMethod, emergency } = selectValue;
    const handleCheck = () => {
        setIsChecked(!isCheck)
    }
const data= doctor;
    let amount = data?.price ? data.price : 60;

    const vat = (15 / 100) * (Number(price))
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-7" >
                    <div className="rounded p-3" style={{ background: "#f8f9fa" }}>

                        <div className='row'>
                            <div className="col-md-4 mb-2" style={{ minHeight: "100px" }}>
                                <label className="payment-radio credit-card-option">
                                    <input type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        onChange={(e) => handleChange(e)}
                                        checked={paymentMethod === 'card'}
                                    />
                                    <span className="ms-2"></span>
                                     Card
                                </label>
                            </div>
                            <div className="col-md-4 mb-2">
                                <label className="payment-radio credit-card-option">
                                    <input type="radio"
                                        name="paymentMethod"
                                        value="insurance"
                                        onChange={(e) => handleChange(e)}
                                        checked={paymentMethod === 'insurance'}
                                    />
                                    <span className="ms-2"></span>
                                    Insurance Card
                                </label>
                            </div>
                            <div className="col-md-4 mb-2">
                                {/* <label className="payment-radio credit-card-option">
                                    <input type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        onChange={(e) => handleChange(e)}
                                        checked={paymentMethod === 'cash'}
                                    />
                                    <span className="ms-2"></span>
                                    Cash
                                </label> */}
                            </div>
                            <div className="col-md-12 p-3">
                                <label className=' form-check-label '>Emergency Case </label> <input type="checkbox" name="emergency"
                                    value={!emergency}
                                    onChange={(e) => handleChange(e)} />
                                {emergency === "true" && <div className="alert alert-danger ">Don't Miss use this facility, click only if required </div>}
                            </div>
                            {paymentMethod === 'card' && (<div className='row' >
                                <div className="col-md-6">
                                    <div className="form-group card-label mb-3">
                                        <label htmlFor="card_name">Name on Card</label>
                                        <input className="form-control" id="card_name" type="text" onChange={(e) => handleChange(e)} name='name' value={name&&name} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group card-label mb-3">
                                        <label htmlFor="card_number">Card Number</label>
                                        <input className="form-control" id="card_number" placeholder="1234  5678  9876  5432" type="number" onChange={(e) => handleChange(e)} name='cardnumber' value={cardnumber&&cardnumber} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group card-label mb-3">
                                        <label htmlFor="expiry_month">Expiry Month</label>
                                        <input className="form-control" id="expiry_month" placeholder="MM" type="number" onChange={(e) => handleChange(e)} name='expireymonth'  value={expireymonth&&expireymonth}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group card-label mb-3">
                                        <label htmlFor="expiry_year">Expiry Year</label>
                                        <input className="form-control" id="expiry_year" placeholder="YY" type="number" onChange={(e) => handleChange(e)} name='expiryyear'  value={expiryyear&& expiryyear}/>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group card-label mb-3">
                                        <label >CVV</label>
                                        <input className="form-control" id="cvv" type="number" onChange={(e) => handleChange(e)} name='cvv' value={cvv&&cvv}/>
                                    </div>
                                </div>
                            </div>)}
                            {paymentMethod === 'insurance' && (<div className='row'>
                                <div className="col-md-6">
                                    <div className="form-group card-label mb-3">
                                        <label htmlFor="card_name">Name of Insuarance Company</label>
                                        <select name="insuranceName" className='form-select' onChange={(e) => handleChange(e)} value={insuranceName&&insuranceName} >
                                            <option value="HDFC ERGO General Insurance">HDFC ERGO General Insurance</option>
                                            <option value="SBI General Insurance">SBI General Insurance</option>
                                            <option value="ICICI Lombard General Insurance">ICICI Lombard General Insurance</option>
                                            <option value="Relience General Insurance">
                                                Relience General Insurance
                                            </option>
                                            <option value="Aditya Birla Health Insurance">Aditya Birla Health Insurance</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group card-label mb-3">
                                        <label htmlFor="card_number">Insurance Number</label>
                                        <input className="form-control"  placeholder="1234  5678  9876  5432" type="number" onChange={(e) => handleChange(e)} name='number' value={number&&number} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group card-label mb-3">
                                        <label >Name of Insured Person</label>
                                        <input className="form-control" name='person' onChange={handleChange} value={person&&person}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group card-label mb-3">
                                        <label >Mobile Number</label>
                                        <input className="form-control" placeholder="YY" type="number" onChange={(e) => handleChange(e)} name='mobileNumber' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group card-label mb-3">
                                        <label >Email</label>
                                        <input className="form-control" type="email"  onChange={(e)=>handleChange(e)}  name='email' />
                                    </div>

                                </div>

                                <div className="col-md-6">
                                    <div className="form-group card-label mb-3">
                                        <label >Expiry Date</label>
                                        <input className="form-control" type="text"  onChange={(e)=>handleChange(e)} value={expirydate&&expirydate} name='expirydate'/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group card-label mb-3">
                                        <label >Nominee Name</label>
                                        <input className="form-control" type="text"   onChange={(e)=>handleChange(e)} value={nomineename&&nomineename} name='nomineename'/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group card-label mb-3">
                                    <label >Nominee Age</label>
                                    <input className="form-control" type="number" onChange={(e)=>handleChange(e)}  value={nomineeage && nomineeage} name='nomineeage' />
                                </div>
                            </div>

                                <div className="col-md-6">
                                    <div className="form-group card-label mb-3">
                                        <label >  Total Sum Insured</label>
                                        <input className="form-control" type="text"   onChange={(e)=>handleChange(e)} value={totalsum&&totalsum} name='totalsum'/>
                                    </div>
                                </div>
                            </div>)}
                        </div>

                        {/* <div className="d-flex gap-2 mt-3 mb-3">
                            <div>
                                <input type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    onChange={(e) => handleChange(e)}
                                    checked={paymentMethod === 'paypal'}
                                />
                                <span className="checkmark ms-3"></span>
                                Paypal
                            </div>
                            <div>
                                <input type="radio"
                                    name="paymentMethod"
                                    value="payoneer"
                                    onChange={(e) => handleChange(e)}
                                    checked={paymentMethod === 'payoneer'}
                                />
                                <span className="checkmark ms-3"></span>
                                Payoneer
                            </div>
                        </div> */}
                        <div className="terms-accept">
                            <div className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="terms_accept" className='me-2'
                                    checked={isCheck}
                                    onChange={handleCheck} />
                                <label htmlFor="terms_accept"> I have read and accept <a className='text-primary' style={{ cursor: 'pointer', textDecoration: 'none' }}>Terms &amp; Conditions</a></label>
                            </div>
                        </div>
                    </div>
                </div>
 
                <div className="col-md-5 col-sm-12">
                    <div className="rounded p-3" style={{ background: "#f8f9fa" }}>
                        {data && <Link to={`/doctors/profile/${data?._id}`} className="booking-doc-img d-flex justify-content-center mb-2">
                            <img src={`${url}/doctor/${data.Avathar}`}  alt="" className='w-50 h-50 rounded-circle  ' />
                        </Link>}
                        {data && <div className='doc-title-info mt-3 mb-3'>
                            <h5 className='mt-3 text-center' style={{
                                fontSize: "22px", fontWeight: 700,
                            }}>Dr. {data?.firstname + ' ' + data?.lastname}</h5>
                            <div className='text-center'>
                                <p className='form-text mb-0'>{data?.designation}</p>
                                <p className='form-text mb-0'>{data?.university}</p>
                            </div>
                        </div>}

                        <div className="booking-item-wrap">
                            <ul className="booking-date">
                                <li>Date <span>{moment(selectedDate).format('LL')}</span></li>
                                <li>Time <span>{selectTime}</span></li>
                            </ul>
                            <ul className="booking-fee">
                                <li>Consulting Fee <span> ₹{amount}</span></li>
                                <li>Booking Fee <span> ₹ 10</span></li>
                               
                            </ul>

                            <ul className="booking-total">
                                <li className='d-flex justify-content-between'>
                                    <span className='fw-bold'>Total</span>
                                    <span className="total-cost" style={{ color: '#1977cc' }}>${(Number(amount) + 10 )}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckoutPage;