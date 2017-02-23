import React from 'react'
import Bar, { BarGroup, BarItem } from './Bar';

export default ({ children }) => {
  return (
    <Bar> {children} </Bar>
  )
}

export const TabbarGroup = ({ children }) => {
  return (
    <BarGroup>
      { children }
    </BarGroup>
  )
}

export const TabbarItem = ({ children, onClick = ()=>{} }) => {
  return (
    <BarItem>
      { children }
    </BarItem>
  )
}
