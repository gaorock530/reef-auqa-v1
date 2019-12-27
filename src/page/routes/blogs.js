import React from 'react'
import { Link } from 'react-router-dom'
import Body from '../body'
import {Helmet} from "react-helmet"
import Spinner from '../../components/animate/spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faHeart, faFrown, faFeatherAlt, faVideo } from '@fortawesome/free-solid-svg-icons'

// import cuid from 'cuid'
import useBlogsData from '../../hooks/useBlogsData'


// const data = [
//   {
//     id: 1001,
//     title: 'asd',
//     cover: '/assets/pic/tankcover.png',
//     cate: 0,
//     data: Date.now(),
//     view: 0,
//     like: 0,
//     tags: ['海水'],
//     favorite: 0,
//   },
//   {
//     id: 1002,
//     title: 'd阿深刻的理解立案登记阿里斯顿家啊三德科技阿索朗多吉阿斯利康多久',
//     cover: '/assets/pic/tankcover.png',
//     cate: 0,
//     data: Date.now(),
//     view: '1,323万',
//     like: '12,300',
//     tags: ['海水'],
//     favorite: 0,
//   },
//   {
//     id: 1003,
//     title: '123aa',
//     cover: '/assets/pic/tankcover.png',
//     cate: 1,
//     data: Date.now(),
//     view: '1,333,333',
//     like: '1,230',
//     tags: ['海水'],
//     favorite: 0,
//   },
//   {
//     id: 1004,
//     title: '123sd',
//     cover: '/assets/pic/tankcover.png',
//     cate: 0,
//     data: Date.now(),
//     view: 0,
//     like: 0,
//     tags: ['海水'],
//     favorite: 0,
//   },
//   {
//     id: 1005,
//     title: '12a123',
//     cover: '/assets/pic/tankcover.png',
//     cate: 0,
//     data: Date.now(),
//     view: 0,
//     like: 0,
//     tags: ['海水'],
//     favorite: 0,
//   },
//   {
//     id: 1006,
//     title: 'I love this tank is bueatifully done. espasin #1',
//     cover: '/assets/pic/tankcover.png',
//     cate: 1,
//     data: Date.now(),
//     view: 0,
//     like: 0,
//     tags: ['海水'],
//     favorite: 0,
//   },
//   {
//     id: 1007,
//     title: '12as卡丝123123123zcscs阿阿实打实的dasd阿斯顿的‘3',
//     cover: '/assets/pic/tankcover.png',
//     cate: 0, // 0 - article 1 - vlog
//     data: Date.now(),
//     view: 0,
//     like: 0,
//     tags: ['海水','小丑鱼'],
//     favorite: 0,
//   },
//   {
//     id: 1007,
//     title: '12as卡丝123123123zcscs阿阿实打实的dasd阿斯顿的‘3',
//     cover: '/assets/pic/tankcover.png',
//     cate: 0, // 0 - article 1 - vlog
//     data: Date.now(),
//     view: 0,
//     like: 0,
//     tags: ['海水','检疫'],
//     favorite: 0,
//   },
//   {
//     id: 1008,
//     title: '12as卡丝123123123zcscs阿阿实打实的dasd阿斯顿的‘3',
//     cover: '/assets/pic/tankcover.png',
//     cate: 0, // 0 - article 1 - vlog
//     data: Date.now(),
//     view: 300,
//     like: 123,
//     tags: ['海水'],
//     favorite: 0,
//   }
// ]

// function fakeData () {
//   const list = []
//   for(let i=0;i<50;i++) {
//     const index = Math.floor(Math.random() * 9)
//     const nd = {...data[index]}
//     nd.id = i
//     list.push(nd)
//   }
//   return list
// }

// const fakeList = fakeData()

export default () => {
  const title = "分享列表"
  const data = useBlogsData()

  const RenderSlug = ({slugs = []}) => slugs.map((slug, index) => <span key={index}>#{slug}</span>)
  
  
  const Blog = ({item}) => (
    <Link className="blog-overview" to={`/blog/${item.id}`}>
      <div className="blog-list-cover" style={{backgroundImage: `url(${item.cover || ''})`}}></div>
      <div className={`blog-list-type ${item.cate?'red-c': 'green-c'}`} alt="blog"><FontAwesomeIcon icon={item.cate?faVideo:faFeatherAlt}/></div>
      <div className="blog-list-info">
        <div className="blog-list-title">{`${item.title}`}</div>
        <div className="blog-list-slugs"><RenderSlug slugs={item.tags}/></div>
        <div className="blog-list-stats">
          <span>1周前</span>
          <label alt="view"><FontAwesomeIcon icon={faEye}/> {item.view || '0'}</label>
          <label><FontAwesomeIcon icon={faHeart}/> {item.like || '0'}</label>
        </div>
      </div>
    </Link>
  )

  const Blogs = () => data.map(l => {
    if (l.id === 'temp') return null
    return <Blog key={l.id} item={l}/>
  })
  
  
  

  return (
    <Body>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`} />
      </Helmet>
      <Link to="/blog/create" className="blog-add-new"><FontAwesomeIcon icon={faPlus} size="2x"/></Link>
      {data?(data.length>0?<div className="blog-list-container"><Blogs/></div>:
      <span className="tank-tips">
        <i>您还没有</i><FontAwesomeIcon icon={faFrown} size="2x"/><i>创建分享</i>
      </span>):<Spinner/>}
    </Body>
  )
}

