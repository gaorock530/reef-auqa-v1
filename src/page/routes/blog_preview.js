import React, {useRef, useEffect} from 'react'
import Quill from 'quill'
import {editConfig} from '../../helper/constVar'


export default ({preview, quitPreview}) => {
  const previewQuill = useRef()
  const previewContainer = useRef()

  useEffect(() => {
    previewQuill.current = new Quill(previewContainer.current, editConfig)
    previewQuill.current.setContents(preview)
    return () => {
      previewQuill.current = undefined
    }
  }, [preview])


  return (
    <div className="preview-wrapper" onClick={quitPreview}>
      <div className="constrained preview"><div ref={previewContainer} ></div></div>
    </div>
  )
}