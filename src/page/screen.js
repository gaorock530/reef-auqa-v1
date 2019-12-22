import React, {useContext} from 'react'
import {AuthContext, CLOSE_ALL} from '../context/LoginContext'


export default () => {
  const [{sideBar, personBar}, dispatch] = useContext(AuthContext)

  const className = (sideBar||personBar)?"body-screen show":"body-screen"

  return (
    <div className="body-screen-wrapper">
      <div className={className} onClick={() => dispatch({type: CLOSE_ALL})}></div>
    </div>
  )
}
