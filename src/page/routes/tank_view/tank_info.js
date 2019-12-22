import React from 'react'

export default ({data}) => {
  return (
    <div className="tank-view-block tank-view-info">
      <span><label>名称</label>:<b>{data.name}</b></span>
      <span><label>类型</label>:<b>{data.type?'海水':'淡水'}</b></span>
      <span><label>尺寸</label>:<b>{data.size}</b></span>
      <span><label>容积</label>:<b>{data.volume+"L"}</b></span>
      <span><label>图片</label>:<b>{data.photo || '0'}</b></span>
      <span><label>状态</label>:<b>{data.status || '全新'}</b></span>          
      <span><label>浏览</label>:<b>{data.view || '0'}</b></span>
      <span><label>喜欢</label>:<b>{data.like || '0'}</b></span>
      <span><label>已运行</label>:<b>{data.run || 0}天</b></span>
      <span><label>距离上次水质测试</label>:<b>{data.last || 0}天</b></span>
    </div>
  )
}