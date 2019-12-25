import React, { useState, useRef } from 'react'

/**
 * @param {Function} props.onChange
 * @param {String} props.on
 * @param {String} props.off
 * @param {Boolean} props.defaultOp
 * 
 */

export default ({onChange, on, off, defaultOp}) => {
  const [value, setValue] = useState(defaultOp || false)
  const block = useRef()


  const onClick = () => {
    setValue(!value)
    if (onChange) onChange(!value)
  }
  

  const blockClass = "switch-block " + (value?"on":"off")

  return (
    <div className="form-component switch" onClick={onClick}>
      <div className="switch-option">{on || '开'}</div>
      <div className={blockClass} ref={block}></div>
      <div className="switch-option">{off || '关'}</div>
    </div>
  )
}