import React, {useRef, useEffect} from 'react'
import Jimp from 'jimp'
const workerInstance = new Worker('/photoWorker.js')

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
  let display
  useEffect(() => {
    return () => {
      window.URL.revokeObjectURL(display)
    }
  })
  const onChoose = (e) => {
    if (display) window.URL.revokeObjectURL(display)
    
    const input = e.target.files[0]
    
    if (!input || !~accept.indexOf(input.type)) return
    if (window.Worker) {
      workerInstance.postMessage(input)
      workerInstance.onmessage = e => {
        if (onSelect) onSelect(e.data)
      }
    } else {
      const reader = new FileReader()
      reader.addEventListener("loadend",async () => {
          // reader.result contains the contents of blob as a typed array
          const pic = await Jimp.read(reader.result)
          pic.resize(1200, Jimp.AUTO, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
          pic.quality(50)
          const newPic = await pic.getBufferAsync(Jimp.MIME_JPEG)
          const newFile = new Blob([newPic], {type: "image/jpeg"})
          if (onSelect) onSelect(newFile)
          // console.log(window.URL.createObjectURL(newFile))
      }, {once: true});
      reader.readAsArrayBuffer(input)
    }
    // const pic = await Jimp.read(input)
    display = window.URL.createObjectURL(input)
    // console.log(display)
    cover.current.style.backgroundImage = `url(${display})`
    
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