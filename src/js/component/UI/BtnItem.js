import React from 'react'
import { Item } from './View'

export default ({ children, onClick, mod }) => {
  return (
    <Item onClick={onClick} mod={`ui-btn ${mod?mod:''}`}>
      { children }
    </Item>
  )
}
