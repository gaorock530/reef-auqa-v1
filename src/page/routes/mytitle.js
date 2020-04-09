import React from 'react'
import {Helmet} from "react-helmet"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'
// import {AuthContext} from '../../context/LoginContext'

//award


export default () => {
  // const [{user}] = useContext(AuthContext)

  const title = "我的头衔" 
  const titleType = ['综合', '鱼缸', '文章', '比赛']

  const tags = [
    {type: 1, title: '2020年度玩家', quate: '2020年最活跃鱼友，常规化水质测试保持者，签到超过300天，经验分享超过50篇，被赞超过1万，被收藏超过1千。'},
    {type: 2, title: '2020年度SPS', quate: 'asdkjqwelkjlasd'},
    {type: 2, title: '从零开始', quate: '玩家全新开缸，记录从无到有的成长过程。'},
    {type: 3, title: '淡水最佳造型', quate: 'asdkjqwelkjlasd'},
    {type: 3, title: '最佳海缸', quate: 'asdkjqwelkjlasd'},
    {type: 4, title: '最强王者', quate: 'asdkjqwelkjlasd'},
    {type: 4, title: '经验丰富', quate: 'asdkjqwelkjlasd'},
    {type: 2, title: '2020年度大神', quate: 'asdkjqwelkjlasd'},
    {type: 1, title: '造景优雅', quate: 'asdkjqwelkjlasd'},
  ]
  
  const TitleTag = ({title, quate, type = 1}) => (
    <div className="dynamic-col-item">
      <div className={`title-item title-type-${type}`}>
        <h5>{title}</h5>
        <label>{titleType[type - 1]}</label>
        <div className="title-info">
          <p>{quate}</p>  
        </div>  
      </div>
    </div>
  )
    
    

  const render = data => data.map((title, index) => <TitleTag key={index} title={title.title} quate={title.quate} type={title.type}/>)

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div className="constrained my mytitle">
        <h3><FontAwesomeIcon icon={faAward}/>{title}</h3>
        <div className="dynamic-col">
          {render(tags)}
        </div>
      </div>
    </>
  )
}