import { init_board, select_block, rotate, move } from './store'
import view from './view'

const doc = document

const rotateRBtn = doc.getElementById('r')
const rotateLBtn = doc.getElementById('l')
const leftBtn = doc.getElementById('left')
const rightBtn = doc.getElementById('right')
const downBtn = doc.getElementById('down')

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


export const keymap = new Set();

doc.addEventListener('keydown', (e) => {
  keymap.add(e.key)
  switch (true) {
    case (keymap.has('ArrowLeft') && keymap.has('ArrowDown')):
    move(-1, 1); break;
    case (keymap.has('ArrowRight') && keymap.has('ArrowDown')):
    move(1, 1); break;
    case keymap.has('ArrowDown'):
    move(0, 1); break;
    case keymap.has('ArrowLeft'):
    move(-1, 0); break;
    case keymap.has('ArrowRight'):
    move(1, 0); break;
    case keymap.has('ArrowUp'):
    move(0, -1); break;
    case keymap.has('q'):
    rotate(-1); break;
    case keymap.has('w'):
    rotate(1); break;
  }
})

doc.addEventListener('keyup', (e) => {
  keymap.delete(e.key)
})

export default () => {
  init_board()
  select_block()
}

