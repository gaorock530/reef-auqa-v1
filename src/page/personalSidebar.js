import React, {useContext} from 'react'
import {AuthContext, LOGOUT, TOGGLE_PERSON_BAR} from '../context/LoginContext'
import CustomScroll from 'react-custom-scroll'
import {Link} from 'react-router-dom'
import {useHistory} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faTasks, faThermometerQuarter, faCoins, faUserShield, faRainbow,
  faAddressCard, faKey, faFingerprint, faEnvelope, faAward, faInbox, faUserFriends, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
// faRibbon

const items = [
  {
    title: '设置',
    list: [
      { id: 'a1', icon: faFingerprint, label: '个人资料', to: 'mydetails' },
      { id: 'a3', icon: faKey, label: '重置密码', to: 'resetpassword' },
      { id: 'a4', icon: faAddressCard, label: '实名认证', to: 'certification' },
      { id: 'a2', icon: faUserShield, label: '隐私', to: 'privacy' },
      { id: 'a6', icon: faCoins, label: '清理缓存', to: 'clearcache' },
    ]
  }
]


const RenderItem = ({group}) => group.map(item => {
  return (
    <Link className="side-item" key={item.id} to={item.to}>
      <div><FontAwesomeIcon icon={item.icon} size="2x"/></div>
      <label>{item.label}</label>
    </Link>
  )
})

const RenderGroup = ({gourpList}) => gourpList.map((group, idx) => (
  <div className="side-section" key={idx}>
    <div className="side-group-title">
      {group.title}
    </div>
    <RenderItem group={group.list}/>
  </div>
))

const Scroll = () => {
  const history = useHistory()
  const [, dispatch] = useContext(AuthContext)

  const onClick = e => {
    let el = e.target
    for (let i=0;i<4;i++) {
      if (el.tagName === 'A') {
        dispatch({type: TOGGLE_PERSON_BAR})
        break
      }
      el = el.parentElement
    }
  }

  const logout = () => {
    localStorage.removeItem('id')
    dispatch({type: LOGOUT})
    history.push("/")
  }

  const exp = [259, 300]
  const percent = Math.floor(exp[0]/exp[1]*100)

  return (
    <div className="side-scroll" onClick={onClick}>
      <div className="side-section">
        <div className="side-group-title">成长</div>
        <div className="side-item-static" to="/mylevel">
          <div><FontAwesomeIcon icon={faRainbow} size="2x"/></div>
          <label>等级</label>
          <span>Lv. 10</span>
        </div>
        <div className="side-item-static" to="/myexp">
          <div><FontAwesomeIcon icon={faThermometerQuarter} size="2x"/></div>
          <label>经验</label>
          <div className="side-item-level"><div className="level-value" style={{width: `${percent}%`}}></div><div className="level-word">{percent}%</div></div>
        </div>
        <Link className="side-item" to="/mytitle">
          <div><FontAwesomeIcon icon={faAward} size="2x"/></div>
          <label>头衔</label>
          <span className="message-no">2</span>
        </Link>
        <Link className="side-item" to="/mytask">
          <div><FontAwesomeIcon icon={faTasks} size="2x"/></div>
          <label>任务</label>
          <span className="message-no">10<i></i></span>
        </Link>
      </div>
      <div className="side-section">
        <div className="side-group-title">社交</div>
        <Link className="side-item" to="/friends">
          <div><FontAwesomeIcon icon={faUserFriends} size="2x"/></div>
          <label>好友</label>
          <span className="message-no">10<i></i></span>
        </Link>
        <Link className="side-item" to="/atlist">
          <div><FontAwesomeIcon icon={faEnvelope} size="2x"/></div>
          <label>@我的</label>
          <span className="message-no">12123<i></i></span>
        </Link>
        <Link className="side-item" to="/messages">
          <div><FontAwesomeIcon icon={faInbox} size="2x"/></div>
          <label>消息</label>
          <span className="message-no">12<i></i></span>
        </Link>
      </div>
      <RenderGroup gourpList={items}/>
      <div className="side-section">
        <div className="side-item" onClick={logout}>
          <div><FontAwesomeIcon icon={faSignOutAlt} size="2x"/></div>
          <label>安全退出</label>
        </div>
      </div>
      <div className="side-footer warning">
        <h5>* 如在公用设备上登录此账号，请在离开时退出登录，以免造成安全隐患。</h5>
      </div>
    </div>
  )
}

  /*
   {
    title: '社交',
    list: [
      { id: 'a6', icon: faUserFriends, label: '好友', to: '' },
      { id: 'a3', icon: faInbox, label: '消息', to: '' },
      { id: 'a4', icon: faEnvelope, label: '私信', to: '' },
    ]
  },
  {
    title: '成长',
    list: [
      { id: 'a6', icon: faRainbow, label: '等级', to: '' },
      { id: 'a3', icon: faThermometerQuarter, label: '经验', to: '' },
      { id: 'a7', icon: faRibbon, label: '头衔', to: '' },
      { id: 'a8', icon: faTasks, label: '任务', to: '' },
    ]
  }, */

export default () => {
  const [{personBar, user, login}, dispatch] = useContext(AuthContext)
  const status = personBar? 'show':'hide'
  return login && (
    <aside className={`sidebar-wrapper person ${status}`}>
      <div className="side-header" onClick={() => dispatch({type: TOGGLE_PERSON_BAR})}>
        <div className="side-person-header">
          <span>{user || '为哦啊是看到了靠阿斯'}</span>
          <picture></picture>
        </div>
      </div>
      <div className="side-main">
        <CustomScroll flex="1" allowOuterScroll={false}>
          {personBar && <Scroll/>}
        </CustomScroll>
      </div>
      
    </aside>
  )
}



