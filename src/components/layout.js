/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import * as loadScript from "simple-load-script";

import Header from "./header"
import Footer from "./footer"

import "./bootstrap.css"
import "./style.css"
import "./construction.css"
import "./fonts.css"
import "./colors.css"
import "./dark.css"

const Layout = ({ children }) => {
  loadScript('js/jquery.js', { inBody: true })
  loadScript('js/plugins.js', { inBody: true })
  loadScript('js/functions.js', { inBody: true })

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
      <Header siteTitle={data.site.siteMetadata.title} />
      {children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
