import React from 'react'
import {Link} from 'react-router-dom'
import {Helmet} from "react-helmet"
import Body from '../body'
import Spinner from '../../components/animate/spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faHeart, faFrown } from '@fortawesome/free-solid-svg-icons'
import useTanksFromLocal from '../../hooks/useTanksFromLocal'




export default () => {
  
  const data = useTanksFromLocal()
  const title = "我的鱼缸"

  function Tanks ({data}) {
    return data.map((l, index) => <Tank item={l} key={index}/>)
  }
  
  function Tag ({item}) {
    return <i>{item}</i>
  }
  
  function Tags ({tags}) {
    return tags.map((tag, index) => <Tag item={tag} key={index}/>)
  }
  
  const Tank = ({item}) => (
    <Link className="constrained tank-overview" to={`/tank/${item.id}`} style={{backgroundImage: `url(${item.cover})`}}>
      <div className="tank-overview-info">
        <div className="to-banner">
          {item.name}
        </div>
        <div className="tank-honours">
            <Tags tags={item.tags}/>
        </div>
        <div className="to-banner right">
          <label alt="view"><FontAwesomeIcon icon={faEye}/> {item.view || '0'}</label>
          <label><FontAwesomeIcon icon={faHeart}/> {item.like || '0'}</label>
        </div>
      </div>
    </Link>
  )

  return (
    <Body>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`} />
      </Helmet>
      {data?(data.length>0?<Tanks data={data}/>:
      <span className="tank-tips">
        <i>您还没有</i><FontAwesomeIcon icon={faFrown} size="2x"/><i>创建鱼缸</i>
      </span>):<Spinner/>}
      <Link to="/tank/create" className="tank-add-new"><FontAwesomeIcon icon={faPlus} size="2x"/></Link>
    </Body>
  )
}