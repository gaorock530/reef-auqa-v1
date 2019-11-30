import React from 'react'

export default ({children, className}) => {
  return (
    <div className={'main-wrapper ' + (className || '')}>
      <div className="main-wrapper-container">
        {children}
      </div>  
    </div>
  )
}