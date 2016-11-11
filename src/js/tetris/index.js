import { init_board, select_block, rotate, move } from './store'
import view from './view'

export default () => {
  init_board()
  select_block()
  view()
}

const rotateRBtn = document.getElementById('r')
const rotateLBtn = document.getElementById('l')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const downBtn = document.getElementById('down')

leftBtn.addEventListener('click', () => {
  move(-1, 0)
})
rightBtn.addEventListener('click', () => {
  move(1, 0)
})
downBtn.addEventListener('click', () => {
  move(0, 1)
})
rotateLBtn.addEventListener('click', () => {
  rotate(-1)
})
rotateRBtn.addEventListener('click', () => {
  rotate(1)
})
