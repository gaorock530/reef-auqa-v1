import React, {useEffect} from 'react'

export default ({className, children}) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <div className={'main-wrapper ' + (className || '')}>
      <div className="main-wrapper-container">
        {children}
      </div>  
    </div>
  )
}