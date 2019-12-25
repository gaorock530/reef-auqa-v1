import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle, faCircle } from '@fortawesome/free-solid-svg-icons'

/**
 * @param {Function} props.onChange
 * @param {Array} props.options [{label: '', checked: true}]
 */

export default ({onChange, options}) => {
  const [radio, setRadio] = useState(options || [])


  const onClick = (index) => {
    const newOptions = options.map((op, idx) => {
      op.checked = false
      if (idx === index) op.checked = true
      return op
    })
    setRadio(newOptions)
    if (onChange) onChange(index)
  }

  const renderOptions = () => radio.map((op, index) => (
    <div className={"check-option" + (op.checked?' checked': '')} key={index} onClick={onClick.bind(this, index)}>
      <FontAwesomeIcon icon={op.checked?faDotCircle:faCircle}/>
      <span>{op.label}</span>
    </div>
  ))

  return (
    <div className="checkbox">
      {renderOptions()}
    </div>
  )
}