import React, { useState } from 'react'
import Slider from '../../../components/slider'
import Reply from '../../../components/reply'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faCaretSquareDown} from '@fortawesome/free-solid-svg-icons'
import formatTime from '../../../helper/formatTime'


export default () => {
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])

  const data = [
    {cover: "/assets/pic/fish.png", fullsize: '/assets/pic/fish.png'}, 
    {cover: "/assets/pic/fish.png", fullsize: '/assets/pic/fish.png'}, 
    {cover: "/assets/pic/fish.png", fullsize: '/assets/pic/fish.png'}, 
    {cover: "/assets/pic/fish.png", fullsize: '/assets/pic/fish.png'}, 
    {cover: "http://www.cmfish.com/kinds/fish_l/t.jpg", fullsize: 'http://www.cmfish.com/kinds/fish_l/t.jpg'}, 
  ]

  const onClick = v => {
    console.log(v)
  }

  const onPublish = v => {
    setComments([v, ...comments])
  }

  const onLike = id => {
    const newLikes = [...likes]

    const index = likes.indexOf(id)
    if (~index) {
      newLikes.splice(index, 1)
    } else {
      newLikes.push(id)
    }

    const newCommends = comments.map(com => {
      if(com.id === id) {
        com.like = !~index?com.like+1:com.like-1
      } else if (com.reply !== null){
        com.reply.map(sub => {
          if (sub.id === id) sub.like = !~index?sub.like+1:sub.like-1
          return sub
        })
      }
      return com
    })
    
    setLikes(newLikes)
    setComments(newCommends)
  }

  return (
    <div className="info-content">
      <div className="info-main">
        <div className="info-wrapper">
          <div className="info-content-cover"></div>
        </div>
        <div className="info-wrapper">
          <div className="info-detail">
            <h3>公子小丑</h3>
            <h5><span>英文：Ocellaris Clownfish</span><span>学名：Amphiprion ocellaris</span></h5>
            <ul>
              <li>饲养难度：容易</li>
              <li>食物要求：杂食</li>
              <li>盐度: 1.020~1.025</li>
              <li>KH: 8.1~8.4</li>
              <li>种属：雀鲷科</li>
              <li>主要产地：印度洋，西太平洋</li>
            </ul>
            <ul>
              <li>最小水体：90升</li> 
              <li>性情：温和</li>
              <li>成体尺寸：8厘米</li>
              <li>珊瑚缸兼容：安全</li>
              <li>Ca：440ppm</li>
              <li>Mg: 1280ppm</li>
              <li>PO4: &#60;0.03ppm</li>
              <li>NO3: &#60;10ppm</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="info-gallary">
        {data && <Slider data={data} onClick={onClick}/>}
      </div>
      <div className="info-paragragh">
        <p>也叫海葵鱼，在水族爱好者中特别受欢迎，在印度洋到太平洋是很普遍的与海葵共生的海水鱼，能长到8厘米。有时被当作黑边公子小丑卖，虽然它们不是一种。这两种鱼的颜色很接近，但它不是亮桔色，公子小丑更好养。在水族箱中繁殖的公子小丑颜色更鲜艳，但有时会有条纹消失，通常为一、二条或两边条纹不对称，会给繁育者很多惊喜。随着鱼龄的增长，颜色会逐渐加深成为橘色。</p>
        <p>它是一种生命力很强的小丑鱼，是新手的很好选择，与海葵相处很容易相处，很适合混养但最好不要和肉食凶猛的鱼放一起。如果想多放几只，需要同时入缸。大部分小丑鱼都很容易饲养，是新手开始海水之旅的钥匙。</p>
        <p>很容易在水族箱产卵。虽然没有明显的外部特征来区分公母，但母的一般是一对中比较大的那只。它们的特点是出生的鱼不分公母，随着成长，占统治地位的小丑会变成母的。亲鱼会把卵放在寄居的海葵呼吸口处，利用海葵保护卵。卵呈现茶绿色，温度不同孵化时间也会不同，大约6-11天时间。刚孵出的幼鱼必须分缸饲养，用轮虫饲喂，最好不要用丰年虾幼虫。</p>
        <p>公子小丑很能抢食，可以吃大部分肉食及海藻、冰鲜的也可。</p>
      </div>
      <div className="info-comments">
        <h3>经验分享</h3>
        <Reply onReply={onPublish}/>
        <div className="post-comments-list">
          <RenderComments reply={comments} likes={likes} onLike={onLike}/>
        </div>
      </div>
    </div>
  )
}

/**
 * 
 * @param {Array} reply list of comments replied
 * @param {Array} likes all likes that user hitted, indicates like status on a comment
 * @param {Function} onLike hit like button action
 */

function RenderComments ({reply, likes = [], onLike}) {
  return reply.map(comment => <RenderComment comment={comment} key={comment.id} onLike={onLike} likes={likes} />)
}

function RenderComment ({comment, likes = [], onLike}) {

  const onHitLike = id => {
    if (onLike) onLike(id)
  }

  return (
    <div className="post-comment info-comment">
      <label style={comment.cover?{backgroundImage: `url(${comment.cover})`}:null}></label>
      <div className="post-comment-content">
        <h5>
          <span>{comment.user}</span>
          <b>•</b>
          <i>{formatTime(comment.date)?formatTime(comment.date)+'前':'刚刚'}</i>
          <label className="info-comments-like" onClick={onHitLike.bind(this, comment.id)}><FontAwesomeIcon icon={faThumbsUp} className={~likes.indexOf(comment.id)?'red-c':undefined}/><span>{comment.like}</span></label>
        </h5>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}