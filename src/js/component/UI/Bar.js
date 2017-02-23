import React from 'react'
import { Item } from './View'

export default ({ children, mod }) => {
  return (
    <Item mod={`ui-bar ${mod?mod:''}`}>
      { children }
    </Item>
  )
}

export const BarGroup = ({ children, mod }) => {
  return (
    <Item mod={`ui-bar-group ${mod?mod:''}`}>
      { children }
    </Item>
  )
}

export const BarItem = ({ children, mod, onClick }) => {
  return (
    <Item onClick={onClick} mod={`ui-bar-item ${mod?mod:''}`}>
      { children }
    </Item>
  )
}

export const BarBtnItem = ({ children, onClick = ()=>{}, mod }) => {
  return (
    <Item onClick={onClick} mod={`ui-bar-btn-item ${mod?mod:''}`}>
      { children }
    </Item>
  )
}
