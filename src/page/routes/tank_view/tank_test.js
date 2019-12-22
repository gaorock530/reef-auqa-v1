import React from 'react'

export default () => {
  return (
    <div className="tank-view-block tank-view-info">
      <span >最后测试数据</span>
      <span><label>温度</label>:<b>25C°</b><i className="green"></i></span>
      <span><label>PH</label>:<b>8.1</b><i className="yellow"></i></span>
      <span><label>NH4</label>:<b>0.1ppm</b><i className="red"></i></span>
      <span><label>NO2</label>:<b>0.5ppm</b><i className="yellow"></i></span>
      <span><label>NO3</label>:<b>10ppm</b><i className="yellow"></i></span>
      <span><label>PO4</label>:<b>0.1ppm</b><i className="red"></i></span>
      <span><label>盐度</label>:<b>1.026</b><i className="green"></i></span>   
      <span><label>KH</label>:<b>8.5dKH</b><i className="green"></i></span>          
      <span><label>Ca</label>:<b>420ppm</b><i className="red"></i></span>
      <span><label>Mg</label>:<b>1350ppm</b><i className="yellow"></i></span>
    </div>
  )
}