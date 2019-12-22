import React, {useReducer} from 'react'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_USER = 'SET_USER'
export const TOGGLE_SIDE_BAR = 'TOGGLE_SIDE_BAR'
export const TOGGLE_PERSON_BAR = 'TOGGLE_PERSON_BAR'
export const CLOSE_ALL = 'CLOSE_ALL'

export const AuthContext = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, login: true, user: action.payload}
    case LOGOUT:
      return {...state, login: false, user: null, personBar: false}
    case SET_USER:
      return {...state, user: action.payload}
    case TOGGLE_SIDE_BAR:
      return {...state, sideBar: !state.sideBar}
    case TOGGLE_PERSON_BAR:
      return {...state, personBar: !state.personBar}
    case CLOSE_ALL:
      return {...state, personBar: false, sideBar: false}
    default: 
      return state
  }
}

const defaultStore = {
  login: false, 
  user: null,
  sideBar: false,
  personBar: false
}

export const AuthProvider = ({children}) => {

  const store = useReducer(reducer, defaultStore)

  return (
    <AuthContext.Provider value={store}>
      {children}
    </AuthContext.Provider>
  )
}