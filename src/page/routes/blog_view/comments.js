import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faCaretSquareDown} from '@fortawesome/free-solid-svg-icons'
import formatTime from '../../../helper/formatTime'
import Reply from '../../../components/reply'
// import ContentEditable from 'react-contenteditable'


export default () => {
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])

  // console.log(comments)

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
  
  const onReply = reply => {
    if (reply.content === '') return
    setComments([reply, ...comments])
  }

  const onCommentReply = (commentId, reply) => {
    const newCommets = comments.map(comments => {
      if (commentId === comments.id) comments.reply.unshift(reply)
      return comments
    })
    setComments(newCommets)
  }

  return (
    <div className="post-comments">
      <h3><span>{comments.length}</span>条评论</h3>
      <Reply onReply={onReply}/>
      <div className="post-comments-list">
        <RenderComments reply={comments} onLike={onLike} likes={likes} onReply={onCommentReply}/>
      </div>
      <div className="recommendation">recommendation</div>
    </div>
  )
}

/**
 * 
 * @param {Array} reply list of comments replied
 * @param {Array} likes all likes that user hitted, indicates like status on a comment
 * @param {Function} onLike hit like button action
 * @param {Function} onReply reply comment action
 * @param {Boolean} subReply if true, this is a sub-reply
 */

function RenderComments ({reply, likes = [], onLike, onReply, subReply}) {
  return reply.map(comment => <RenderComment comment={comment} key={comment.id} onLike={onLike} likes={likes} onReply={onReply} subReply={subReply}/>)
}

function RenderComment ({comment, likes = [], onLike, onReply, subReply}) {
  const [addReply, setAddReply] = useState(false)
  const [showReply, setShowReply] = useState(false)

  const onCommentReply = (id, value) => {
    if (onReply) onReply(id, value)
    setAddReply(false)
  }

  const onHitLike = id => {
    if (onLike) onLike(id)
  }

  return (
    <div className="post-comment">
      <label className={subReply?'subreply-cover':null} style={comment.cover?{backgroundImage: `url(${comment.cover})`}:null}></label>
      <div className="post-comment-content">
        <h5><span>{comment.user}</span><b>•</b><i>{formatTime(comment.date)?formatTime(comment.date)+'前':'刚刚'}</i></h5>
        <p>{comment.content}</p>
        <div className="post-comment-utils">
          <FontAwesomeIcon icon={faThumbsUp} className={~likes.indexOf(comment.id)?'red-c':undefined} onClick={onHitLike.bind(this, comment.id)}/><span>{comment.like}</span>
          <label onClick={() => setAddReply(!addReply)}>回复</label>{(comment.reply instanceof Array) && <span>{comment.reply.length}</span>}
          {(comment.reply instanceof Array) && comment.reply.length>0 && <FontAwesomeIcon icon={faCaretSquareDown} onClick={() => setShowReply(!showReply)}/>}
        </div>
        {addReply && <Reply subReply={true} onReply={onCommentReply.bind(this, comment.id)}/>}
        {showReply && <div className="post-reply-list"><RenderComments reply={comment.reply} subReply={true} onLike={onLike} likes={likes} onReply={onCommentReply}/></div>}
      </div>
    </div>
  )
}

