import React, { useState, useRef, useEffect } from 'react'
import Select from './form/select'
import useLocalCity from '../hooks/useCitys'

export default ({onSelect}) => {
  const data = useLocalCity()
  const [layer, setLayer] = useState({l2: [], l3: []})
  const indexes = useRef({idx1: 0, idx2: 0, idx3: 0})

  useEffect(() => {
    if (data && layer.l2.length === 0) {
      console.log('run')
      const l2 = getArray(data[1], data[0], 0)
      const l3 = getArray(data[2], l2, 0)
      const selected = [data[0][indexes.current.idx1], l2[indexes.current.idx2], l3[indexes.current.idx3]]

      if (onSelect) onSelect(selected)
      setLayer({l2, l3})
    }
  }, [layer, data, onSelect])

  function getArray (indexingList, sourceList, index) {
    if (!sourceList[index] || !sourceList[index].cidx) return ['无'];
    const renge = sourceList[index].cidx;
    return indexingList.slice(renge[0], renge[1]+1);
  }

  function onChange (type, v) {
    if (!data) return

    if (type === 'l1') {
      const l2 = getArray(data[1], data[0], v)
      const l3 = getArray(data[2], l2, 0)
      indexes.current = {idx1: v, idx2: 0, idx3: 0}
      const selected = [data[0][indexes.current.idx1], l2[indexes.current.idx2], l3[indexes.current.idx3]]
      if (onSelect) onSelect(selected)
      return setLayer({l2, l3})
    } 
    if (type === 'l2') {
      const l3 = getArray(data[2], layer.l2, v)
      indexes.current = {...indexes.current, idx2: v, idx3: 0}
      const selected = [data[0][indexes.current.idx1], layer.l2[indexes.current.idx2], l3[indexes.current.idx3]]
      if (onSelect) onSelect(selected)
      return setLayer({...layer, l3})
    } 

    // l3
    indexes.current = {...indexes.current, idx3: v}
    const selected = [data[0][indexes.current.idx1], layer.l2[indexes.current.idx2], layer.l3[indexes.current.idx3]]
    if (onSelect) onSelect(selected)
  } 

  return (
    <div className="three-col">
      <Select options={data?data[0]:[]} valueProp="fullname" onChange={onChange.bind(this, 'l1')}/>
      <Select options={layer.l2} valueProp="fullname" onChange={onChange.bind(this, 'l2')}/>
      <Select options={layer.l3} valueProp="fullname" onChange={onChange.bind(this, 'l3')}/>
    </div>
  )
}