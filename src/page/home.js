import React, {useRef, useEffect} from 'react'
import {Helmet} from "react-helmet";
import Body from './body'

export default ({page}) => {
  const video = useRef()
  const cover = useRef()
  const isApple = /iPhone|iPod|iPad/.test(navigator.userAgent)
  console.log(page)
  useEffect(() => {
    document.addEventListener('touchstart', () => {
      video.current.play()
      if (isApple) cover.current.style.display = 'none'
    }, {once: true})
  })

  return (
    <Body>
      <Helmet>
        <title>{page}</title>
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