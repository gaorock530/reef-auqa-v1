import React from 'react'
import {Helmet} from "react-helmet"
import Body from '../body'


export default () => {
  const title = "隐私"

  return (
    <Body>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div>隐私</div>
    </Body>
  )
}