import React from 'react'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet"
import Spinner from '../../components/animate/spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faFrown, faFeatherAlt, faVideo } from '@fortawesome/free-solid-svg-icons'
import useBlogsData from '../../hooks/useBlogsData'

export default () => {
  const title = "我的赞"
  const data = useBlogsData()

  const renderSlug = (slugs = []) => slugs.map((slug, index) => <span key={index}>#{slug}</span>)
  
  
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

  const renderBlogs = () => data.map(l => <Blog key={l.id} item={l}/>)
  
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`} />
      </Helmet>
      {data?(data.length>0?<div className="blog-list-container">{renderBlogs()}</div>:
      <span className="tank-tips">
        <i>您还没有</i><FontAwesomeIcon icon={faFrown} size="2x"/><i>赞过别人</i>
      </span>):<Spinner/>}
    </>
  )
}