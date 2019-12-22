import React, {useState, useRef} from 'react'
import { faRulerVertical, faRulerHorizontal, faRuler } from '@fortawesome/free-solid-svg-icons'
import Option from '../../../components/form/optionInput'
import {metrics, convert as conv} from '../../../helper/constVar'


export default ({onResult}) => {
  
  const demension = metrics.length
  const convert = conv.lengthToM
  const [option, setOption] = useState(0)
  const data = useRef({
  main: {
    length: 0,
    width:0,
    height: 0,
    deep: 0
  },
  sump: {
    length: 0,
    width:0,
    height: 0,
    deep: 0
  }})

  const onOptionChange = (v) => {
    setOption(v)
    if (onResult) onResult(calc(data.current, Number(v)))
  } 

  const onChange = (cate, type, v) => {
    data.current[cate][type] = v
    if (onResult) onResult(calc(data.current))
  }

  const calc = (ob, o) => {
    const op = o === undefined? option: o
    const mainResult = ob.main.length * convert[op] * ob.main.width * convert[op] * (ob.main.deep || ob.main.height) * convert[op]
    const sumpResult = ob.sump.length * convert[op] * ob.sump.width * convert[op] * (ob.sump.deep || ob.sump.height) * convert[op]
    // result in Liters
    return Number(((mainResult + sumpResult) * 1000).toFixed(2))
  }

  return (
    <>
      <h3>主缸：</h3>
      <Option options={demension} placeholder="长度" icon={faRuler} onChange={onChange.bind(this, 'main', 'length')} onOption={onOptionChange} defaultOption={option}/>
      <Option options={demension} placeholder="宽度" icon={faRulerHorizontal} onChange={onChange.bind(this, 'main', 'width')} onOption={onOptionChange} defaultOption={option}/>
      <Option options={demension} placeholder="高度" icon={faRulerVertical} onChange={onChange.bind(this, 'main', 'height')} onOption={onOptionChange} defaultOption={option}/>
      <Option options={demension} placeholder="水深" icon={faRulerVertical} onChange={onChange.bind(this, 'main', 'deep')} onOption={onOptionChange} defaultOption={option}/>
      <h3>底缸：(选填)</h3>
      <Option options={demension} placeholder="长度" icon={faRuler} onChange={onChange.bind(this, 'sump', 'length')} onOption={onOptionChange} defaultOption={option}/>
      <Option options={demension} placeholder="宽度" icon={faRulerHorizontal} onChange={onChange.bind(this, 'sump', 'width')} onOption={onOptionChange} defaultOption={option}/>
      <Option options={demension} placeholder="高度" icon={faRulerVertical} onChange={onChange.bind(this, 'sump', 'height')} onOption={onOptionChange} defaultOption={option}/>
      <Option options={demension} placeholder="水深" icon={faRulerVertical} onChange={onChange.bind(this, 'sump', 'deep')} onOption={onOptionChange} defaultOption={option}/>
    </>
  )
}