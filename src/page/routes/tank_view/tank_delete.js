import React, {useState} from 'react'
import {LocalTanks} from '../../../helper/database'
import {Redirect} from 'react-router-dom'

export default ({name, id, setShowDelete}) => {
  const [redirect, setRedirect] = useState(false)

  const deleteTank = async (e) => {
    e.preventDefault()
    if (e.target.id.value !== name) return setShowDelete(false)
    try {
      await LocalTanks.removeItem(id)
      setRedirect(true)
    } catch {
      setShowDelete(false)
    }
  }
  return redirect?<Redirect to="/tanks"/>:(
    <div className="tank-delete">
      <form onSubmit={deleteTank}>
        <h3>注意：此操作不可逆转！</h3>
        <input type="text" placeholder="输入鱼缸名称" name="id"/>
        <button type="submit">删除</button>
        <button type="reset" onClick={() => setShowDelete(false)}>取消</button>
      </form>
    </div>
  )
}