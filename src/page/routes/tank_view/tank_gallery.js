import React, { useContext } from 'react'
import Slider from "react-slick"
import Photo from '../../../components/photo'
import {TankContext} from '../../../context/TankContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons'

export default ({data}) => {
  const auth = useContext(TankContext)
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
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  }
  return (
    <>
      {auth?<Photo className="tank-view-block" pic={data.cover}>
        <FontAwesomeIcon icon={faImage} size="2x"/><h5>更换封面</h5>
      </Photo>:
      <div className="tank-view-block tank-view-cover" style={{backgroundImage: `url(${data.cover})`}}></div>}
      <div className="tank-view-block tank-view-cover-list">
        <Slider {...settings}>
            <img className="tank-view-cover-item" src={data.cover} alt="123"></img>
            <img className="tank-view-cover-item" src={data.cover} alt="123"></img>
            <img className="tank-view-cover-item" src={data.cover} alt="123"></img>
            <img className="tank-view-cover-item" src={data.cover} alt="123"></img>
            <img className="tank-view-cover-item" src={data.cover} alt="123"></img>
            <img className="tank-view-cover-item" src={data.cover} alt="123"></img>
        </Slider>
      </div>
    </>
  )
}