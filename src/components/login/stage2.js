import React, {useState} from 'react'
import Spinner from '../animate/spinner'
import Input from '../form/input'
import Static from '../form/static'
import Robot from '../form/robot'

const errorText = '验证码不正确'

export default ({onSendForm, phone}) => {  

  const [allow, setAllow] = useState(false)
  const [code, setCode] = useState('') // !!! for test
  const [codeStatus, setCodeStatus] = useState(0) // 0-idle 1-getting 2-got
  const [codeInput, setCodeInput] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)

  const sendCode = (valid) => {
    if (!valid) return
    setCodeStatus(1)
    setTimeout(() => {
      // setCode(String(Math.floor(Math.random()*999999)))
      setCode('123456')
      setCodeStatus(2)
    }, 2000) 
  }

  const validateCode = v => {
    if (error) setError(false)
    setCodeInput(v)
    setAllow(String(v).length === 6)
  }



  const onSubmit = (e) => {
    e.preventDefault()
    if (!allow) return
    // console.log(code)
    setChecking(true)
    setTimeout(() => {
      if (codeInput !== code) {
        setError(true)
        setChecking(false)
      } else {
        onSendForm(codeInput, code)
      }
    }, 2000)
    
  }

  return (
    <form onSubmit={onSubmit}>
      <Static icon="phone" value={phone}/>
      <Robot onValid={sendCode} text="向右滑动获取验证码"/>
      {codeStatus === 1 && <Spinner text="发送中"/>}
      {codeStatus === 2 && <Input placeholder="验证码" error={errorText} onChange={validateCode} forceError={error} max={6} icon="key" autoFocus={true}/>}
      <button disabled={!allow || checking || error}>{checking?'检测中':'注册'}</button>
    </form>
  )
}