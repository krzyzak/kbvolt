import React from "react"

const Content = ({ children }) => (
  <section id="content">
    <div className="content-wrap">
      <div className="container clearfix">
        {children}
      </div>
    </div>
  </section>
)

export default Content
