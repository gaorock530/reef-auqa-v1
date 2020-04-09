import React, {useState, useEffect} from 'react'
import {TankProvider} from '../../../context/TankContext'
import {useParams} from 'react-router-dom'
import {Helmet} from "react-helmet"
import Spinner from '../../../components/animate/spinner'
import {LocalTanks} from '../../../helper/database'
import View from './tank_view'


export default () => {
  const {id} = useParams()
  const [data, setData] = useState(null)
  const [notFound, setNotFound] = useState(false)
  
  
  useEffect(() => {
    const run = async () => {
      try{
        const readData = await LocalTanks.getItem(id)
        if (!readData) return setNotFound(true)
        setData(readData)
      }catch{
        setNotFound(true)
      }
    }
    run()
  }, [id])
  
  
  return notFound?<span>Not Found</span>:(
    <>
      <Helmet>
        <title>鱼缸详情</title>
        <meta name="description" content="ReefAqua 鱼缸详情" />
      </Helmet>
      <TankProvider>
        {!data?<Spinner/>:<View data={data} id={id}/>}
      </TankProvider>
    </>
  )
}

