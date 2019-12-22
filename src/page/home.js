import React, {useRef, useEffect, useContext} from 'react'
import {AuthContext} from '../context/LoginContext'
import {Helmet} from "react-helmet-async";
import {isApple} from '../helper/constVar'
import Body from './body'

export default () => {
  const video = useRef()
  const cover = useRef()
  const [{page}] = useContext(AuthContext)
  
  const playvideo = () => {
    video.current.play()
    if (isApple) cover.current.style.display = 'none'
  }

  // console.log(page)
  useEffect(() => {
    document.addEventListener('touchstart', playvideo, {once: true})
    return () => {
      document.removeEventListener('touchstart', playvideo)
    }
  }, [])

  return (
    <Body>
      <Helmet>
        <title>{page}</title>
        <meta name="description" content="ReefAqua" />
      </Helmet>
      <div className="video-header">
        <video ref={video} preload="auto" playsInline autoPlay loop muted poster="assets/pic/chasingcoralherobanner-736x414.jpg" controls={false}>
          <source type="video/mp4" src="assets/video/chasingcoral.mp4"></source>
          <source type="video/webm" src="assets/video/chasingcoral.webm"></source>
        </video>
        {isApple && <div className="video-header-poster" ref={cover}></div>}
        <div className="video-header-content"></div>
      </div>
      <div>asdasdsa</div>
    </Body>
  )
}