import React from 'react'


export default ({show, onHideBar}) => {
 


  return (
    <div className="body-screen-wrapper">
      <div className={"body-screen" + (show?' show':'')} onClick={onHideBar}></div>
    </div>
  )
}
