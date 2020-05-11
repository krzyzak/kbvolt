import React from "react"
import PropTypes from "prop-types"
import logo from "../images/logo.png"

const Footer = ({ phone }) => (
  <footer id="footer" className="dark">
			<div className="container">

				<div className="footer-widgets-wrap clearfix">

					<div className="col_two_third">

						<div className="widget clearfix">

							{/* <img src={logo} alt="" className="alignleft" /> */}

							<p>We believe in <strong>Simple</strong>, <strong>Creative</strong> &amp; <strong>Flexible</strong> Design Standards with a Retina &amp; Responsive Approach. Browse the amazing Features this template offers.</p>

							<div className="line"></div>


							{/* <div className="row">
								<div className="col-lg-3 col-6 bottommargin-sm widget_links">
									<ul>
										<li><a href="#">Home</a></li>
										<li><a href="#">About</a></li>
										<li><a href="#">FAQs</a></li>
										<li><a href="#">Support</a></li>
										<li><a href="#">Contact</a></li>
									</ul>
								</div>

								<div className="col-lg-3 col-6 bottommargin-sm widget_links">
									<ul>
										<li><a href="#">Shop</a></li>
										<li><a href="#">Portfolio</a></li>
										<li><a href="#">Blog</a></li>
										<li><a href="#">Events</a></li>
										<li><a href="#">Forums</a></li>
									</ul>
								</div>

								<div className="col-lg-3 col-6 bottommargin-sm widget_links">
									<ul>
										<li><a href="#">Corporate</a></li>
										<li><a href="#">Agency</a></li>
										<li><a href="#">eCommerce</a></li>
										<li><a href="#">Personal</a></li>
										<li><a href="#">One Page</a></li>
									</ul>
								</div>

								<div className="col-lg-3 col-6 bottommargin-sm widget_links">
									<ul>
										<li><a href="#">Restaurant</a></li>
										<li><a href="#">Wedding</a></li>
										<li><a href="#">App Showcase</a></li>
										<li><a href="#">Magazine</a></li>
										<li><a href="#">Landing Page</a></li>
									</ul>
								</div>

							</div> */}

						</div>

					</div>


					<div className="col_one_third col_last">

						<div className="widget clear-bottommargin-sm clearfix">

							<div className="row">

								<div className="col-lg-12 bottommargin-sm">
									<div className="footer-big-contacts">
										<span>Zadzwoń do nas:</span>
										{phone}
									</div>
								</div>

								<div className="col-lg-12 bottommargin-sm">
									<div className="footer-big-contacts">
										<span>Napisz do nas:</span>
										kbvolt@kbvolt.pl
									</div>
								</div>

							</div>

						</div>

					</div>

				</div>

			</div>

			<div id="copyrights">

				<div className="container clearfix">

					<div className="col_half">
            {/* TODO: Adjust copy */}
						Copyrights &copy; 2020 All Rights Reserved by K.B. Volt sp z O.O.<br />
					</div>
				</div>
			</div>
		</footer>
)

Footer.propTypes = {
  phone: PropTypes.string,
}

Footer.defaultProps = {
  phone: `606 394 570`,
}


export default Footer
