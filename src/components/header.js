import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./bootstrap.css"
import "./style.css"
import "./construction.css"

const Header = ({ siteTitle }) => (
  <header id="header" className="sticky-style-2">

			<div className="container clearfix">
				<div id="logo">
					{/* <a href="index.html" className="standard-logo"><img src="demos/construction/images/logo.png" alt="Canvas Logo" /></a>
					<a href="index.html" className="retina-logo"><img src="demos/construction/images/logo@2x.png" alt="Canvas Logo" /></a> */}
				</div>

				<ul className="header-extras">
					{/* <li>
						<i className="i-plain icon-call nomargin"></i>
						<div className="he-text">
							Call Us
							<span>(91) 22 54215821</span>
						</div>
					</li>
					<li>
						<i className="i-plain icon-line2-envelope nomargin"></i>
						<div className="he-text">
							Email Us
							<span>info@canvas.com</span>
						</div>
					</li>
					<li>
						<i className="i-plain icon-line-clock nomargin"></i>
						<div className="he-text">
							We'are Open
							<span>Mon - Sat, 10AM to 6PM</span>
						</div>
					</li> */}
				</ul>

			</div>

			<div id="header-wrap">
				<nav id="primary-menu" className="with-arrows style-2 center">

					<div className="container clearfix">

						<div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

						{/* <ul>
							<li className="current"><a href="#"><div>Home</div></a></li>
							<li><a href="demos/construction/services.html"><div>What we do</div></a>
								<ul>
									<li><a href="#"><div>Housing Management</div></a></li>
									<li><a href="#"><div>Construction Planning</div></a></li>
									<li><a href="#"><div>Green Homes</div></a></li>
									<li><a href="#"><div>Architecture Design</div></a></li>
									<li><a href="#"><div>Interior Planning</div></a></li>
								</ul>
							</li>
							<li><a href="demos/construction/about-us.html"><div>About Us</div></a></li>
							<li><a href="demos/construction/projects.html"><div>Projects</div></a>
								<ul>
									<li><a href="demos/construction/projects-2.html"><div>2 Columns</div></a></li>
									<li><a href="demos/construction/projects-3.html"><div>3 Columns</div></a></li>
									<li><a href="demos/construction/projects.html"><div>4 Columns</div></a></li>
									<li><a href="demos/construction/projects-5.html"><div>5 Columns</div></a></li>
								</ul>
							</li>
							<li><a href="demos/construction/investors.html"><div>Investors</div></a></li>
							<li><a href="demos/construction/blog.html"><div>News</div></a></li>
							<li><a href="demos/construction/careers.html"><div>Careers</div></a></li>
							<li><a href="demos/construction/contact.html"><div>Contact</div></a></li>
						</ul> */}
					</div>

				</nav>

			</div>

		</header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
