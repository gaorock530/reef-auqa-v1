import React, {useState} from 'react'
import {Helmet} from "react-helmet";
import {metrics as metri, convert as conv} from '../../helper/constVar'
import Body from '../body'
import Input from '../../components/form/input'
import Option from '../../components/form/optionInput'
import Static from '../../components/form/static'

import { faRulerVertical, faRulerHorizontal, faRuler } from '@fortawesome/free-solid-svg-icons'


export default () => {
  const [result, setResult] = useState(null)
  const [data, setData] = useState({
    TensileStrength: 19.3,
    SafetyFactor: 3.8,
    //Modulus of Elasticity:69GPa
    Elasticity: 69,
    length: 0,
    width: 0,
    height: 0
  })
  
  const [metrics, setMetrics] = useState(0)

  const demension = metri.length
  const convert = conv.lengthToM
  const unit = 1

 

  const onChange = (type, v) => {
    if (result) setResult(null)
    const newData = data
    newData[type] = Number(v)
    setData(newData)
  } 

  const onOptionChange = v => {
    if (result) setResult(null)
    setMetrics(v)
  }
  /*
  // sides
  a/b	beta	alpha
  0.0	0.085	0.003
  0.5	0.085	0.003
  0.7	0.116	0.009
  1.0	0.160	0.022
  1.5	0.260	0.042
  2.0	0.320	0.056
  2.5	0.350	0.063
  3.0	0.370	0.067
  // Bottom
  l/w	beta	  alpha
  1.0	0.4530	0.0770
  1.5	0.5172	0.0906
  2.0	0.5688	0.1017
  2.5	0.6102	0.1110
  3.0	0.7134	0.1335
  */
  const ratio = (ratio, bottom = false) => {
    switch (true) {
      case ratio<0.666:
        return {alpha: 0.003,beta: 0.085};
      case ratio>=0.666 && ratio<1:
        return {alpha: 0.0085,beta: 0.1156};
      case ratio>=1 && ratio<1.5:
        if (!bottom) return {alpha: 0.022,beta: 0.16};
        else return {alpha: 0.077,beta: 0.453};
      case ratio>=1.5 && ratio<2:
        if (!bottom) return {alpha: 0.042,beta: 0.26};
        else return {alpha: 0.0906,beta: 0.5172};
      case ratio>=2 && ratio<2.5:
        if (!bottom) return {alpha: 0.056,beta: 0.32};
        else return {alpha: 0.1017,beta: 0.5688};
      case ratio>=2.5 && ratio<3:
        if (!bottom) return {alpha: 0.063,beta: 0.35};
        else return {alpha: 0.111,beta: 0.6102};
      case ratio>=3:
        if (!bottom) return {alpha: 0.067,beta: 0.37};
        else return {alpha: 0.1335,beta: 0.7134};
      default:
        return {alpha: 0.003,beta: 0.085};
    }
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    let valid = true
    for (let key in data) {
      if (!data[key]) {
        valid = false
        break
      }
    }
    if (!valid) return
    /*
    Length in mm (L):The length of the aquarium.
    Width in mm (W):The width of the aquarium from front to back.
    Height in mm (H):The overall depth of water that is in contact with the glass, but does not exceed its upper edge.
    Thickness in mm (t):The thickness of the Glass.
    Water Pressure (p):The force in Newton's (N).
    Allowed Bending Stress (B):Tensile Strength / Safety Factor
    Modulus of Elasticity (E):Elastic Strength
    */
    const length = data.length * convert[metrics]
    const width = data.width * convert[metrics]
    const height = data.height * convert[metrics]
    const calculate = {}
    calculate.volume = length * width * height * 1000  // L
    calculate.area = length * height * 2 + width * height * 2 + length * width // m²
    // L/W for side panels
    const ratioS = ratio((Math.max(length, width) * 1000 * unit) / (Math.min(length, width) * 1000))
    // L/H for bottom panel
    const ratioB = ratio((Math.max(length, width) * 1000 * unit) / (height * 1000), true)
    // The water pressure (p) is directly proportional to the Height (H) x the force of gravity (approx 10 (9.81 for people who want to be exact)).
    const p = height * 1000 * unit * 9.81 // in N/mm2
    // The bending stress allowed (B) is equal to the Tensile Strength of glass / safety factor.
    const B = data.TensileStrength / data.SafetyFactor // N/mm2 (Safety factor = 3.8)
    // The thickness of the glass (t) is proportional to the (square root of width factor (beta) x height (H) cubed x 0.00001 / allowable bending stress (B)).
    const tS = Math.sqrt(ratioS.beta * Math.pow(height * 1000 * unit, 3) * 0.00001 / B) // in mm.

    /*
      Select beta and alpha from the previous chart based on the length to height ratio.
      The deflection of the glass is proportional to

      (alpha x water pressure (p) x 0.000001 x Height4)
      --------------------------------------------------
      (Modulus of elasticity (E) x Thickness (t) cubed).
    */
    const DeflectionS = (ratioS.alpha * p * 0.000001 * Math.pow(height * 1000 * unit, 4)) /
                        (data.Elasticity * 1000 * Math.pow(tS, 3))

    const tB = Math.sqrt(ratioB.beta * Math.pow(height * 1000 * unit, 3) * 0.00001 / B)
    const DeflectionB = (ratioB.alpha * p * 0.000001 * Math.pow(height * 1000 * unit, 4)) /
                        (data.Elasticity * 1000 * Math.pow(tB, 3))
    calculate.glassS = Math.round(tS)
    calculate.glassB = Math.round(tB)
    calculate.DeflectionS = DeflectionS.toFixed(2)
    calculate.DeflectionB = DeflectionB.toFixed(2)
    setResult(calculate)
  } 


  return (
    <Body>
      <Helmet>
        <title>玻璃厚度计算</title>
        <meta name="description" content="ReefAqua 玻璃厚度计算" />
      </Helmet>
      <div className="constrained--small">
        <form onSubmit={onSubmit} noValidate>
          <h3>安全系数: 一般采用3.8</h3>
          <Input defaultValue={data.SafetyFactor} type="number" onChange={onChange.bind(this, 'SafetyFactor')}/>
          <h3>拉伸强度: 一般浮法玻璃的拉伸强度为19.3~28.4MPa，钢化玻璃为~175MPa</h3>
          <Input defaultValue={data.TensileStrength} type="number" onChange={onChange.bind(this, 'TensileStrength')}/>
          <h3>弹性系数: 一般玻璃弹性系数为69GPa</h3>
          <Input defaultValue={data.Elasticity} type="number" onChange={onChange.bind(this, 'Elasticity')}/>
          <Option icon={faRuler} placeholder="长度" options={demension} onChange={onChange.bind(this, 'length')} onOption={onOptionChange} defaultOption={metrics}/>
          <Option icon={faRulerHorizontal} placeholder="宽度" options={demension} onChange={onChange.bind(this, 'width')} onOption={onOptionChange} defaultOption={metrics}/>
          <Option icon={faRulerVertical} placeholder="高度" options={demension} onChange={onChange.bind(this, 'height')} onOption={onOptionChange} defaultOption={metrics}/>
          <h5>* 计算结果仅供参考，本平台不承担任何责任。由于玻璃质量、结构缺陷或制作工艺引起的问题更不属于讨论的范围。</h5>
          <button>计算</button>
        </form>
        {result && <>
          <Static value={`玻璃面积：${result.area}m²`}/>
          <Static value={`水体容积：${result.volume}L`}/>
          <Static value={`侧面厚度：${result.glassS}mm`}/>
          <Static value={`侧面位移：${result.DeflectionS}mm`}/>
          <Static value={`底面厚度：${result.glassB}mm`}/>
          <Static value={`底面位移：${result.DeflectionB}mm`}/>
        </>}
      </div>
    </Body>
  )
}
