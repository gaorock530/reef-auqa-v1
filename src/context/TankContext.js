import React, {useRef} from 'react'

export const TankContext = React.createContext()

export const TankProvider = ({children}) => {

  const auth = useRef(!!localStorage.getItem('id'))

  return (
    <TankContext.Provider value={auth.current}>
      {children}
    </TankContext.Provider>
  )
}