import React from 'react'
import { HelmetProvider } from 'react-helmet-async'

export default class Body extends React.PureComponent {

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <HelmetProvider>
        <div className={'main-wrapper ' + (this.props.className || '')}>
          <div className="main-wrapper-container">
            {this.props.children}
          </div>  
        </div>
      </HelmetProvider>
    )
  }
  
}