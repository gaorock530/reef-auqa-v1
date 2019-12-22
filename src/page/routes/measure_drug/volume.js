import React, {useState, useRef} from 'react'
import Option from '../../../components/form/optionInput'
import {metrics, convert as conv} from '../../../helper/constVar'


export default ({onResult}) => {
  const demension = metrics.volume
  const [option, setOption] = useState(0)
  const volume = useRef(0)
  const convert = conv.volumeToL

  const onChange = (v) => {
    volume.current = v
    if (onResult) onResult(v * convert[option])
  }

  const onOptionChange = (v) => {
    setOption(Number(v))
    if (onResult) onResult(volume * convert[Number(v)])
  }

  return (
    <>
      <h3>水体：</h3>
      <Option options={demension} placeholder="水体容量" onChange={onChange} onOption={onOptionChange} defaultOption={option}/>
    </>
  )
}