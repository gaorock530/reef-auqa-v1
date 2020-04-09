import React, { useContext } from 'react'
import CustomScroll from 'react-custom-scroll'
import {Link} from 'react-router-dom'
import {AuthContext, TOGGLE_SIDE_BAR} from '../context/LoginContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBars, faFish, faEyeDropper, faImages, faVial, faTint, faCapsules, faHandsHelping, faDragon, faSignature,
  faRulerVertical, faHeart, faStar, faTools, faBook, faWater, faDownload, faSeedling, faBug
} from '@fortawesome/free-solid-svg-icons'
// faComments

const items = [
  {
    title: '记录',
    list: [
      { id: 'a1', icon: faImages, label: '鱼缸', to: 'tanks' },
      { id: 'a2', icon: faDragon, label: '生物', to: 'add/livestock/' },
      { id: 'a3', icon: faTools, label: '设备', to: 'add/equipment/' },
      { id: 'a4', icon: faBook, label: '分享', to: 'blogs' },
      { id: 'a5', icon: faVial, label: '水质', to: 'add/test/' },
    ]
  },
  {
    title: '我的',
    list: [
      { id: 'a6', icon: faHeart, label: '赞', to: 'thumbups' },
      { id: 'a7', icon: faStar, label: '收藏', to: 'favorites' },
      // { id: 'a8', icon: faComments, label: '留言', to: 'comments' },
    ]
  },
  {
    title: '资料',
    list: [
      { id: 'a6', icon: faFish, label: '鱼类', to: 'info/fishes/salt' },
      { id: 'a8', icon: faSignature, label: '珊瑚', to: 'info/corals/salt' },
      { id: 'a9', icon: faSeedling, label: '除藻类', to: 'info/cleanupcrew/salt' },
      { id: 'a10', icon: faBug, label: '其他生物', to: 'info/otherpests/salt' },
    ]
  },
  {
    title: '工具',
    list: [
      { id: 'a6', icon: faCapsules, label: '药剂添加计算', to: 'dose' },
      { id: 'a7', icon: faRulerVertical, label: '玻璃厚度计算', to: 'glass' },
      { id: 'a8', icon: faTint, label: '水流计算', to: 'flow' },
      { id: 'a9', icon: faEyeDropper, label: '海盐计算', to: 'salt' },
    ]
  },
  {
    title: '报告',
    list: [
      { id: 'a6', icon: faWater, label: '自来水水质', to: 'tapwater' },
    ]
  },
  {
    title: '帮助',
    list: [
      { id: 'a6', icon: faHandsHelping, label: '教程', to: 'tutorial' },
      { id: 'a7', icon: faDownload, label: '下载', to: 'downloads' },
    ]
  },

]

const tags1 = [
  {id: 's1', label: '关于', to: 'aboutus'},
  {id: 's2', label: '加入', to: 'joinus'},
  {id: 's3', label: '推广', to: 'promote'},
  {id: 's4', label: '品牌', to: 'brand'},
  {id: 's5', label: '广告', to: 'ads'},
  {id: 's6', label: '活动', to: 'activity'},
]

const tags2 = [
  {id: 'd1', label: '开发者', to: 'development'},
  {id: 'd2', label: '版权', to: 'copyrights'},
  {id: 'd5', label: '报错', to: 'reporterror'},
  {id: 'd6', label: '举报', to: 'accusation'},
  {id: 'd3', label: '政策与安全', to: 'policy'},
  {id: 'd4', label: '条款与声明', to: 'terms'},
  
]

const RenderTag = ({tags}) => tags.map(tag => <Link key={tag.id} to={'/'+tag.to}>{tag.label}</Link>)

const RenderItem = ({group}) => group.map(item => {
  return (
    <Link className="side-item" key={item.id} to={'/'+item.to}>
      <div><FontAwesomeIcon icon={item.icon} size="2x"/></div>
      <label>{item.label}</label>
    </Link>
  )
})
const RenderGroup = ({gourpList}) => gourpList.map((group, idx) => <div className="side-section" key={idx}><div className="side-group-title">{group.title}</div><RenderItem group={group.list}/></div>)

const Scroll = ({onToggle}) => {
  const onClick = e => {
    let el = e.target
    for (let i=0;i<4;i++) {
      if (el.tagName === 'A') {
        onToggle()
        break
      }
      el = el.parentElement
    }
  }

  return (
    <div className="side-scroll" onClick={onClick}>
      <RenderGroup gourpList={items}/>
      <div className="side-section tags">
        <RenderTag tags={tags1}/>
      </div>
      <div className="side-section tags">
        <RenderTag tags={tags2}/>
      </div>
      <div className="side-footer tags">
        <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">沪ICP备15043293号</a>
        <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">沪网文[2015]0826-226号</a>
        <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">沪公网安备 31010802001046号</a>
        <h5>Copyright &copy; 2019 MagicAqua. </h5>
        <h5>All rights reserved.</h5>
        <h5>Powered by <a href="/" target="_blank" rel="noopener noreferrer">ShadowStrike</a></h5>
      </div>
    </div>
  )
}

export default () => {
  const [{sideBar}, dispatch] = useContext(AuthContext)
  const status = sideBar? 'show':'hide'
  return (
    <aside className={`sidebar-wrapper ${status}`}>
      <div className="side-header">
        <div className="header-menu button" onClick={() => dispatch({type: TOGGLE_SIDE_BAR})}><FontAwesomeIcon icon={faBars} size="2x"/></div>
        <div className="header-title">MagicAqua</div>
      </div>
      <div className="side-main">
        <CustomScroll flex="1" allowOuterScroll={false}>
          {sideBar && <Scroll onToggle={() => dispatch({type: TOGGLE_SIDE_BAR})}/>}
        </CustomScroll>
      </div>
      
    </aside>
  )
}
