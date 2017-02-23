import React from 'react'
import { Item } from './View';

const statusEnum = [
  '',
  '-start',
  '-done',
]

export default ({ status, mod }) => {
  return (
    <Item mod={`ui-progress ${mod?mod:''}`}>
      <div className={`ui-progress_gauge ${statusEnum[status]}`}></div>
    </Item>
  )
}
