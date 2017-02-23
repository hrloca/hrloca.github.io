import React from 'react'
import { Item } from './View'

export default ({ children, mod, onClick }) => {
  return (
    <Item onClick={onClick} mod={`ui-scrollview ${mod?mod:''}`}>
      { children }
    </Item>
  )
}
