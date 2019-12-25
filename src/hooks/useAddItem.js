import { useState } from 'react'

export default (init = []) => {
  const [state, setState] = useState(init)
  // addItem action
  const onAddItem = item => {
    let has = false
    // check repeat item
    if (state.length > 0) has = state.reduce((repeat, it) => it.id === item[2].id || repeat, false)
    if (!has) setState([...state, {...item[2], quantity: 1, icon: item[0].icon}])
  }

  // Increase added item quantity action
  const onAdd = id => {
    const newState = state.map(item => {
      if (item.id === id) item.quantity++
      return item
    })
    setState(newState)
  }

  // Decrease added item quantity action
  const onDel = id => {
    const hold = state.map(item => {
      if (item.id === id) item.quantity--
      return item
    })
    const newState = hold.filter(item => item.quantity >= 0)
    setState(newState)
  }

  // Direct input to change item's quantity
  const onChange = (id, quantity) => {
    const newState = state.map(item => {
      if (item.id === id) item.quantity = quantity
      return item
    })
    setState(newState)
  }

  return {state, onAddItem, onAdd, onDel, onChange}
}