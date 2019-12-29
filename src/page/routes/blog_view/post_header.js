import React, {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faHeart, faShare} from '@fortawesome/free-solid-svg-icons'
import {useLocation} from 'react-router-dom'
import QRCode from 'qrcode.react'
import formatTime from '../../../helper/formatTime'

export default ({data}) => {
  const location = useLocation()
  const [like, setLike] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const renderTags = (tags = []) => tags.map((tag, index) => <label key={index}>#{tag}</label>)
  const date = formatTime(data.date)?formatTime(data.date)+'前':'刚刚'
  const shareDiv = useRef()
  // REPLACE URL in PRODUCTION !!!
  const shareAddress = 'http://192.168.1.108:3000/blogs?shareID=alsfowriowierksdfkl'
  console.log(location.pathname)

  useEffect(() => {
    if (!showShare) return
    /**
     * Canvas version
     */
    const share = shareDiv.current.childNodes[0]
    const base64 = share.toDataURL()
    const download = document.createElement('img')
    download.src = base64
    shareDiv.current.appendChild(download)
    
    /**
     * SVG version
     */
    // const share = shareDiv.current.childNodes[0]
    // const header = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
    // share.setAttribute("version", "1.1");
    // share.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    // share.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    // const innerHTML = shareDiv.current.innerHTML

    // const svg = new Blob([header,innerHTML], {type: "image/svg+xml;charset=utf-8"});
    // // const svgFile = new File([svg], 'share.svg', {type: "image/svg+xml"})
    // // console.log(svgFile)
    // const url = window.URL.createObjectURL(svg);

    // const download = document.createElement('img')
    // download.src = url
    // download.style.width = '256px'
    // // download.download = 'v.svg'
    // shareDiv.current.appendChild(download)
    // // console.log(url)
    // return () => {
    //   window.URL.revokeObjectURL(url)
    // }
      
  }, [showShare])

  return (
    <div className="post-header">
      {showShare && <div className="post-share" onClick={() => setShowShare(!showShare)} ref={shareDiv}> 
        <QRCode
          bgColor="#fff"
          fgColor="#000"
          // renderAs="svg"
          level="Q"
          size={256}
          value={shareAddress}
        /> 
      </div>}
      <h3>{data.title}</h3>
      <div className="author">
        <picture></picture>
        <h4>
          <span>Magic</span><b>•</b><i>{date}</i>
        </h4>
        
      </div>
      <h5>{renderTags(data.tags)}</h5>
      <p>
        <span><FontAwesomeIcon icon={faEye}/>1000</span>
        <span onClick={() => setLike(!like)} className="pointer"><i className={like?"red-c":null}><FontAwesomeIcon icon={faHeart}/></i>1000</span>
        <span className="pointer" onClick={() => setShowShare(!showShare)}><FontAwesomeIcon icon={faShare}/>234</span>
      </p>
    </div>
  )
}