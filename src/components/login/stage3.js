import React, { useEffect, useContext } from 'react'
import {AuthContext, LOGIN} from '../../context/LoginContext'
import Spinner from '../animate/spinner'

export default ({data}) => {

  const [, dispatch] = useContext(AuthContext)
  
  useEffect(() => {
    let timer = setTimeout(() => {
      localStorage.setItem('id', 123)
      dispatch({type: LOGIN, payload: data.name.v})
    }, 2000)

    return () => {
      clearTimeout(timer)
      timer = null
    }
  }, [dispatch, data])

  return (
    <Spinner />
  )
}