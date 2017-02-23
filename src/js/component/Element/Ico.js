import React from 'react'

const def = {
  type: 'default',
  color: 'gray',
  size: '2',
}

export default ({size, id, type, color}) => {
  const _type = type || def.type
  const _color = color || def.color
  const _size = size || def.size
  return (
    <span className={`ico -size-${_size}`}>
      <span className={`ico_body -type-${_type} -color-${_color}`}>
        <svg className={`ico_core -type-${_type}`} viewBox="0 0 32 32" preserveAspectRatio="xMidYMid slice"><use xlinkHref={`#${id}`} /></svg>
      </span>
    </span>
  )
}
