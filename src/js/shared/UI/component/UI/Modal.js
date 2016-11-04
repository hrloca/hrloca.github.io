import React from 'react'

/*
 * type
 * 0: mini(default)
 * 1: full
 * */

const TYPE = [
  'mini',
  'full',
];

const modalType = (type) =>  TYPE[type] || TYPE[0];

export default (props) =>  {
  return (
    <div
    className={`ui-modal ui-modal-${modalType(props.type)} --init ${props.active ? '--on' : '--off'}`}>
      { props.children }
    </div>
  )
}
