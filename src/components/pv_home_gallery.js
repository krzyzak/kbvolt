import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Gallery from "./gallery"

const PvHomeGallery = () => {
  return (
    <StaticQuery
      query={graphql`
        query PvHomeImgQuery {
          source: allFile(filter: { absolutePath: { regex: "/pv/home/" } }) {
            edges {
              node {
                childImageSharp {
                  fluid(maxHeight: 500) {
                    ...GatsbyImageSharpFluid
                    presentationWidth
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        return (<Gallery data={data} /> )
      }}
    />
  );
}

export default PvHomeGallery
