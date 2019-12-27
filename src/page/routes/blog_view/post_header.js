import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faHeart, faShare} from '@fortawesome/free-solid-svg-icons'
import { QRCode } from "react-qr-svg"
import formatTime from '../../../helper/formatTime'

export default ({data}) => {
  const [like, setLike] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const renderTags = (tags = []) => tags.map((tag, index) => <label key={index}>#{tag}</label>)
  const date = formatTime(data.date)?formatTime(data.date)+'前':'刚刚'

  // REPLACE URL in PRODUCTION !!!
  const shareAddress = 'http://192.168.1.108:3000/blogs?shareID=alsfowriowierksdfkl'


  return (
    <div className="post-header">
      {showShare && <div className="post-share" onClick={() => setShowShare(!showShare)}> 
        <QRCode
          bgColor="#fff"
          fgColor="#000"
          level="Q"
          style={{ width: 256 }}
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