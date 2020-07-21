import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Gallery from "./gallery"

const PvCompanyGallery = () => {
  return (
    <StaticQuery
      query={graphql`
        query PvCompanyImgQuery {
          source: allFile(filter: { absolutePath: { regex: "/pv/company/" } }) {
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

export default PvCompanyGallery
