import {useEffect, useState} from 'react'
import {LocalTanks} from '../helper/database'

export default (defaultValue) => {
  const [measureOption, setMeasureOption] = useState(defaultValue)
  const [volumeData, setVolumeData] = useState([])

  useEffect(() => {
    let readData = [], display = []
    LocalTanks.iterate(function(value) {
      readData.unshift(value.volume)
      display.unshift(value.name + ": " + value.volume + 'L')
    }).then(function() {
        // console.log('Iteration has completed')
        setMeasureOption([...defaultValue, ...display])
        setVolumeData(readData)
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err)
    })

    return () => {
      readData = undefined
      display = undefined
    }
  }, [defaultValue])

  return [volumeData, measureOption]
}

