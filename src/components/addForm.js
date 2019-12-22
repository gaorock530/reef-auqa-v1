import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Static from './form/static'
import Input from './form/input'
/**
 * @param {Array} props.data 
 * @param {Function} props.onAdd 
 * @param {Function} props.onDel 
 * @param {Function} props.onChange 
 * @param {Function} props.onSubmit
 */

function RenderItems ({onAdd, onDel, onChange, data}) {

  return data.map(item => (
    <div className="utils-add-list" key={item.id}>
      <div className="flex-1"><Static value={item.name}/></div>
      <div className="uitls-inner-list flex-1">
        <div className="flex-1 button" onClick={onDel.bind(this, item.id)}><FontAwesomeIcon icon={faMinus} size="2x"/></div>
        <div className="flex-1"><Input type="number" placeholder="0" value={Math.floor(item.quantity)} onChange={onChange.bind(this, item.id)}/></div>
        <div className="flex-1 button" onClick={onAdd.bind(this, item.id)}><FontAwesomeIcon icon={faPlus} size="2x"/></div>
      </div>
    </div>
  ))
}

export default function addFrom ({data = [], onAdd, onDel, onChange, onSubmit}) {
  return (
    <form className="noselect" noValidate onSubmit={onSubmit}>
      <RenderItems data={data} onAdd={onAdd} onDel={onDel} onChange={onChange}/>
      <button>完成添加</button>
    </form>
  )
}