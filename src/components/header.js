import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import logo from "../images/logo.png"

const Header = ({ siteTitle }) => (
  <header id="header" className="sticky-style-2">

			<div className="container clearfix">
				<div id="logo">
					<a href="index.html" className="standard-logo">
						<img src={logo} />
					</a>
					<a href="index.html" className="retina-logo">
						<img src={logo} />
					</a>
				</div>

				<ul className="header-extras">
					<li>
						<i className="i-plain icon-call nomargin"></i>
						<div className="he-text">
							Zadzwoń
							<span>(32) 239-57-46</span>
						</div>
					</li>
					<li>
						<i className="i-plain icon-line2-envelope nomargin"></i>
						<div className="he-text">
							Napisz
							<span>kbvolt@kbvolt.pl</span>
						</div>
					</li>
				</ul>

			</div>

			<div id="header-wrap">
				<nav id="primary-menu" className="with-arrows style-2 center">

					<div className="container clearfix">

						<div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

						<ul>
              <li><Link to="/">Home</Link></li>
							<li>
								<Link>Fotowoltaika</Link>
								<ul>
									<li><Link to="/fotowoltaika-dla-firm">Fotowoltaika dla firm</Link></li>
									<li><Link to="/fotowoltaika-dla-domu">Fotowoltaika dla domu</Link></li>
								</ul>
							</li>
							<li>
								<Link>Projekty instalacji</Link>
								<ul>
									<li><Link to="/projekty-instalacji-elektrycznej-w-przemysle">Projekty instalacji elektrycznej w przemyśle</Link></li>
									<li><Link to="/projekty-instalacji-elektrycznej-w-domu">Projekty instalacji elektrycznej w domu</Link></li>
								</ul>
							</li>
              <li><Link to="/oswietlenie-przemyslowe-led"> Oprawy przemysłowe LED</Link></li>
              <li><Link to="/iluminacje-swiateczne">Iluminacje swietlne</Link></li>
							<li><Link to="/o-nas">O nas</Link></li>
						</ul>
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
