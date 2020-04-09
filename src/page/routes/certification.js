import React from 'react'
import {Helmet} from "react-helmet"


export default () => {
  const title = "实名认证"

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div>实名认证</div>
    </>
  )
}