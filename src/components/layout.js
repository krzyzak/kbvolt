/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"

import "./bootstrap.css"
import "./style.css"
import "./construction.css"
import "./fonts.css"
import "./font-icons.css"
import "./colors.css"
import "./dark.css"
import "./responsive.css"

const Layout = ({ phone, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header phone={phone} siteTitle={data.site.siteMetadata.title} />
      {children}
      <Footer phone={phone} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
