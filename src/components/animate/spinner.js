import React from 'react'


export default ({sType, size, text}) => {

  return (
    <div className={'spinnner-wapper ' }>
      <div className={"spinner " + (sType || 'style1')} style={size?{width: size, height: size}:null}>{text || ''}</div>
    </div>
  )
}