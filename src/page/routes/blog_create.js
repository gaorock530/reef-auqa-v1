import React, { useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
import Body from '../body'
import {Helmet} from "react-helmet"
import Quill from 'quill'
import Input from '../../components/form/input'
import {LocalBlogs} from '../../helper/database'
import {editConfigNormal} from '../../helper/constVar'
// import cuid from 'cuid'
import CheckBox from '../../components/form/check'
import Radio from '../../components/form/radio'
import Preview from './blog_preview'
// import Spinner from '../../components/animate/spinner'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEye, faHeart, faFrown } from '@fortawesome/free-solid-svg-icons'



export default () => {
  const title = "创建分享"

  const textEdit = useRef()
  const textContainer = useRef()
  const post = useRef()
  const timer = useRef()
  const [preview, setPreview] = useState(false)

  const autoSave = () => {
    post.current = textEdit.current.getContents()
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const content = textEdit.current.getContents()
      LocalBlogs.setItem('temp', content)
      console.log('autosave!')
    }, 5000)
  }

  

  useEffect(() => {
    textEdit.current = new Quill(textContainer.current, editConfigNormal)

    async function getAutoSave () {
      const preSave = await LocalBlogs.getItem('temp')
      if (preSave) textEdit.current.setContents(preSave)
      post.current = preSave
      textEdit.current.on('text-change', autoSave)
    }
    // activate Autosave 
    getAutoSave()

    
    // clear up
    return () => {
      clearTimeout(timer.current)
      textEdit.current.off('text-change', autoSave)
      textEdit.current = undefined
    }
  }, [])

  const checkOptions = [{label: '原创', checked: false}]
  const radioOptions = [{label: '淡水'}, {label: '海水', checked: true}]

  const onCheck = checks => {
    console.log(checks)
  }

  const onRadio = index => {
    console.log(radioOptions[index])
  }

  const onPreview = () => {
    setPreview(true)
  }


  const onSubmit = async (e) => {
    e.preventDefault()
    await LocalBlogs.removeItem('temp')
    const postContent = textEdit.current.getContents()
    console.log(postContent)
    console.log(textEdit.current.getLength())
  }

  return (
    <Body>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`} />
      </Helmet>
      {preview && <Preview preview={post.current} quitPreview={() => setPreview(false)}/>}
      <form className="constrained" onSubmit={onSubmit}>
        <Input placeholder="文章标题" max={100}/>
        <Input placeholder="#相关#内容" max={100}/>
        <CheckBox options={checkOptions} onChange={onCheck}/>
        <Radio options={radioOptions} onChange={onRadio}/>
        <div className="editor"><div ref={textContainer} id="editor"></div></div>
        <button type="button" className="post-preview" onClick={onPreview}>预览</button>
        <button type="submit">发布分享</button>
      </form>
    </Body>
  )
}