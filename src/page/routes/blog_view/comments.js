import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp, faCaretSquareDown, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import cuid from 'cuid'
import formatTime from '../../../helper/formatTime'
// import ContentEditable from 'react-contenteditable'

/**
 *  Problems to be SOLVED !!!!!
 */

export default () => {
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])

  console.log(comments)

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
 *  Problems to be SOLVED !!!!!
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

/**
 *  Problems to be SOLVED !!!!!
 */
function Reply ({onReply, subReply = false}) {
  const placeholder = useRef()
  const editable = useRef()
  const replyContent = useRef('')

  const onInput = e => {
    const content = editable.current.textContent.trim()
    if (content.length > 500) return e.preventDefault()
  }

  const onPaste = e => {
    const content = editable.current.textContent.trim()
    if (content.length > 500) return e.preventDefault()
  }


  const onKeyUp = e => {
    const content = editable.current.textContent.trim()
    if (content.length > 500) return e.preventDefault()
  }

  const onFocus = e => {
   
  }

  const onClick = e => {
    editable.current.focus({preventScroll: false})
    if (!editable.current.classList.contains('hold')) editable.current.classList.add('hold')
  }

  const onBlur = e => {
    if (editable.current.textContent.trim() !== '' && !editable.current.classList.contains('hold')) editable.current.classList.add('hold')
    else if (editable.current.textContent.trim() === '' && editable.current.classList.contains('hold')) editable.current.classList.remove('hold')
  }

  

  const onSubmit = () => {
    if (editable.current.textContent.trim() === '') return

    const replyObj = {
      id: cuid.slug(),
      date: Date.now(),
      user: 'Magic reply',
      cover: '',
      content: editable.current.textContent,
      like: 0,
      reply: !subReply?[]:null
    }

    editable.current.classList.remove('hold')
    editable.current.textContent = ''
    if (onReply) onReply(replyObj)
  }

  return (
    <div className="post-reply-auth">
      {!subReply && <label></label>}
      {/* <input placeholder="发表回复..." maxLength={200} autoComplete="off" onChange={onReplyChange} value={reply} /> */}
      <div 
        contentEditable="true" 
        className="reply-input" 
        onFocus={onFocus} 
        onBlur={onBlur} 
        onKeyUp={onKeyUp} 
        onClick={onClick}
        ref={editable}
        onInput={onInput}
        onPaste={onPaste}
        // onTouchStart={onClick}
        suppressContentEditableWarning={true}
      >
        {/* {placeholder} */}
        {/* <div ref={placeholder} className="placeholder"></div> */}
      </div>
      <button onClick={onSubmit} disabled={replyContent==='' || replyContent === placeholder}><FontAwesomeIcon icon={faPaperPlane} size="2x"/></button>
    </div>
  )
}