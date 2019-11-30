import React, {useState, useEffect} from 'react'
import {useLocation, Redirect} from "react-router-dom";
import {Helmet} from "react-helmet";
import Body from './body'

import Stage1 from '../components/login/stage1'
import Stage2 from '../components/login/stage2'
import Stage3 from '../components/login/stage3'

export default ({onLogin, login, page}) => {
  
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } }

  const [stage, setStage] = useState(0)
  const [state, setState] = useState({name: {v: '', pass: false}, phone: {v: '', pass: false}, pass: {v: '', pass: false}})
  const [hash, setHash] = useState('')

  useEffect(() => {
    setHash(Math.random())
  }, [])
 
  const stage1Complete = (state) => { 
    if (!hash) return
    setHash(hash)
    setState(state)
    setStage(stage+1)
  }

  const stage2Complete = (pass) => {
    if (!pass) return 
    setStage(stage+1)
  }

  const onSeccess = (id, data) => {
    localStorage.setItem('id', id)
    console.log(data)
    onLogin(data)
  }

  return (
    login?<Redirect to={from}/>:
    <Body>
      <Helmet>
        <title>{`${page}|登录`}</title>
      </Helmet>
      {stage === 0 && <Stage1 onSendForm={stage1Complete} />}
      {stage === 1 && <Stage2 onSendForm={stage2Complete} phone={state.phone.v} hash={hash}/>}
      {stage === 2 && <Stage3 data={state} onSeccess={onSeccess}/>}
    </Body>
  )
}
