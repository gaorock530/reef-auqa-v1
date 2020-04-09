import React from 'react'
import { Link } from 'react-router-dom'

import {Helmet} from "react-helmet"
import Spinner from '../../components/animate/spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faHeart, faFrown, faFeatherAlt, faVideo } from '@fortawesome/free-solid-svg-icons'

// import cuid from 'cuid'
import useBlogsData from '../../hooks/useBlogsData'

export default () => {
  const title = "分享列表"
  const data = useBlogsData()

  const renderSlug = slugs => slugs.map((slug, index) => <span key={index}>#{slug}</span>)
  
  
  const Blog = ({item}) => (
    <Link className="blog-overview" to={`/blog/${item.id}`}>
      <div className="blog-list-cover" style={{backgroundImage: `url(${item.cover || ''})`}}></div>
      <div className={`blog-list-type ${item.cate?'red-c': 'green-c'}`} alt="blog"><FontAwesomeIcon icon={item.cate?faVideo:faFeatherAlt}/></div>
      <div className="blog-list-info">
        <div className="blog-list-title">{`${item.title}`}</div>
        <div className="blog-list-slugs">{renderSlug(item.tags)}</div>
        <div className="blog-list-stats">
          <span>1周前</span>
          <label alt="view"><FontAwesomeIcon icon={faEye}/> {item.view || '0'}</label>
          <label><FontAwesomeIcon icon={faHeart}/> {item.like || '0'}</label>
        </div>
      </div>
    </Link>
  )

  const renderBlogs = () => data.map(l => {
    if (l.id === 'temp') return null
    return <Blog key={l.id} item={l}/>
  })
  
  
  

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`} />
      </Helmet>
      <Link to="/blog/create" className="blog-add-new"><FontAwesomeIcon icon={faPlus} size="2x"/></Link>
      {data?(data.length>0?<div className="blog-list-container">{renderBlogs()}</div>:
      <span className="tank-tips">
        <i>您还没有</i><FontAwesomeIcon icon={faFrown} size="2x"/><i>创建分享</i>
      </span>):<Spinner/>}
    </>
  )
}

