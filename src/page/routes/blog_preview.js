import React, {useRef, useEffect} from 'react'
import Quill from 'quill'
import {editConfigReadOnly} from '../../helper/constVar'


export default ({preview, quitPreview}) => {
  const previewQuill = useRef()
  const previewContainer = useRef()

  useEffect(() => {
    previewQuill.current = new Quill(previewContainer.current, editConfigReadOnly)
    previewQuill.current.setContents(preview)
    return () => {
      previewQuill.current = undefined
    }
  }, [preview])


  return (
    <div className="preview-wrapper" onClick={quitPreview}>
      <div className="constrained preview"><div ref={previewContainer} className="post-content "></div></div>
    </div>
  )
}