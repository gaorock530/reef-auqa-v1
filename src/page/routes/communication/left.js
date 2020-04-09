import React from 'react'
import Talk from './talk'
import Communication from './communication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default ({selected = {}, allow, onSend, mini, onClose}) => {

  return (
    <div className="chats">
      <div className="banner">
        {mini && <label className="back" onClick={onClose}><FontAwesomeIcon icon={faChevronLeft}/></label>}
        {(allow && selected) && <>
          <div className="name">{selected.name}</div>
          <div className="utils">
            <button>加好友</button>
            <button>举报</button>
          </div>
        </>}
      </div>
      <Communication records={selected.msg || []}/>
      <Talk onMessage={onSend} allow={allow}/>
    </div>
  )
}