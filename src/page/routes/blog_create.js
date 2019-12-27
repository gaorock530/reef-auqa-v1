import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import Body from '../body'
import {Helmet} from "react-helmet"
import Quill from 'quill'
import Input from '../../components/form/input'
import {LocalBlogs} from '../../helper/database'
import {editConfigNormal} from '../../helper/constVar'
import cuid from 'cuid'
import CheckBox from '../../components/form/check'
import Radio from '../../components/form/radio'
import Preview from './blog_preview'
import processImage from '../../helper/processImage'
import Spinner from '../../components/animate/spinner'
import WordCount from '../../helper/wordcounter'





export default () => {
  const title = "创建分享"

  const cover = useRef()
  const textEdit = useRef()
  const textContainer = useRef()
  const post = useRef()
  const timer = useRef()
  const detials = useRef({original: false, tags: [], type: '淡水'})
  const [preview, setPreview] = useState(false)
  const [process, setProcess] = useState(false)

  const [published, setPublished] = useState(false)

  const autoSave = useCallback((delta) => {
    if (cover.current) cover.current = undefined
    // save changed content to local
    if (textEdit.current) post.current = textEdit.current.getContents()
    clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      const content = textEdit.current.getContents()
      await LocalBlogs.setItem('temp', content)
      console.log('autosave!')
    }, 5000)
  }, [])

  

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
      timer.current = undefined
      textEdit.current.off('text-change', autoSave)
      textEdit.current = undefined
    }
  }, [autoSave])

  const checkOptions = [{label: '原创', checked: false}]
  const radioOptions = [{label: '淡水'}, {label: '海水', checked: true}]

  const onTitleChange = v => {
    const count = WordCount(v)
    console.log(count)
    const newDetail = {...detials.current, title: v.trim()}
    detials.current = newDetail
  }

  const onTagsChange = v => {
    const tags = v.split('#').map(tag => tag.trim()).slice(1)
    const newDetail = {...detials.current, tags}
    detials.current = newDetail
  }

  const onCheck = checks => {
    console.log(checks)
    const newDetail = {...detials.current, original: checks[0].checked}
    detials.current = newDetail
  }

  const onRadio = index => {
    console.log(radioOptions[index])
    const newDetail = {...detials.current, type: radioOptions[index].label}
    detials.current = newDetail
  }

  const inProcess = async (preProcess) => {
    const postProcess = []
    for(let op of preProcess.ops) {
      if (op.insert.image) {
        const newImage = op.insert.image
        const output = await processImage(newImage)
        if (!cover.current) cover.current = output
        op.insert.image = output
      }
      postProcess.push(op)
    }
    return postProcess
  }

  const onPreview = async () => {
    if (textEdit.current.getLength() < 2) return

    setProcess(true)
    // process image
    const preProcess = textEdit.current.getContents()
    post.current = await inProcess(preProcess)
    setProcess(false)
    setPreview(true)
  }


  const onSubmit = async (e) => {
    e.preventDefault()


    // checking
    // check title
    if (!detials.current.title || detials.current.title === '' || detials.current.title.length > 100) return console.log('tag too long OR empty')
    
    // check tags
    let error = false
    if (detials.current.tags.length > 3) return console.log('tag many tags')
    for (let tag of detials.current.tags) {
      if (tag.length > 15) {
        error = true
        break
      }
    }
    if (error) return console.log('tag too long')
    
    // check post content
    if (textEdit.current.getLength() < 50) return console.log('article too short')
    // disable editor
    textEdit.current.disable()
    // proceed
    setProcess(true)
    clearTimeout(timer.current)
    await LocalBlogs.removeItem('temp')
    const postContent = textEdit.current.getContents()
    const tobeSaved = await inProcess(postContent)
    const newPost = {
      id: cuid(),
      date: Date.now(),
      title: detials.current.title,
      type: detials.current.type,
      original: detials.current.original,
      tags: detials.current.tags,
      content: tobeSaved,
      cover: cover.current
    }

    await LocalBlogs.setItem(newPost.id, newPost)
    setProcess(false)
    setPublished(true)
  }

  return published? <Redirect to="/blogs"/>:(
    <Body>
      <Helmet>
        <title>{title}</title>
        <meta name="description vertical" content={`ReefAqua ${title}`} />
      </Helmet>
      {process && <div className="preview-wrapper"><Spinner/></div>}
      {preview && <Preview preview={post.current} quitPreview={() => setPreview(false)}/>}
      <form className="constrained" onSubmit={onSubmit}>
        <Input placeholder="文章标题" max={100} onChange={onTitleChange}/>
        <Input placeholder="#相关#话题" max={100} onChange={onTagsChange}/>
        <CheckBox options={checkOptions} onChange={onCheck}/>
        <Radio options={radioOptions} onChange={onRadio}/>
        <div className="editor"><div ref={textContainer} id="editor" className="post-content"></div></div>
        <button type="button" className="post-preview" onClick={onPreview} disabled={process}>预览</button>
        <button type="submit" disabled={process}>发布分享</button>
      </form>
    </Body>
  )
}