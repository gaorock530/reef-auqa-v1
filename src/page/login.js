import React, {useState, useContext, useRef} from 'react'
import {AuthContext,} from '../context/LoginContext'
import {useLocation, Redirect} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import Body from './body'

import Stage1 from '../components/login/stage1'
import Stage2 from '../components/login/stage2'
import Stage3 from '../components/login/stage3'

export default () => {
  const [{login, page}] = useContext(AuthContext)
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } }

  const [stage, setStage] = useState(0)
  const [state, setState] = useState({name: {v: '', pass: false}, phone: {v: '', pass: false}, pass: {v: '', pass: false}})
  // const [loginState, setLoginState] = useState(login)
  const hash = useRef(Math.random())
 
  const stage1Complete = (state) => { 
    if (!hash) return
    setState(state)
    setStage(stage+1)
  }

  const stage2Complete = (pass) => {
    if (!pass) return 
    setStage(stage+1)
  }

  return (
    login?<Redirect to={from}/>:
    <Body>
      <Helmet>
        <title>{`${page}|注册`}</title>
      </Helmet>
      <div className="constrained--small">
        {stage === 0 && <Stage1 onSendForm={stage1Complete} />}
        {stage === 1 && <Stage2 onSendForm={stage2Complete} phone={state.phone.v} hash={hash}/>}
        {stage === 2 && <Stage3 data={state}/>}
      </div>
      
    </Body>
  )
}
