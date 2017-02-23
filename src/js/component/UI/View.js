import React from 'react'

/* [row]
 * bounds
 * center
 * transform
 * alpha
 * backgroundColor
 * hidden
 * contentMode
 * [adv]
 * */

 export const View = ({ children, mod }) => {
  return (
    <div className={`ui-view ${mod?mod:''}`}>
      { children }
    </div>
  )
}

export const SubView = ({ children, mod}) => {
  return (
    <View mod={`ui-subview ${mod?mod:''}`}>
      { children }
    </View>
  )
}

export const Item = ({ children, onClick, mod}) => {
  return (
    <div onClick={onClick} className={`ui-item ${mod?mod:''}`}>
      { children }
    </div>
  )
}

export default View
