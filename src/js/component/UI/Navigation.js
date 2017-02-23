import React from 'react'
import Bar, { BarGroup, BarItem } from './Bar';

export default ({children}) => {
  return (
    <Bar> {children} </Bar>
  )
}


export const NavigationGroup = ({ children }) => {
  return (
    <BarGroup>
      { children }
    </BarGroup>
  )
}

export const NavigationItem = ({ children, onClick = ()=>{} }) => {
  return (
    <BarItem>
      { children }
    </BarItem>
  )
}


export class NavigationView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cache: 5,
      index: 0,
      exec: 0,
      context: 0,
      stack: [],
      view: Array(this.cache).fill(null),
    }
  }

  componentWillReceiveProps(nextProps) {
    switch (true) {
      case nextProps.exec === 0:
        if (this.state.stack[this.state.stack.length - 1] === nextProps.id) {
          return
        }
        const newStack = this.state.stack.slice(0, this.state.context).concat([nextProps.id])
        this.setState({
          stack: newStack,
          context: this.state.context + 1
        })
        break;

      case nextProps.exec === 1:
        const forwardContext = this.state.stack.length - 1 < this.state.context ? this.state.context : this.state.context + 1
        this.setState({ context: forwardContext })
        break;

      case nextProps.exec === -1:
        const backContext = this.state.context <= 1 ? 1 : this.state.context - 1
        this.setState({ context: backContext })
        break;
    }
  }

  render() {
    console.log(this.state.stack, this.state.context)
    const starting = this.state.context - this.state.cache
    const end = this.state.context
    return (
      <div className="ui-navigation-screen">
        {
          this.state.stack.filter((v,i,a) => {
            return starting - 1 < i && i < end
          }).map((v, i, a) => {
            const isCurrent = a.length - 2 === i
            const isNext = a.length - 1 === i
            return <ViewBody next={isNext} current={isCurrent} key={i}>{this.props.children}</ViewBody>
          })
        }
      </div>
    )
  }
}

const ViewBody = ({ current, next, prev, children, i }) => {
  return (
    <div
      key={i}
      className={`
      ui-navigation-view
      ${current ? '-current': ''}
      ${next ? '-next': ''}
      ${prev ? '-prev': ''}`}>{children}</div>
  )
}

