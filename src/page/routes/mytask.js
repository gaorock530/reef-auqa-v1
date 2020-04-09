import React from 'react'
import {Helmet} from "react-helmet"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const list = [
  [
    {key: 1, finished: false, content: '更换自定义头像', plus: 50, link: '/mydetails'},
    {key: 2, finished: false, content: '创建一个新的鱼缸', plus: 300, link: '/tank/create'},
    {key: 3, finished: false, content: '为鱼缸添加1个生物', plus: 50, link: '/add/livestock'},
    {key: 4, finished: false, content: '为鱼缸添加1个设备', plus: 50, link: '/add/equipment'},
    {key: 7, finished: false, content: '为鱼缸记录1次水质测试', plus: 100, link: '/add/test'},
    {key: 5, finished: false, content: '使用3次不同的计算工具', plus: 300, progress: [0, 3], link: '/dose'},
    {key: 8, finished: false, content: '发布1篇分享文章', plus: 300, link: '/blog/create'},
    {key: 9, finished: false, content: '完成自来水水质报告', plus: 300, link: '/tapwater'},
    
  ],
  [
    {key: 1, finished: false, content: '连续签到30天', plus: 600, progress: [0, 30]},
    {key: 1, finished: false, content: '连续签到90天', plus: 2000, progress: [0, 90]},
    {key: 6, finished: false, content: '添加10个好友', plus: 500, progress: [0, 10], link: 'friends'},
    {key: 8, finished: false, content: '我的鱼缸获得100个赞', plus: 1000, progress: [0, 1000]},
    {key: 8, finished: false, content: '我的文章获得100个赞', plus: 1000, progress: [0, 1000]},
    {key: 10, finished: true, content: '实名认证', plus: 800, link: '/certification'},
  ],
  [
    {key: 1, finished: false, content: '获得3个头衔', plus: 900, progress: [0, 3], link: '/mytitle'},
  ],
]

const tasks = ['新手任务', '进阶任务', '特别任务']

export default () => {
  const title = "我的任务"

  const List = ({finished, content, plus, link, progress}) => (
    <li>
      <FontAwesomeIcon icon={faCheckSquare} className={finished?'finished':'gray-c'}/>
      {link?<Link to={link}>{content}</Link>:<p>{content}</p>}
      <label>+{plus}exp</label>
      {progress && <span>{progress[0]}/{progress[1]}</span>}
    </li>
  )

  const renderList = list => list.map(item => <List {...item}/>)

  const finish = arr => `${arr.filter(i => i.finished).length}/${arr.length}`

  const renderTask = list => list.map((li, index) => (
    <>
      <h3><FontAwesomeIcon icon={faTasks}/>{tasks[index]}<span>{finish(li)}</span></h3>
      <ul className="task-list">
        {renderList(li)}
      </ul>
    </>
  ))

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div className="constrained my mytask">
        {renderTask(list)}
      </div>
    </>
  )
}