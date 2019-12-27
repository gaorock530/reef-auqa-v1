import React, {useRef, useEffect} from 'react'
// import Jimp from 'jimp'
import processImage from '../helper/processImage'
// const workerInstance = new Worker('/photoWorker.js')


/**
 * @param {Component} props.children
 * @param {String} props.id required if multiple photo input
 * @param {Function} props.onSelect
 * @param {String} props.className
 * @param {Base64|Url} props.pic
 */

export default ({children, id = 'upload', onSelect, className, pic}) => {
  
  const cover = useRef()
  const accept = ['image/gif', 'image/jpeg', 'image/png']
  const display = useRef()

  useEffect(() => {
    return () => {
      window.URL.revokeObjectURL(display.current)
      display.current = undefined
    }
  })
  
  const onChoose = async (e) => {
    if (display.current) window.URL.revokeObjectURL(display.current)
    
    const input = e.target.files[0]
    
    if (!input || !~accept.indexOf(input.type)) return
  
    display.current = window.URL.createObjectURL(input)
    // console.log(display.current)
    cover.current.style.backgroundImage = `url(${display.current})`
    
    const output = await processImage(input)
    if (onSelect) onSelect(output)
    
  }
  
  return (
    <div className={className || "file-input-wrapper"}>
      <input type="file" id={id}  onChange={onChoose} className="file-input" />
      <label htmlFor={id} className={className?"file-input-target--withclass":"file-input-target"} ref={cover} style={pic?{backgroundImage: `url(${pic})`}:null}>
        <span>
          {children}
        </span>
      </label>
      
    </div>
  )
}