import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faCaretSquareDown, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import cuid from 'cuid'
import formatTime from '../../../helper/formatTime'


export default () => {
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])

  const onLike = id => {
    const newLikes = [...likes]

    const index = likes.indexOf(id)
    if (~index) {
      newLikes.splice(index, 1)
    } else {
      newLikes.push(id)
    }

    const newCommends = comments.map(com => {
      if(com.id === id) com.like = !~index?com.like+1:com.like-1
      return com
    })
    
    setLikes(newLikes)
    setComments(newCommends)
  }
  
  const onReply = reply => {
    if (reply.content === '') return
    setComments([reply, ...comments])
  }
  return (
    <div className="post-comments">
      <h3><span>{comments.length}</span>条评论</h3>
      <Reply onReply={onReply}/>
      <div className="post-comments-list">
        <RenderComments reply={comments} onLike={onLike} likes={likes}/>
      </div>
    </div>
  )
}

function RenderComments ({reply, likes, onLike}) {

  return reply.map(comment => (
    <div className="post-comment" key={comment.id}>
      <label style={comment.cover?{backgroundImage: `url(${comment.cover})`}:null}></label>
      <div className="post-comment-content">
        <h5><span>{comment.user}</span><b>•</b><i>{formatTime(comment.date)?formatTime(comment.date)+'前':'刚刚'}</i></h5>
        <p>{comment.content}</p>
        <div className="post-comment-utils">
          <FontAwesomeIcon icon={faThumbsUp} className={~likes.indexOf(comment.id)?'red-c':undefined} onClick={onLike.bind(this, comment.id)}/><span>{comment.like}</span>
          <label>回复</label><span>{comment.reply.length}</span>
          {comment.reply.length>0 && <FontAwesomeIcon icon={faCaretSquareDown}/>}
        </div>
        <div className="post-reply-list"></div>
      </div>
    </div>
  ))
}


function Reply ({onReply}) {
  const [reply, setReply] = useState('')
  const [disabled, setDisabled] = useState(true)

  const onReplyChange = e => {
    const msg = e.target.value
    if (msg.trim() !== '' && disabled) setDisabled(false)
    else if (msg.trim() === '' && !disabled) setDisabled(true)
    setReply(msg)
  }

  const onSubmit = () => {
    if (reply === '') return
    const replyObj = {
      id: cuid.slug(),
      date: Date.now(),
      user: 'Magic',
      cover: '',
      content: reply,
      like: 0,
      reply: []
    }
    setReply('')
    setDisabled(true)
    if (onReply) onReply(replyObj)
  }

  return (
    <div className="post-reply-auth">
      <label></label>
      <input placeholder="发表回复..." maxLength={200} autoComplete="off" onChange={onReplyChange} value={reply}/>
      <button onClick={onSubmit} disabled={disabled}><FontAwesomeIcon icon={faPaperPlane} size="2x"/></button>
    </div>
  )
}