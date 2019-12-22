import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons'

export default React.memo(({id}) => {
  return (
    <div className="tank-auth">
      <FontAwesomeIcon icon={faShare} size="2x"/>
      <span>分享</span>
    </div>
  )
})