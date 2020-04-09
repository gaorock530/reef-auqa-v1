import React from 'react'

export default ({friends, onSelect}) => {

  const onClickFriend = v => {
    if (onSelect) onSelect(v)
  }

  const List = ({data}) => <li className={data.selected?'selected':null} onClick={onClickFriend.bind(this, data.id)}>
    <picture></picture>
    <span>{data.name}</span>
  </li>

  const renderList = list => list.map(li => <List key={li.id} data={li}/>)

  return (
    <div className="contacts">
      <div className="banner"></div>
      <ul>
        {renderList(friends)}
      </ul>
    </div>
  )
}