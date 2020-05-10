import React from "react"

const Title = ({ title, subtitle }) => (
  <section id="page-title" className="nobg">
    <div className="container clearfix">
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
    </div>
  </section>
)

export default Title
