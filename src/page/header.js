import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.login = this.props.login
  }

  shouldComponentUpdate (nextProps, nextState) {

    if (this.login !== nextProps.login) {
      this.login = nextProps.login
      return true
    }
    return false
  }

  render () {
    console.log('render Header')
    return (
      <header>
        <div className="header-wrapper">
          <div className="header-left">
            <div className="header-menu button" onClick={this.props.onShowBar}><FontAwesomeIcon icon={faBars} size="2x"/></div>
            <Link className="header-title" to="/">MagicAqua</Link>
          </div>
          
          <div className="header-icon button">{this.props.login?<button onClick={this.props.onShowPerson}></button>:<Link to="/login">登录</Link>}</div>
        </div>
      </header>
    )
  }

  
}


// export default ({login, onShowBar, onShowPerson}) => {

//   console.log('render Header')
//   return (
//     <header>
//       <div className="header-wrapper">
//         <div className="header-left">
//           <div className="header-menu" onClick={onShowBar}><FontAwesomeIcon icon={faBars} size="2x"/></div>
//           <div className="header-title">MagicAqua</div>
//         </div>
        
//         <div className="header-icon">{login?<button></button>:<Link to="/login">登录</Link>}</div>
//       </div>
//     </header>
//   )
// }

