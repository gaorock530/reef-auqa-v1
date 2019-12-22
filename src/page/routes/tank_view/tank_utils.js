import React, {useContext} from 'react'
import {TankContext} from '../../../context/TankContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Share from './tank_share'

export default ({setShowDelete}) => {
  const auth = useContext(TankContext)

  return (
    <div className="tank-utils">
      <Share/> 
      {auth?<div className="tank-cog" onClick={() => setShowDelete(true)}>
        <FontAwesomeIcon icon={faTrashAlt} size="2x"/>
        <span>删除</span>
      </div>:
      <div className="tank-auth">
        <FontAwesomeIcon icon={faHeart} size="2x"/>
        <span>喜欢</span>
      </div>}
    </div>
  )
}