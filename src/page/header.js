import React, {useContext, useEffect} from 'react'
import {AuthContext, LOGIN, TOGGLE_SIDE_BAR, TOGGLE_PERSON_BAR} from '../context/LoginContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'



export default () => {
  const [{login}, dispatch] = useContext(AuthContext)

  useEffect(() => {
    console.log('login')
    const id = localStorage.getItem('id')
    setTimeout(() => {
      if (id) dispatch({type: LOGIN, payload: 'Magic'})
    })
  }, [dispatch])

  // console.log('render Header')
  return (
    <header>
      <div className="header-wrapper">
        <div className="header-left">
          <div className="header-menu button" onClick={() => dispatch({type: TOGGLE_SIDE_BAR})}><FontAwesomeIcon icon={faBars} size="2x"/></div>
          <Link className="header-title" to="/">MagicAqua</Link>
        </div>
        
        <div className="header-icon button">{login?<button onClick={() => dispatch({type: TOGGLE_PERSON_BAR})}></button>:<Link to="/login">登录</Link>}</div>
      </div>
    </header>
  )
}

