import React from 'react'
import {Helmet} from "react-helmet"


export default () => {
  const title = "清理缓存"

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div>清理缓存</div>
    </>
  )
}