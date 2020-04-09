import React, {useRef, useEffect} from 'react'
import formatDate from '../../../helper/formatDate'

export default ({records}) => {
  const talkList = useRef()
  const scroll = useRef(0)

  useEffect(() => {
    console.log('more')
    const height = talkList.current.scrollHeight - talkList.current.clientHeight
    if (scroll.current === height) return
    talkList.current.scrollTop = height
    scroll.current = height
  })

  const Msg = ({data}) => <>
    <label>{formatDate(data.date)}</label>
    {data.from?
    <li className="left"><picture></picture><span lang="en">{data.value}</span></li>:
    <li className="right"><span lang="en">{data.value}</span><picture></picture></li>}
  </>

  const renderMsg = list => list.map((li, idx) => <Msg key={idx} data={li}/>)
  
  return (
    <ul ref={talkList}>
      {renderMsg(records)}
    </ul>
  )
}