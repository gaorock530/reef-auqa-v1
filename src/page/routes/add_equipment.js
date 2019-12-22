import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import {useParams} from 'react-router-dom'
import Body from '../body'
import Select from '../../components/form/select'

export default () => {
  const list = [12,3,123,3]
  const {id} = useParams()
  const [tankId, setTankId] = useState(list[0])

  console.log(tankId)

  return (
    <Body>
      <Helmet>
        <title>添加设备</title>
        <meta name="description" content="ReefAqua 添加设备" />
      </Helmet>
      <div className="constrained">
        {!id && <Select options={list} onChange={v => setTankId(list[v])}/>}
        add equipment
      </div>
    </Body>
  )
}