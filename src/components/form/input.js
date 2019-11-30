import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faMobileAlt, faEnvelope, faKey, faUser, faEyeSlash, faEye, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

/**
 * @param {Number} props.max
 * @param {Boolean} props.disabled
 * @param {String} props.type
 * @param {String} props.placeholder
 * @param {Function} props.validate
 * @param {Boolean} props.forceError
 * @param {Function} props.onChange
 * @param {String} props.icon ['phone', 'email', 'pass', 'setPass', 'user', 'key']
 * @param {Boolean} props.autoFocus
 */

export default class Input extends React.PureComponent {
  constructor (props) {
    super(props);
    this.type = 'text';

    this.state = {
      visible: false,
      pass: 0,
      value: '',
    }

    this.wrapper = React.createRef()
    this.input = React.createRef()
    this.focus = false
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.current.focus()
    }
  }

  chooseIcon = (value, visible) => {
    switch (value) {
      case 'phone':
        this.type = 'number'
        return faMobileAlt;
      case 'email': 
        this.type = 'email'
        return faEnvelope
      case 'pass':
        this.type = 'password'
        return faKey
      case 'setPass':
        if (visible) {
          this.type = 'text'
          return faEye
        } 
        this.type = 'password'
        return faEyeSlash
      case 'user':
        return faUser
      case 'key':
        return faKey;
      default:
        return faPencilAlt
    }
  }

  toggleVisible = () => {
    if (this.props.icon !== 'setPass') return;
    this.setState((state) => {
      return {visible: !state.visible};
    });
  }

  onChange = (e) => {
    const {value} = e.target;
    let pass = 0;
    this.setState({value});
    if (value !== '' && this.props.validate) {
      pass = this.validate(value);
      if (this.props.onChange) this.props.onChange(value, pass === 1);
    } else {
      if (this.props.onChange) this.props.onChange(value, false);
    }
    if (pass !== this.state.pass) this.setState({pass})
  }

  validate = (value) => {
    try {
      return this.props.validate(value)?1:2 
    }catch(e) {
      console.log(e);
      return 2
    }
  }

  onFocus = () => {
    this.focus = true
    if (!this.wrapper.current.classList.contains('focus'))
    this.wrapper.current.classList.add('focus')
  }

  onBlur = () => {
    this.focus = false
    if (this.wrapper.current.classList.contains('focus'))
    this.wrapper.current.classList.remove('focus')
  }

  render () {
    const wrapperStyle = 'form-component' + (this.focus?' focus':'') + (this.props.disabled? ' disabled': (this.state.pass === 2 || this.props.forceError? ' error': ''))
    const beforeStyle = 'input-before' + (this.props.disabled? ' disabled':'')
    const beforeIcon = this.chooseIcon(this.props.icon, this.state.visible);
    const afterStyle = 'input-after' + (this.props.disabled? ' disabled': (this.state.pass === 2 || this.props.forceError)? ' error': (this.state.pass === 1? ' pass': ''))
    const afterIcon = (this.state.pass === 2 || this.props.forceError)? faTimes : (this.state.pass === 1? faCheck: null)

    return (
      <div className={wrapperStyle} ref={this.wrapper}>
        <div className={beforeStyle} onClick={this.toggleVisible}><FontAwesomeIcon icon={beforeIcon} size="2x"/></div>
        <input
          type={this.type} 
          onFocus={this.onFocus} 
          onBlur={this.onBlur} 
          disabled={this.props.disabled} 
          onChange={this.onChange} 
          value={this.state.value}
          maxLength={this.props.max || null} 
          placeholder={this.props.placeholder || ''} 
          autoComplete="false"
          spellCheck="false"
          ref={this.input}
        />
        {(this.state.pass !== 0 || this.props.forceError) && <div className={afterStyle}><FontAwesomeIcon icon={afterIcon} /></div>}
        {(this.state.pass === 2 || this.props.forceError) && <div className="error-msg">{this.props.error || 'Error'}</div>}
      </div>
    )
  }
}

