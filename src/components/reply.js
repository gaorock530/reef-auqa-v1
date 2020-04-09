import React, {useRef} from 'react'
import cuid from 'cuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'



export default function Reply ({onReply, subReply = false}) {
  const placeholder = useRef()
  const editable = useRef()
  const replyContent = useRef('')
  const limit = 300

  const onInput = e => {
    const content = editable.current.textContent.trim()
    const paste = (e.clipboardData || window.clipboardData)
    if (paste) {
      e.preventDefault()
      const text = paste.getData('text')
      if (text.length+content.length > limit) return 
      editable.current.textContent = content + text
    } else if (content.length >= limit) e.preventDefault()
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
      <div 
        contentEditable="true" 
        className="reply-input" 
        onBlur={onBlur} 
        onClick={onClick}
        ref={editable}
        onKeyPress={onInput}
        onInput={onInput}
        onPaste={onInput}
        onKeyUp={onInput} 
        onPasteCapture={onInput}
        suppressContentEditableWarning={true}
      >
      </div>
      <button onClick={onSubmit} disabled={replyContent==='' || replyContent === placeholder}><FontAwesomeIcon icon={faPaperPlane} size="2x"/></button>
    </div>
  )
}