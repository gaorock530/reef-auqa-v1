import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Body from '../body'
import Select from '../../components/form/select'
// import cuid from 'cuid'
import layerData from '../../helper/dataLayer'
import AddItem from '../../components/addItem'
import AddForm from '../../components/addForm'





export default () => {
  const list = ['选择鱼缸', 12,3,123,3]
  const {id} = useParams()
  const [tankId, setTankId] = useState(list[0])
  const [state, setState] = useState([])

  // addItem action
  const onAddItem = item => {
    let has = false
    // check repeat item
    if (state.length > 0) has = state.reduce((repeat, it) => it.id === item[2].id || repeat, false)
    if (!has) setState([...state, {...item[2], quantity: 1, icon: item[0].icon}])
  }

  // Increase added item quantity action
  const onAdd = id => {
    const newState = state.map(item => {
      if (item.id === id) item.quantity++
      return item
    })
    setState(newState)
  }

  // Decrease added item quantity action
  const onDel = id => {
    const hold = state.map(item => {
      if (item.id === id) item.quantity--
      return item
    })
    const newState = hold.filter(item => item.quantity >= 0)
    setState(newState)
  }

  // Direct input to change item's quantity
  const onChange = (id, quantity) => {
    const newState = state.map(item => {
      if (item.id === id) item.quantity = quantity
      return item
    })
    setState(newState)
  }
  
  // Ready to submit all added items with quantity
  function onSubmit (e) {
    e.preventDefault()
    console.log(tankId)
    console.log(state)
  }


  return (
    <Body>
      <Helmet>
        <title>添加生物</title>
        <meta name="description" content="ReefAqua 添加生物" />
      </Helmet>

      <div className="constrained--small">
        {!id && <Select options={list} onChange={v => setTankId(list[v])}/>}
        <AddItem onAddItem={onAddItem} layerData={layerData}/>
        {state.length>0 && <AddForm data={state} onAdd={onAdd} onDel={onDel} onChange={onChange} onSubmit={onSubmit}/>}
      </div>
      
    </Body>
  )
}


