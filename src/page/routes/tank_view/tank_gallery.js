import React, { useContext } from 'react'
import Photo from '../../../components/photo'
import Slider from '../../../components/slider'
import {TankContext} from '../../../context/TankContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons'

export default ({data}) => {
  const auth = useContext(TankContext)
  
  return (
    <>
      {auth?<Photo className="tank-view-block" pic={data.cover}>
        <FontAwesomeIcon icon={faImage} size="2x"/><h5>更换封面</h5>
      </Photo>:
      <div className="tank-view-block tank-view-cover" style={{backgroundImage: `url(${data.cover})`}}></div>}
      <div className="tank-view-block tank-view-cover-list">
        <Slider data={[data, data, data, data, data]}/>
      </div>
    </>
  )
}