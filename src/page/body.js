import React from 'react'

export default class Body extends React.PureComponent {

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className={'main-wrapper ' + (this.props.className || '')}>
        <div className="main-wrapper-container">
          {this.props.children}
        </div>  
      </div>
    )
  }
  
}