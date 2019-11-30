import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHandPointRight } from '@fortawesome/free-solid-svg-icons'

/**
 * @param {Function} props.onValid (Boolean) => {}
 * @param {String} props.text
 */

export default class Robot extends React.PureComponent {

  constructor(props) {
    super(props);
    this.current = 0;
    this.onMove = false;
    this.min = 0;
    this.max = 0;
    this.track = 0;
    this.checking = false;
    this.pass = false;


    this.progress = 0;
    this.startTime = null;
    this.cancel = false;

    this.state = {
      pass: false,
      checking: false
    }
  }

  componentDidMount () {
    document.addEventListener('mousemove', this.onMouseMove, false)
    document.addEventListener('mouseup', this.onMouseUp, false)
    document.addEventListener('touchmove', this.onMouseMove, false)
    document.addEventListener('touchend', this.onMouseUp, false)
    document.addEventListener('touchcancel', this.onMouseUp, false)
    this.totalWidth = this.container.offsetWidth;
    this.max = this.totalWidth - this.block.offsetWidth - 4;
  }

  componentWillUnmount () {
    this.animate = null;
    this.delay = null;
    document.removeEventListener('mousemove', this.onMouseMove, false)
    document.removeEventListener('mouseup', this.onMouseUp, false)
    document.removeEventListener('touchmove', this.onMouseMove, false)
    document.removeEventListener('touchend', this.onMouseUp, false)
    document.removeEventListener('touchcancel', this.onMouseUp, false)
  }

  onMouseDown = e => {
    this.onMove = true;
    this.track = e.touches?e.touches[0].pageX:(e.clientX || e.screenX);    
  }

  onMouseMove = e => {
    if (!this.onMove || this.pass) return;
    const pos = e.touches?e.touches[0].pageX:(e.clientX || e.screenX);
    const moved = pos - this.track;
    this.position = Math.min(this.max, Math.max(this.min, this.current + moved))
    this.block.style.left = this.position + 'px';
    
    
    if (this.position === this.max) {
      if (this.state.checking) return;
      this.block.classList.add('checking');
      this.startTime = Date.now();
      this.cancel = false
      this.delay = setTimeout(this.rolling, 50);
      this.setState({checking: true})
    } else {
      clearTimeout(this.delay);
      this.setState({checking: false})
      this.cancel = true;
      this.pass = false;
      this.block.classList.remove('checking');
    }
    
  }

  onMouseUp = e => {
    if (!this.onMove || this.pass) return;
    clearTimeout(this.delay);
    this.setState({checking: false})
    this.onMove = false;
    this.current = this.position;

    if (this.current < this.max || !this.pass) {
      this.block.classList.remove('checking');
      this.cancel = true;
      this.block.style.left = 0;
      this.current = 0
    } 
  }


  rolling = () => {
    if (this.cancel) {
      cancelAnimationFrame(this.animate);
      this.setState({checking: false})
      this.pass = false;
      this.block.classList.remove('checking');
      this.rollingBlock.style.width = 0;
      return;
    }
    if (this.progress >= (this.max+2)) {
      this.pass = true;
      this.cancel = false;
      this.block.classList.remove('checking');
      this.setState({pass: true, checking: false})
      if (this.props.onValid) this.props.onValid(true);
      return cancelAnimationFrame(this.animate);
    }
    const now = Date.now() - this.startTime;
    const percent = now / 1000;
    this.progress = Math.floor(this.max * percent);
    this.rollingBlock.style.width = this.progress + 'px';
    this.animate = requestAnimationFrame(this.rolling)
  }





  render () {
    return (
      <div className="robot-wrapper" ref={el => this.container = el}>
        <div className="robot-text">{this.props.text}</div>
        <div ref={el => this.rollingBlock = el} className="robot-rolling"></div>
        <div className="robot-block" onMouseDown={this.onMouseDown} onTouchStart={this.onMouseDown} onTouchEnd={this.onMouseUp} ref={el => this.block = el}>
          {!this.state.checking && <FontAwesomeIcon icon={this.state.pass?faThumbsUp:faHandPointRight} />}
        </div>
      </div>
    )
  }
}
  


