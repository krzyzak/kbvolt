import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"


const ThumbGrid = ({ images, handleOpen, classes }) => {
  return images.map((image, i) => (
    <li className="grid-item" key={i} onClick={handleOpen(i)}>
      <a className="op-08" style={{cursor: 'pointer'}}>
        <Img
          fluid={image.node.childImageSharp.fluid}
          style={{widht: '250px', height: '250px'}}
        />
      </a>
    </li>
  ))
}

ThumbGrid.propTypes = {
  classes: PropTypes.object,
  images: PropTypes.array,
}
export default ThumbGrid
