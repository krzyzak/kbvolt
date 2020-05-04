import React from "react"

const Title = ({ title, subtitle }) => (
  <section id="page-title" class="">
    <div class="container clearfix">
      <h1>{title}</h1>
      {subtitle && <span>{subtitle}</span>}
      {/* <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Projects</li>
      </ol> */}
    </div>
  </section>
)

export default Title
