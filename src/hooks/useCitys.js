import {useState, useEffect} from 'react'
import {LocalCity} from '../helper/database'

export default () => {
  const [data, setData] = useState(null)


  useEffect(() => {

    async function getData () {
      const city = await LocalCity.getItem('map')
      if (!city) {
        let list = localStorage.getItem('map')
        if (typeof list !== 'object') list = JSON.parse(list)
        setData(list)
        await LocalCity.setItem('map', list)
      } else {
        setData(city)
      }
    }

    getData()

  }, [])

  return data
}