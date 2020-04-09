import React, { useState, useEffect, useCallback } from 'react'
import {Helmet} from "react-helmet"
import Left from './left'


import Friends from './friends'

const data = [
  {id: 1, name: 'aksdjklk askdj'},
  {id: 2, name: 'aksdjklk askdj'},
  {id: 3, name: 'akaklk askdj'},
  {id: 4, name: '阿请问 i 俄 u'},
  {id: 5, name: 'aksdjklk askdj'},
  {id: 6, name: 'aksdjklk askdj'},
  {id: 7, name: 'aksdjklk askdj'},
  {id: 8, name: 'aksdjklk askdj'},
  {id: 9, name: '阿斯顿拉卡上阿斯顿空间看'},
  {id: 10, name: 'aksdjklk askdj'},
  {id: 11, name: 'aksdjklk askdj'},
  {id: 12, name: 'aksdjklk askdj'},
  {id: 13, name: 'aksdjklk askdj'},
  {id: 14, name: 'akaklk askdj'},
  {id: 15, name: '阿请问 i 俄 u'},
  {id: 16, name: 'aksdjklk askdj'},
  {id: 17, name: 'aksdjklk askdj'},
  {id: 18, name: 'aksdjklk askdj'},
  {id: 19, name: 'aksdjklk askdj'},
  {id: 20, name: '阿斯顿拉卡上阿斯顿空间看'},
  {id: 21, name: 'aksdjklk askdj'},
  {id: 22, name: 'aksdjklk askdj'},
]

export default () => {
  const title = "我的好友"
  const [mini, setMini] = useState(false)
  const [show, setShow] = useState(false)

  const setWidth = useCallback(() => {
    console.log('resize')
    if (window.innerWidth <= 500) {
      if (!mini) setMini(true)
    } else {
      if (mini) setMini(false)
      setShow(false)
    }
  }, [mini])
  

  useEffect(() => {
    setWidth()
    window.addEventListener('resize', setWidth)
    return () => {
      window.removeEventListener('resize', setWidth)
    }
  }, [setWidth])

  
  
  const [friends, setFriends] = useState(data)
  const [selectedId, setSelectedId] = useState()
  const [allow, setAllow] = useState()

  const onSend = msg => {
    const newFriends = friends.map(f => {
      if (!f.msg) f.msg = []
      if (selectedId === f.id) f.msg.push(msg)
      return f
    })
    setFriends(newFriends)
  }
  
  const onSelect = id => {
    const newFriends = friends.map(f => {
      f.selected = false
      if (id === f.id) f.selected = true
      return f
    })
    setFriends(newFriends)
    setSelectedId(id)
    setAllow(true)
    if (mini) setShow(true)
  }

  const onClose = () => {
    const newFriends = friends.map(f => {
      f.selected = false
      return f
    })
    setFriends(newFriends)
    setSelectedId(null)
    setAllow(false)
    setShow(false)
  }
  

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`ReefAqua ${title}`}/>
      </Helmet>
      <div className="fullheight">
        {!show && <Friends friends={friends} onSelect={onSelect}/>}
        {(!mini || show) && <Left selected={friends[selectedId-1]} allow={allow} onSend={onSend} mini={mini} onClose={onClose}/>}
      </div>
    </>
  )
}