import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'

/**
 * @param {Function} props.onChange
 * @param {Array} props.options [{label: '', checked: true}]
 */

export default ({onChange, options}) => {
  const [checks, setChecks] = useState(options || [])


  const onClick = (index) => {
    const newOptions = options.map((op, idx) => {
      if (idx === index) op.checked = !op.checked
      return op
    })
    setChecks(newOptions)
    if (onChange) onChange(newOptions)
  }

  const renderOptions = () => checks.map((op, index) => (
    <div className={"check-option" + (op.checked?' checked': '')} key={index} onClick={onClick.bind(this, index)}>
      <FontAwesomeIcon icon={op.checked?faCheckSquare:faSquare}/>
      <span>{op.label}</span>
    </div>
  ))

  return (
    <div className="checkbox">
      {renderOptions()}
    </div>
  )
}