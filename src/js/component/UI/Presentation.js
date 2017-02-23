import React from 'react'
import View, { SubView } from './View'

export default ({ children, mod }) => {
  return (
    <View mod={`ui-presentation ${mod?mod:''}`}>
      { children }
    </View>
  )
}

export const PresentationItem = ({ children, mod }) => {
  return (
    <SubView className={`ui-presentation-body ${mod?mod:''}`}>
      { children }
    </SubView>
  )
}
