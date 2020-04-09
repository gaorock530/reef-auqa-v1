import React, { useState, useRef } from 'react'
import Slider from "react-slick"


export default ({data = [], onClick}) => {
  const [preview, setPreview] = useState()
  const readyToView = useRef(null) 

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, color: 'red', right: '20px' }}
        onClick={onClick}
      />
    );
  }
  
  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, left: '20px', zIndex: 1}}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  }

  const close = e => {
    setPreview(undefined)
  }

  const onMouseDown = v => {
    readyToView.current = v
  }

  const onMouseUp = () => {
    if (readyToView.current === null) return
    if (onClick) onClick(readyToView.current)
    setPreview(readyToView.current)
  }

  const onMouseMove = () => {
    if (readyToView.current !== null) readyToView.current = null
  }

  const renderList = () => data.map((img, index) => <img key={index} className="tank-view-cover-item" src={img.cover} alt="123" onMouseDown={onMouseDown.bind(this, index)} onMouseUp={onMouseUp} onMouseMove={onMouseMove}></img>)

  return (
    <>
      {preview !== undefined && <div className="photo-fullsize" onClick={close}>
        <img alt="fullsize" src={data[preview].fullsize} />
      </div>}
      <Slider {...settings}>
        {renderList()}
      </Slider>
    </>
  )
}