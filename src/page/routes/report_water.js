import React, {useRef} from 'react'
import {Helmet} from "react-helmet"
import City from '../../components/city'
import Option from '../../components/form/optionInput'

export default () => {
  const title = "水质报告"

  const data = useRef({})


  const onSelect = v => {
    console.log(v)
    data.current.city = v
  }

  const onChange = v => {
    console.log(v)
    data.current.tds = v
  }

  const onSubmit = e => {
    e.preventDefault()
    console.log(data.current)
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <form className="constrained--small" onSubmit={onSubmit}>
        <h3>地区:</h3>
        <City onSelect={onSelect}/>
        <h3>家用自来水TDS:</h3>
        <Option options="ppm" onChange={onChange}/>
        <h5>* TDS: 总溶解固体（英文：Total dissolved solids，缩写TDS），又称溶解性固体总量，测量单位为毫克/升（mg/L）,它表明1升水中溶有多少毫克溶解性固体。TDS值越高，表示水中含有的溶解物越多。 总溶解固体指水中全部溶质的总量，包括无机物和有机物两者的含量。</h5>
        <h5>* 换算关系：1mg/l=1PPM</h5>
        <h5>---</h5>
        <h5>0~9 纯净水</h5>
        <h5>10~60 山泉水、矿化水</h5>
        <h5>60~100 净化水</h5>
        <h5>100~300 自来水</h5>
        <h5>300以上 污染水</h5>
        <button>提交</button>
      </form>
    </>
  )
}