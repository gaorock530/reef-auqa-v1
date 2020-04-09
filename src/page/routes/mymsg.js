import React from 'react'
import {Helmet} from "react-helmet"


export default () => {
  const title = "我的消息"

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div>我的消息</div>
    </>
  )
}