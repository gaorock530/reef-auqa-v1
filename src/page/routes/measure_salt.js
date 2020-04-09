import React, {useState, useRef} from 'react'
import {Helmet} from "react-helmet"
import {measureDefaultOption} from '../../helper/constVar'
import useVolumeFromLocal from '../../hooks/useVolumeFromLocal'

import Static from '../../components/form/static'
import Select from '../../components/form/select'

import Size from './measure_drug/size'
import Volume from './measure_drug/volume'




export default () => {
  const title = "海盐计算"
  const [option, setOption] = useState(1)
  const volume = useRef(0)
  const [result, setResult] = useState(null)

  const [volumeData, measureOption] = useVolumeFromLocal(measureDefaultOption)


  const onCateChange = v => {
    setOption(v)
    setResult(null)
    volume.current = v < 2?0:volumeData[v-2]
  }

  const onResult = v => {
    if (result !== null) setResult(null)
    volume.current = v
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!volume.current) return 
    let res = volume.current * 33.3333333
    let doseUnit, dose
    if(Math.floor(res).toString().length>3) {
      doseUnit = 'kg';
      dose = (res / 1000).toFixed(2);
    } else {
      doseUnit = 'g';
      dose = res.toFixed(2);
    }
    setResult(dose + doseUnit)
  } 


  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div className="constrained--small">
        <form onSubmit={onSubmit} noValidate>
          <Select options={measureOption} onChange={onCateChange} defaultOption={option}/>
          {option === 0 && <Size onResult={onResult}/>}
          {option === 1 && <Volume onResult={onResult}/>}
          
          <h5>* 计算结果仅供参考，本平台不承担任何责任。</h5>
          <button>计算</button>
        </form>
        {result && <>
          <Static value={`鱼缸容积: ${volume.current}L`}/>
          <Static value={`海盐添加: ${result}`}/>
        </>}
      </div>
    </>
  )
}
