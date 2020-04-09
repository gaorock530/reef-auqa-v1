import React from 'react'
import {Helmet} from "react-helmet"


export default () => {
  const title = "重置密码"

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div>重置密码</div>
    </>
  )
}