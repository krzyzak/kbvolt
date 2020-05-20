import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import logo from "../images/logo.png"

const Footer = ({ phone }) => (
  <footer id="footer" className="dark">
			<div className="container">

				<div className="footer-widgets-wrap clearfix">

					<div className="">

						<div className="widget clearfix">
							<div className="widget clear-bottommargin-sm clearfix">

							<div className="row">
								<div className="col-sm-4 bottommargin-sm">
									<div className="footer-big-contacts">
										<span>Nasze dane</span>
									</div>
									<p>
										P.P.H.U K.B. Volt sp. z O.O. <br />
										ul. Zamkowa 10 <br />
										43-178 Ornontowice <br />
										NIP: 6351603595
									</p>
								</div>

								<div className="col-sm-4 bottommargin-sm">
									<div className="footer-big-contacts">
										<span>Zadzwoń do nas:</span>
										{phone}
									</div>
								</div>

								<div className="col-sm-4 bottommargin-sm">
									<div className="footer-big-contacts">
										<span>Napisz do nas:</span>
										kbvolt@kbvolt.pl
									</div>
								</div>

							</div>

							</div>


							<div className="line"></div>


							<div className="row">
								<div className="col-lg-3 col-6 bottommargin-sm widget_links">
									<ul>
										<li><Link to="/">Home</Link></li>
										<li><Link to="/">O nas</Link></li>
										{/* <li><Link to="/">Kontakt</Link></li> */}
									</ul>
								</div>

								<div className="col-lg-3 col-6 bottommargin-sm widget_links">
									<ul>
										<li><Link to="/fotowoltaika-dla-firm">Fotowoltaika dla firm</Link></li>
										<li><Link to="/fotowoltaika-dla-domu">Fotowoltaika dla domu</Link></li>
									</ul>
								</div>

								<div className="col-lg-3 col-6 bottommargin-sm widget_links">
									<ul>
										<li><Link to="/projekty-instalacji-elektrycznej-w-przemysle">Projekty instalacji elektrycznej w przemyśle</Link></li>
										<li><Link to="/projekty-instalacji-elektrycznej-w-domu">Projekty instalacji elektrycznej w domu</Link></li>
									</ul>
								</div>

								<div className="col-lg-3 col-6 bottommargin-sm widget_links">
									<ul>
										<li><Link to="/oswietlenie-przemyslowe-led"> Oprawy przemysłowe LED</Link></li>
										<li><Link to="/iluminacje-swiateczne">Iluminacje swietlne</Link></li>
									</ul>
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
