import React, { useState, useRef } from 'react'

export default ({allow, onMessage}) => {
  const [textValue, setTextValue] = useState('')
  const textarea = useRef()

  const onChange = e => {
    const value = e.target.value
    setTextValue(value)
  }

  const onSend = () => {
    const text = textValue.trim()
    if (!allow || !text) return
    const msg = {
      value: text,
      from: 1,
      date: new Date()
    }
    if (onMessage) onMessage(msg)
    setTextValue('')
    textarea.current.focus()
  }

  const onkeypress = e => {
    e.persist()
    e.stopPropagation()
    if (e.ctrlKey && e.charCode === 13) onSend()
  }

  return (
    <div className="input">
      <div className="input-utils">
        <button disabled={!textValue || !allow} onClick={onSend}>发送</button>
      </div>
      <textarea 
        spellCheck={false} 
        maxLength="1000" 
        onChange={onChange} 
        value={textValue} 
        ref={textarea} 
        onKeyPress={onkeypress}
        placeholder="发送快捷键(Ctrl+Enter)"
      ></textarea>
    </div>
  )
}