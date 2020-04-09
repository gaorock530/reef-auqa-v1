import React, {useState, useRef} from 'react'
import {Helmet} from "react-helmet";
import {measureDefaultOption, metrics, convert as conv} from '../../../helper/constVar'
import Option from '../../../components/form/optionInput'
import Static from '../../../components/form/static'
import Select from '../../../components/form/select'

import useVolumeFromLocal from '../../../hooks/useVolumeFromLocal'

import Size from './size'
import Volume from './volume'

import { faFlask, faTint } from '@fortawesome/free-solid-svg-icons'
//faFillDrip

export default () => {
  // const [{page}] = useContext(AuthContext)
  const [option, setOption] = useState(1)
  const [dose, setDose] = useState(0)
  const [volume, setVolume] = useState(0)
  const [result, setResult] = useState(null)
  const data = useRef({
    volume: 0,
    dose: 0,
    perV: 0,
    orginalPerV: 0 
  })

  const [volumeData, measureOption] = useVolumeFromLocal(measureDefaultOption)

  const convert = conv.volumeToL
  const onCateChange = v => {
    setOption(v)
    setResult(null)
    data.current.volume = v < 2?0:volumeData[v-2]
  }

  const onResult = (type, v) => {
    if (result !== null) setResult(null)
    data.current[type] = v
    if (type === 'orginalPerV') data.current.perV = data.current.orginalPerV * convert[volume]
  }

  const onPerVChange = (v) => {
    if (result !== null) setResult(null)
    setVolume(v)
    data.current.perV = data.current.orginalPerV * convert[v]
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!data.current.dose || !data.current.perV || !data.current.volume) return 
    let res = (data.current.dose / data.current.perV * data.current.volume).toFixed(2)
    setResult(res)
  } 


  return (
    <>
      <Helmet>
        <title>药剂添加计算</title>
        <meta name="description" content="ReefAqua 药剂添加计算" />
      </Helmet>
      <div className="constrained--small">
        <form onSubmit={onSubmit} noValidate>
          <Select options={measureOption || []} onChange={onCateChange} defaultOption={option}/>
          {option === 0 && <Size onResult={onResult.bind(this, 'volume')}/>}
          {option === 1 && <Volume onResult={onResult.bind(this, 'volume')}/>}
          <h3>标量：</h3>
          <Option options={metrics.dose} placeholder="单位计量" icon={faTint} onChange={onResult.bind(this, 'dose')} onOption={(v) => setDose(v)} defaultOption={dose}/>
          <Option options={metrics.volume} placeholder="单位水体" icon={faFlask} onChange={onResult.bind(this, 'orginalPerV')} onOption={onPerVChange} defaultOption={volume}/>
          <h5>* 单位计量：例：推荐剂量为每76L添加5ml, 5ml为单位计量 </h5>
          <h5>* 单位水体：例：推荐剂量为每76L添加5ml, 76L为单位水体</h5>
          <h5>* G us: Gal 加仑 gallon - 美制 </h5>
          <h5>* G uk: Gal 加仑 gallon - 英制 </h5>
          <h5>* O us: Oz 盎司 ounce - 美制</h5>
          <h5>* O uk: Oz 盎司 ounce - 英制</h5>
          <h5>* inch: 英寸</h5>
          <h5>* foot: 英尺</h5>
          <h5>* 计算结果仅供参考, 本平台不承担任何责任。</h5>
          <button>计算</button>
        </form>
        {result && <>
          <Static value={`容积：${data.current.volume}L`}/>
          <Static value={`药剂添加: ${result}${metrics.dose[dose]}`}/>
        </>}
      </div>
      
      
    </>
  )
}
