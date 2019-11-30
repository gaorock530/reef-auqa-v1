import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faEnvelope, faKey, faUser, faPencilAlt } from '@fortawesome/free-solid-svg-icons'


export default ({icon, value}) => {
  const chooseIcon = () => {
    switch (icon) {
      case 'phone':
        return faMobileAlt
      case 'email':
        return faEnvelope
      case 'key':
        return faKey
      case 'user':
        return faUser
      default:
        return faPencilAlt
    }
  }

  return (
    <div className="form-component">
      <div className="input-before"><FontAwesomeIcon icon={chooseIcon()} size="2x"/></div>
      <div className="form-static">{value}</div>
    </div>
  )
}