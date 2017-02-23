import React from 'react'
import { Item } from './View'

export default class SearchBar extends React.Component {

  onSubmitHandler(cb, cb2, e) {
    e.preventDefault()
    cb && cb(e)
    cb2 && cb2(this.input.value)
    this.input.blur()
  }

  onKeyDownHandler(cb, cb2, e){
    cb && cb(e)
    cb2 && cb2(this.input.value)
  }

  render() {
    return (
      <Item mod={`ui-searchbar -grid-12 ${this.mod?this.mod:''}`}>
        <form action="" className="ui-searchbar-form" onSubmit={this.onSubmitHandler.bind(this, this.props.onSubmit, this.props.submitValue)}>
          <input type="search" ref={(el) => this.input = el} onKeyDown={this.onKeyDownHandler.bind(this, this.props.onKeyDown, this.props.onChange)} className="ui-searchbar-body" />
        </form>
      </Item>
    )
  }
}
