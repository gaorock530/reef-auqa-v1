import React from 'react'
import {Helmet} from "react-helmet"


export default () => {
  const title = "个人资料"

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div>personal</div>
    </>
  )
}