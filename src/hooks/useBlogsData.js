import {useState, useEffect} from 'react'
import {LocalBlogs} from '../helper/database'

export default () => {
  const [data, setData] = useState(null)


  useEffect(() => {
    const readData = []
    LocalBlogs.iterate(function(value, key) {
      // Resulting key/value pair -- this callback
      // will be executed for every item in the
      // database.
      value.id = key
      readData.unshift(value)
      // console.log([key, value]);
    }).then(function() {
        // console.log('Iteration has completed')
        setData(readData)
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err)
    })
  
  }, [])

  return data
}