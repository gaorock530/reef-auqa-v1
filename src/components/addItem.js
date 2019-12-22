import React, {useState, useRef} from 'react'
import Select from './form/select'
import Input from './form/input'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
/**
 * 
 * @param {Function} props.onAddItem 
 */

export default function AddItem ({onAddItem, layerData}) {
  const initL2 = getArray(layerData[1], layerData[0], 0)
  const initL3 = getArray(layerData[2], initL2, 0)
  const [layer, setLayer] = useState({l2: initL2, l3: initL3})
  const indexes = useRef({idx1: 0, idx2: 0, idx3: 0})

  function getArray (indexingList, sourceList, index) {
    if (!sourceList[index] || !sourceList[index].cidx) return ['无'];
    const renge = sourceList[index].cidx;
    return indexingList.slice(renge[0], renge[1]+1);
  }

  function onChange (type, v) {
    let l2
    if (type === 'l1') {
      l2 = getArray(layerData[1], layerData[0], v)
      const l3 = getArray(layerData[2], l2, 0)
      indexes.current = {idx1: v, idx2: 0, idx3: 0}
      return setLayer({l2, l3})
    } 
    if (type === 'l2') {
      const source = l2 || layer.l2
      const l3 = getArray(layerData[2], source, v)
      indexes.current = {...indexes.current, idx2: v, idx3: 0}
      return setLayer({...layer, l3})
    } 

    indexes.current = {...indexes.current, idx3: v}
  } 

  const onAdd = () => {
    const selected = [layerData[0][indexes.current.idx1], layer.l2[indexes.current.idx2], layer.l3[indexes.current.idx3]]
    if (onAddItem) onAddItem(selected)
  }

  return (
    <div className="outside-form">
      <Input icon={faSearch}/>
      <div className="utils-add-list">
        <div className="flex-1"><Select options={layerData[0]} onChange={onChange.bind(this, 'l1')} valueProp="fullname"/></div>
        <div className="flex-1"><Select options={layer.l2} onChange={onChange.bind(this, 'l2')} valueProp="fullname"/></div>
      </div>
      <Select options={layer.l3} onChange={onChange.bind(this, 'l3')} valueProp="fullname"/>
      <div className="tank-view-cover live-display" style={{backgroundImage: `url('/assets/pic/tankcover.png')`}}></div>
      <button onClick={onAdd}>添加生物</button>
    </div>
  )
}