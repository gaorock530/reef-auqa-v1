import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet"
import {useParams, Redirect} from 'react-router-dom'
import Nav from './info_nav'
import List from './info_list'
import Content from './info_content'
import Spinner from '../../../components/animate/spinner'

//angle-left


export default () => {
  const {world, cate, classId, id} = useParams()
  // cate => world => classId => id
  if (world !== 'salt' && world !== 'fresh') return <Redirect to="/notfound"/>
  const [pageWorld, setPageWorld] = useState(world)
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const defaultOp = world !== 'salt'

  const onChange = v => {
    console.log(v)
    setLoading(true)
    setTimeout(() => {setLoading(false)} , 2000)
    if (pageWorld === 'salt') {
      setPageWorld('fresh')
    } else if (pageWorld === 'fresh') {
      setPageWorld('salt')
    }

  }

  useEffect(() => {

    setTimeout(() => {setLoading(false)} , 2000)
    switch (cate) {
      case 'fishes':
        return setTitle('鱼类资料')
      case 'corals':
        if (world === 'salt') return setTitle('珊瑚资料')
        return setTitle(null)
      case 'cleanupcrew':
        return setTitle('CUC资料')
      case 'otherpests':
        return setTitle('其他资料')
      default:
        setTitle(null)
    }
  }, [cate, world])

  return title === null? <Redirect to="/notfound"/>:world !== pageWorld?<Redirect to={`/info/${cate}/${pageWorld}`}/>:(
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div className="constrained">
        <Nav defaultOp={defaultOp} onChange={onChange} disabled={loading} title={title} classId={classId} cate={cate}/>
        {loading?<Spinner/>:((classId && id)?<Content />:<List />)}
      </div>
    </>
  )
}