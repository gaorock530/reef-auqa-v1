import React from 'react'
import Switch from '../../../components/form/switch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

// //angle-left

// const type = {
//   'salt': '海水',
//   'fresh': '淡水'
// }

export default ({defaultOp, onChange, disabled, title, classId, cate}) => {

  return (
    <div className="info-nav">
      <span><i>{title}</i>{classId && <b><FontAwesomeIcon icon={faAngleRight}/><i>{classId}</i></b>}</span>
      {cate !== 'corals' && <Switch on="海水" off="淡水" defaultOp={defaultOp} onChange={onChange} disabled={disabled} className=" info-switch"/>}
    </div>
  )
}