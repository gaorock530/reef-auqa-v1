import React, {useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

/**
 * @param {String} props.defaultOption
 * @param {Function} props.onChange
 * @param {Array} props.options
 * @param {String} props.className
 * @param {String} props.valueProp
 */

export default ({options, onChange, defaultOption = undefined, className = '', valueProp}) => {

  const wrapper = useRef()
  const renderOption = option => option.map((op, index) => <option key={op.id || index} value={index}>{op[valueProp] || (op.value || op.name || op)}</option>)
  const onFocus = () => {
    if (!wrapper.current.classList.contains('focus'))
    wrapper.current.classList.add('focus')
  }

  const onBlur = () => {
    if (wrapper.current.classList.contains('focus'))
    wrapper.current.classList.remove('focus')
  }

  const onChangeHandler = (e) => {
    if (onChange) onChange(Number(e.target.value))
  }

  return (
    <div className={"form-component input-select " + className} ref={wrapper}>
      <select onFocus={onFocus} onBlur={onBlur} onChange={onChangeHandler} value={defaultOption}>
        {renderOption(options || [])}
      </select>
      <FontAwesomeIcon icon={faCaretUp} className="up"/>
      <FontAwesomeIcon icon={faCaretDown} className="down"/>
    </div>
    
  )
}

