import React, {useState, useRef} from 'react'
import {Helmet} from "react-helmet";
import {measureDefaultOption} from '../../helper/constVar'
import useVolumeFromLocal from '../../hooks/useVolumeFromLocal'

import Static from '../../components/form/static'
import Select from '../../components/form/select'

import Size from './measure_drug/size'
import Volume from './measure_drug/volume'



export default () => {
  // const [{page}] = useContext(AuthContext)
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
    const flow = {intankMin: volume.current * 10, intankMax: volume.current * 50, turnoverMin: volume.current * 5, turnoverMax: volume.current * 20}
    setResult(flow)
  } 


  return (
    <>
      <Helmet>
        <title>水流计算</title>
        <meta name="description" content="ReefAqua 水流计算" />
      </Helmet>
      <div className="constrained--small">
        <form onSubmit={onSubmit} noValidate>
          <Select options={measureOption} onChange={onCateChange} defaultOption={option}/>
          {option === 0 && <Size onResult={onResult}/>}
          {option === 1 && <Volume onResult={onResult}/>}
          <h5>* 缸内水流：in-tank flow, 通常指造浪，出水口流量等在浴缸内水流量。</h5>
          <h5>* 循环水流：turnover, 指从底缸或背滤等过滤系统到主缸的循环水流量。</h5>
          <h5>* 计算结果仅供参考，本平台不承担任何责任。</h5>
          <button>计算</button>
        </form>
        {result && <>
          <Static value={`鱼缸容积: ${volume}L`}/>
          <Static value={`缸内水流: ${result.intankMin}L ~ ${result.intankMax}L`}/>
          <Static value={`循环水流: ${result.turnoverMin}L ~ ${result.turnoverMax}L`}/>
        </>}
      </div>
      
    </>
  )
}
