import React, {useState} from 'react'
import Input from '../form/input'
import validator from 'validator'

const error = {
  name: '昵称不能为空或超过字数限制',
  phone: '手机号码格式不正确',
  pass: '密码过于简单，由不小于8位且包含数字和字母组成'
}

const invalid = {
  name: '该昵称已被使用',
  phone: '该手机号码已被使用'
}


export default ({onSendForm}) => {
  

  const [allow, setAllow] = useState(false)
  const [state, setNewState] = useState({name: {v: '', pass: false}, phone: {v: '', pass: false}, pass: {v: '', pass: false}})
  const [checking, setChecking] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)

  const [errorList, setErrorLIst] = useState({
    name: [],
    phone: []
  })
  
  const onChange = (type, v, pass) => {
    let valid = true
    const newType = {v, pass}
    const newState = {...state, [type]: newType}

    if (type === 'name' && nameError) setNameError(false)
    if (type === 'phone' && phoneError) setPhoneError(false)

    for(let item in newState) {
      if (!newState[item].pass) {
        valid = false
        break
      }
    }
    setNewState(newState)
    setAllow(valid)
  }

  const validateName = v => v.length >= 2 && v.length <= 20
  const validatePhone = v => validator.isMobilePhone(String(v), 'zh-CN')
  const validatePass = v => v.length >= 8

  const onSubmit = (e) => {
    e.preventDefault()
    if (!allow) return
    let error = false
    setChecking(true)
    setTimeout(() => {
      if (errorList.name.includes(state.name.v)) {
        console.log('name exist')
        setNameError(true)
        error = true
      } else if (state.name.v === '123') {
        setErrorLIst({...errorList, name: [...errorList.name, state.name.v]})
        setNameError(true)
        error = true
      }
      if (errorList.phone.includes(state.phone.v)) {
        console.log('phone exist')
        setPhoneError(true)
        error = true
      } else if (state.phone.v === '13681221170') {
        setErrorLIst({...errorList, phone: [...errorList.phone, state.phone.v]})
        setPhoneError(true)
        error = true
      }
 
      console.log('error', error, errorList)
      setChecking(false)
      if (!error) onSendForm(state)
      else {
        setChecking(false)
        setAllow(false)
      }
    }, 2000)
  }

  return (
    <form onSubmit={onSubmit}>
      <Input icon="user" placeholder="昵称" validate={validateName} error={nameError?invalid.name:error.name} onChange={onChange.bind(this, 'name')} max={20} forceError={nameError}/>
      <Input icon="phone" placeholder="手机" validate={validatePhone} error={phoneError?invalid.phone:error.phone} onChange={onChange.bind(this, 'phone')} forceError={phoneError}/>
      <Input icon="setPass" placeholder="密码" validate={validatePass} error={error.pass} onChange={onChange.bind(this, 'pass')} max={50}/>
      <button disabled={!allow || checking || nameError || phoneError}>{checking?'检测中':'下一步'}</button>
    </form>
  )
}