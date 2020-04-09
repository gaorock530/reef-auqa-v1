import React, {useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

/**
 * @param {String} props.placeholder
 * @param {Function} props.onChange
 * @param {Function} props.onOption
 * @param {Array|String} props.options
 * @param {Number} props.defaultOption
 * @param {String} props.defaultValue
 * @param {Object} props.icon
 */

const OptionInput = ({
  options = [], 
  defaultValue = '',
  onChange,
  onOption,
  placeholder = '',
  defaultOption = undefined,
  icon = null,

}) => {
  const [value, setValue] = useState(defaultValue)
  const wrapper = useRef()
  const input = useRef()


  const onChangeValue = (e) => {
    const {value} = e.target
    setValue(value)
    if (onChange) onChange(Number(value))
  }

  const onOptionChange = (e) => {
    if (onOption) onOption(Number(e.target.value))
  }

  const onFocus = () => {
    if (!wrapper.current.classList.contains('focus')) 
    wrapper.current.classList.add('focus')
  }

  const onBlur = () => {
    if (wrapper.current.classList.contains('focus'))
    wrapper.current.classList.remove('focus')
  }

  const renderOption = (ops) => ops.map((op, index) => <option key={index} value={index}>{op}</option>)

  return (
    <div className="form-component" ref={wrapper}>
      {icon && <div className="input-before"><FontAwesomeIcon icon={icon} size="2x"/></div>}
      <input
        type="number"
        onFocus={onFocus} 
        onBlur={onBlur} 
        onChange={onChangeValue} 
        value={value}
        placeholder={placeholder} 
        autoComplete="false"
        spellCheck="false"
        ref={input}
      />
      <div className="input-after input-option">
        {typeof options === 'string'?<div className="input-option-static">{options}</div>:
        <>
          <select onChange={onOptionChange} value={defaultOption}>
            {renderOption(options)}
          </select>
          <FontAwesomeIcon icon={faCaretUp} className="up"/>
          <FontAwesomeIcon icon={faCaretDown} className="down"/>
        </>}
      </div>
    </div>
  )
}

export default OptionInput



