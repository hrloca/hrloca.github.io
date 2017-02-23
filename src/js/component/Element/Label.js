import React from 'react'

export default ({ children, mod }) => {
  return (
    <span className={`${mod?mod:''}`}>
      { children }
    </span>
  )
}
