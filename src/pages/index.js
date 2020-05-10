import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Content from "../components/content"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Content>
      <div className="container clearfix">

					<div className="col_one_third nobottommargin">
						<div className="feature-box media-box">
							<div className="fbox-media">
								{/* <img style="border-radius: 2px;" src="demos/construction/images/services/1.jpg" alt="Why choose Us?"> */}
							</div>
							<div className="fbox-desc">
								<h3>Projekty instalacji<span className="subtitle"></span></h3>
								{/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi rem, facilis nobis voluptatum est voluptatem accusamus molestiae eaque perspiciatis mollitia.</p> */}
							</div>
						</div>
					</div>

					<div className="col_one_third nobottommargin">
						<div className="feature-box media-box">
							<div className="fbox-media">
								{/* <img style="border-radius: 2px;" src="images/services/1.jpg" alt="Effective Planning"> */}
							</div>
							<div className="fbox-desc">
								<h3>Fotowoltaika<span className="subtitle"></span></h3>
								{/* <p>Porro repellat vero sapiente amet vitae quibusdam necessitatibus consectetur, labore totam. Accusamus perspiciatis asperiores labore esse.</p> */}
							</div>
						</div>
					</div>

					<div className="col_one_third nobottommargin col_last">
						<div className="feature-box media-box">
							<div className="fbox-media">
								{/* <img style="border-radius: 2px;" src="demos/construction/images/services/2.jpg" alt="Why choose Us?"> */}
							</div>
							<div className="fbox-desc">
								<h3>Iluminacje świetlne<span className="subtitle"></span></h3>
								{/* <p>Quos, non, esse eligendi ab accusantium voluptatem. Maxime eligendi beatae, atque tempora ullam. Vitae delectus quia, consequuntur rerum quo.</p> */}
							</div>
						</div>
					</div>

				</div>
    </Content>
  </Layout>
)

export default IndexPage
