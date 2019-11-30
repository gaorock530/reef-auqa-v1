import React, {useState, useEffect} from 'react'
import Spinner from '../animate/spinner'

export default ({data, onSeccess}) => {
  

  const [verifying, setVerifying] = useState(true)
  const [seccess, setSeccess] = useState(false)
  
  
  useEffect(() => {
    console.log(data)
    let timer = setTimeout(() => {
      setVerifying(false)
      const isSeccess = Math.random() >= 0
      
      if (isSeccess) onSeccess(123, data)
      else setSeccess(isSeccess)
    }, 2000)

    return () => {
      clearTimeout(timer)
      timer = null
    }
  })

  return (
    <div>
      {verifying?<Spinner />:<div>{seccess?'注册成功': '注册失败'}</div>}
    </div>
  )
}