import React,{useEffect, useState, useRef} from 'react'
import Body from '../../body'
import {Helmet} from "react-helmet"
import {useParams} from 'react-router-dom'
import {editConfigReadOnly} from '../../../helper/constVar'
// import Spinner from '../../components/animate/spinner'
import {LocalBlogs} from '../../../helper/database'
import Quill from 'quill'
import PostHeader from './post_header'
import Comments from './comments'



export default () => {
  const title = "分享标题"
  const {id} = useParams()
  const [data, setData] = useState({})
  const [notFound, setNotFound] = useState(false)
  const blogContainer = useRef()
  const blogContent = useRef()
  

  useEffect(() => {
    

    const run = async () => {
      try{
        const blog = await LocalBlogs.getItem(id)
        blogContent.current = new Quill(blogContainer.current, editConfigReadOnly)
        blogContent.current.setContents(blog.content)
        if (!blog) return setNotFound(true)
        setData(blog)
      }catch{
        setNotFound(true)
      }
    }
    run()
  }, [id])

  return notFound?<Body><span>Not Found</span></Body>:(
    <Body>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`} />
      </Helmet>
      <div className="constrained">
        <PostHeader data={data}/>
        <div ref={blogContainer} className="post-content"></div>
        <Comments />
      </div>
    </Body>
  )
}