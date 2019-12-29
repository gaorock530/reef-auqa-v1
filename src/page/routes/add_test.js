import React, {useState, useReducer} from 'react'
import {useParams} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Body from '../body'
import Select from '../../components/form/select'
import Input from '../../components/form/optionInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import cuid from 'cuid'

const testLabel = ['PH','KH','NH4','NO2','NO3','PO4','盐度','Ca','Mg','Cu','Fe','Sr','I²','O²','GH']

export default () => {
  const list = ['选择鱼缸', 12,3,123,3]
  
  const {id} = useParams()
  const [tankId, setTankId] = useState(list[0])

  const onRecord = v => {
    console.log({
      tankId,
      tests: v
    })
  }

  return (
    <Body>
      <Helmet>
        <title>添加测试</title>
        <meta name="description" content="ReefAqua 添加测试" />
      </Helmet>
      <div className="constrained--small">
        {!id && <Select options={list} onChange={v => setTankId(list[v])}/>}
        <AddNewTest onRecord={onRecord}/>
      </div>
    </Body>
  )
}

const reducer = (state, action) => {
  

  switch (action.type) {
    case 'ADD':
      return [...state, {id: cuid.slug(), name: action.name, value: 0}]
    case 'DEL':
      if (state.length < 2) return state
      return state.filter(i => i.id !== action.id)
    case 'IDX':
      return state.map(v => {
        if (v.id === action.id) {
          v.name = action.name
        }
        return v
      })
    case 'VAL':
      return state.map(v => {
        if (v.id === action.id) {
          v.value = action.value
        }
        return v
      })
    default:
      return state
  }
}



function AddNewTest ({onRecord}) {
  
  const [tests, dispatch] = useReducer(reducer, [{id: cuid.slug(), name: testLabel[0], value: 0}])
  const onNameLIst = tests.map(v => v.name)

  const onSubmit = e => {
    e.preventDefault()
    const record = {}
    for(let v of tests) {
      record[v.name] = v.value
    }
    onRecord(record)
  }
  
  return (
    <form onSubmit={onSubmit} noValidate>
      {tests.map((test, idx)=> <TestItem key={test.id} id={test.id} name={test.name}
        dispatch={dispatch}
        plus={idx + 1 === tests.length}
        options={testLabel.filter(v => onNameLIst.indexOf(v) === -1 || v === test.name)}
      />)}
      <button>记录测试</button>
    </form>
  )
}

function TestItem ({id, name, options, plus, dispatch}) {  

  const newName = options.indexOf(name) === 0?options[1]:options[0]

  const metrics = () => {
    const dKH = ['KH', 'GH']
    const blink = ['盐度','PH']
    if (~dKH.indexOf(name)) return 'dKH'
    if (~blink.indexOf(name)) return ''
    return 'ppm'
  }

  return (
    <div className="utils-add-list">
      <Select options={options} onChange={v => dispatch({type: 'IDX', name: options[v], id})} defaultOption={options.indexOf(name)}/>
      <Input options={metrics()} placeholder="数值" onChange={v => dispatch({type: 'VAL', id, value: v})}/>
      {plus && newName?<div className="button" onClick={() => dispatch({type: 'ADD', name: newName})}><FontAwesomeIcon icon={faPlus} size="2x"/></div>:
      <div className="button" onClick={() => dispatch({type: 'DEL', id})}><FontAwesomeIcon icon={faMinus} size="2x"/></div>}
      
    </div>
  )
}