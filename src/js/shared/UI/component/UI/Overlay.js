import React from 'react'

/*
 * type
 * 0: transparency(default)
 * 1: dark
 * 2: white
 * */

const TYPE = [
  'transparency',
  'dark',
  'white',
];

const SCREEN = [
  '',
  '--fullscreen',
];

const overlayType = (type) => TYPE[type] || TYPE[0];
const screen = (mode) => SCREEN[mode] || SCREEN[0];

export default (props) =>  {
  return (
    <div
      onClick={props.onClick}
      className={`
        ui-overlay
        ui-overlay-${overlayType(props.type)}
        --init
        ${screen(props.screen)}
        ${props.active ? '--on' : ''}
      `} >
    </div>
  );
}

