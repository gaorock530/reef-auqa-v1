import React from 'react'
import {Helmet} from "react-helmet"
import Body from '../body'



export default () => {
  const title = "@我的"

  const renderList = () => {
    const list = []
    for (let i=0;i<20;i++) {
      list.push(<li key={i}>{i}</li>)
    }
    return list
  }

  return (
    <Body>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div className="constrained">
        <div className="utils-bar">
          <nav>
            adsas
          </nav>
        </div>
        <div className="msg-list">
          {renderList()}
        </div>
      </div>
    </Body>
  )
}