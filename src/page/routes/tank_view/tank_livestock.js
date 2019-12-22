import React from 'react'

export default ({data = []}) => {
  return data.length > 0 && (
    <div className="tank-view-block">您还没有添加设备</div>
  )
}