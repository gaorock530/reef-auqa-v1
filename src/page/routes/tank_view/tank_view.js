import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {TankContext} from '../../../context/TankContext'
import TankGallery from './tank_gallery'
import TestChart from './test_chart'
import TestInfo from './tank_test'
import TankInfo from './tank_info'
import TankDelete from './tank_delete'
import TankUtils from './tank_utils'
import TankLiveStock from './tank_livestock'
import TankGear from './tank_gear'




export default function TankView ({data, id}) {
  const [showdelete, setShowDelete] = useState(false)
  const auth = useContext(TankContext)

  return (
    <div className="constrained">
      {showdelete && <TankDelete name={data.name} id={id} setShowDelete={setShowDelete}/>}
      <TankUtils setShowDelete={setShowDelete}/>
      <TankGallery data={data}/>
      <TankInfo data={data}/>
      <TestInfo/>
      {auth && <Link to={`/add/test/${id}`} className="tank-add-fn"><FontAwesomeIcon icon={faPlus} size="2x"/><h5>新增测试</h5></Link>}
      <TestChart/>
      {auth && <Link to={`/add/livestock/${id}`} className="tank-add-fn"><FontAwesomeIcon icon={faPlus} size="2x"/><h5>新增生物</h5></Link>}
      <TankLiveStock/>
      {auth && <Link to={`/add/equipment/${id}`} className="tank-add-fn"><FontAwesomeIcon icon={faPlus} size="2x"/><h5>新增设备</h5></Link>}
      <TankGear/>
    </div>
  )
}