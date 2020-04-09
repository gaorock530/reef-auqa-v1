import React, {useRef, useEffect} from 'react'
import {Helmet} from "react-helmet";
import {isApple} from '../helper/constVar'

export default () => {
  const video = useRef()
  const cover = useRef()
  
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
    <>
      <Helmet>
        <title>首页</title>
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
    </>
  )
}