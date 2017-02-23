import React from 'react'

export default ({ children, mod }) => {
  return (
    <div className={`ui-window ${mod?mod:''}`}>
      { children }
    </div>
  )
}

