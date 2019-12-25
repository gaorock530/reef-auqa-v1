import React from 'react'
// import { Link } from 'react-router-dom'
import Body from '../body'
import {Helmet} from "react-helmet"
// import Spinner from '../../components/animate/spinner'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEye, faHeart, faFrown } from '@fortawesome/free-solid-svg-icons'


export default () => {
  const title = "分享标题"


  return (
    <Body>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`} />
      </Helmet>
      <div>
        blog view
      </div>
    </Body>
  )
}