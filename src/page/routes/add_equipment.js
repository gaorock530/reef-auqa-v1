import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Body from '../body'
import Select from '../../components/form/select'
// import cuid from 'cuid'
import layerData from '../../helper/gearData'
import AddItem from '../../components/addItem'
import AddForm from '../../components/addForm'
import useAddItem from '../../hooks/useAddItem'


export default () => {
  const list = ['选择鱼缸', 12,3,123,3]
  const {id} = useParams()
  const [tankId, setTankId] = useState(list[0])
  const label = "添加设备"
  const {state, onAddItem, onAdd, onDel, onChange} = useAddItem([])

  // Ready to submit all added items with quantity
  function onSubmit (e) {
    e.preventDefault()
    console.log(tankId)
    console.log(state)
  }

  return (
    <Body>
      <Helmet>
        <title>{label}</title>
        <meta name="description" content={`ReefAqua ${label}`} />
      </Helmet>

      <div className="constrained--small">
        {!id && <Select options={list} onChange={v => setTankId(list[v])}/>}
        <AddItem onAddItem={onAddItem} layerData={layerData} label={label}/>
        {state.length>0 && <AddForm data={state} onAdd={onAdd} onDel={onDel} onChange={onChange} onSubmit={onSubmit}/>}
      </div>
    </Body>
  )
}


