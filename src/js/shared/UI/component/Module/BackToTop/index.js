import React from 'react'
import scroll from './../../../util/scroll'

export default class BackToTop extends React.Component {

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.target = this.props.elem;
    this.scroll = scroll.make(this.target);
    this.state = {
      isVisible: false
    }
    this.targetBody = this.props.elem || document.body;
    this.displaySize = window.innerHeight;

    this.scroll.onStop((scroll) => {
      this.isVisible(scroll) ?
        this.setState({ isVisible: true }) :
        this.setState({ isVisible: false })
    });

    this.scroll.subscribe((scroll) => {
      this.setState({ isVisible: false });
    });
  }

  isVisible(scroll) {
    return scroll > this.displaySize;
  }

  click() {
    this.scroll.to(0);
  }

  render() {
    return (
      <div onClick={this.click} className={`m-backToTop --init ${this.state.isVisible ? '--show' : ''}`}>
        <span className="c-ico --mono-primary-arrow-t"></span>
      </div>
    )
  }
}
