import React from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import "./headers.css"

const Footers = () => {
  return (
    <div>
          <footer className="footer position-relative">
			<div className="footer-top">
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-3 col-md-6">
							<div className="footer-widget footer-about">
								<div className="footer-logo">
									<Link to={'/'}>
										<img src="/logo.png" alt="logo" style={{ maxWidth: '160px' }} />
									</Link>
								</div>
								<div className="footer-about-content">
									<p className='form-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
								</div>
							</div>
						</div>

						<div className="col-lg-3 col-md-6">
							<div className="footer-widget footer-menu">
								<h2 className="footer-title">For Patients</h2>
								<ul>
									<li><Link to={'/search'}><FaAngleDoubleRight className='icon' />  Search for Doctors</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' />  Login</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' />  Register</Link></li>
									<li><Link to={'/appointment'}><FaAngleDoubleRight className='icon' />  Booking</Link></li>
									{/* <li><Link to={'/'}><FaAngleDoubleRight className='icon' />  Patient Dashboard</Link></li> */}
								</ul>
							</div>
						</div>

						<div className="col-lg-3 col-md-6">

							<div className="footer-widget footer-menu">
								<h2 className="footer-title">For Doctors</h2>
								<ul>
									<li><Link to={'/'}><FaAngleDoubleRight className='icon' /> Appointments</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' /> Login</Link></li>
									<li><Link to={'/register'}><FaAngleDoubleRight className='icon' /> Register</Link></li>
									{/* <li><Link to={'/dashboard'}><FaAngleDoubleRight className='icon' /> Doctor Dashboard</Link></li> */}
								</ul>
							</div>
						</div>

						<div className="col-lg-3 col-md-6">
							<div className="footer-widget footer-contact">
								<h2 className="footer-title">Contact Us</h2>
								<div className="footer-contact-info">
									<div className="footer-address">
										<span><i className="fas fa-map-marker-alt"></i></span>
										<p> 121, My Office,<br /> My city, India 567890 </p>
									</div>
									<p>
										<i className="fas fa-phone-alt"></i>
										+91 9876 54 3210
									</p>
									<p className="mb-0">
										<i className="fas fa-envelope"></i>
										example@gmail.com
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container-fluid">

					<div className="copyright">
						<div className="row">
							<div className="col-md-6 col-lg-6">
								<div className="copyright-text">
									<p className="mb-0"><a href="templateshub.net">
										<div className="copyRight text-center">
											<p>Copyright {(new Date()).getFullYear()} All Rights Reserved</p>
										</div></a></p>
								</div>
							</div>
							<div className="col-md-6 col-lg-6">
								<div className="copyright-menu">
									<ul className="policy-menu d-flex gap-2">
										<Link to={'/'} className='text-white'>Terms and Conditions</Link>
										<Link to={'/'} className='text-white'>Policy</Link>
									</ul>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

		</footer>
    </div>
  )
}

export default Footers