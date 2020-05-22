import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Content from "../components/content"

import installationImage from "../images/installation.jpg"
import illuminationImage from "../images/iluminacja.jpg"
import pvImage from "../images/pv.jpg"

const IndexPage = () => (
	<Layout>
		<SEO title="Home" />
		<Content>
			<div className="container clearfix">


				<div className="col_one_third nobottommargin">
					<Link to="/projekty-instalacji-elektrycznej-w-przemysle">
						<div className="feature-box media-box">
							<div className="fbox-media">
								<img src={installationImage} alt="Projekty instalacji" />
							</div>
							<div className="fbox-desc">
								<h3>Projekty instalacji<span className="subtitle"></span></h3>
								{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi rem, facilis nobis voluptatum est voluptatem accusamus molestiae eaque perspiciatis mollitia.</p> */}
							</div>
						</div>
					</Link>
				</div>

				<div className="col_one_third nobottommargin">
					<Link to="/fotowoltaika-dla-domu">
						<div className="feature-box media-box">
							<div className="fbox-media">
								<img src={pvImage} alt="Fotowoltaika" />
							</div>
							<div className="fbox-desc">
								<h3>Fotowoltaika<span className="subtitle"></span></h3>
								{/* <p>Porro repellat vero sapiente amet vitae quibusdam necessitatibus consectetur, labore totam. Accusamus perspiciatis asperiores labore esse.</p> */}
							</div>
						</div>
					</Link>
				</div>

				<div className="col_one_third nobottommargin col_last">
					<Link to="/iluminacje-swiateczne">
						<div className="feature-box media-box">
							<div className="fbox-media">
								<img src={illuminationImage} alt="Iluminacje świetlne" />
							</div>
							<div className="fbox-desc">
								<h3>Iluminacje świetlne<span className="subtitle"></span></h3>
								{/* <p>Quos, non, esse eligendi ab accusantium voluptatem. Maxime eligendi beatae, atque tempora ullam. Vitae delectus quia, consequuntur rerum quo.</p> */}
							</div>
						</div>
					</Link>
				</div>

			</div>
		</Content>
	</Layout>
)

export default IndexPage
