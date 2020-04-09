import React, { useState } from 'react'

/**
 * @param {Function} props.onChange
 * @param {String} props.on
 * @param {String} props.off
 * @param {Boolean} props.defaultOp
 * 
 */

export default ({onChange, on, off, defaultOp, disabled, className = ''}) => {
  const [value, setValue] = useState(defaultOp || false)


  const onClick = () => {
    if (disabled) return
    setValue(!value)
    if (onChange) onChange(!value)
  }
  

  const blockClass = "switch-block " + (value?"on":"off")

  return (
    <div className={"form-component switch" + (disabled?' disabled':'') + className} onClick={onClick} >
      <div className="switch-option">{on || '开'}</div>
      <div className={blockClass}></div>
      <div className="switch-option">{off || '关'}</div>
    </div>
  )
}