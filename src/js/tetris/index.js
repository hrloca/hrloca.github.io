import Im from 'immutable'
import { createStore } from 'redux'

const COL = 10
const ROW = 20

const shape = [
  [[0,0,0,0],
   [1,1,1,1],
   [0,0,0,0],
   [0,0,0,0]],

  [[0,0,0,0],
   [0,1,1,0],
   [0,1,1,0],
   [0,0,0,0]],

  [[0,0,1],
   [1,1,1],
   [0,0,0]],

  [[1,0,0],
   [1,1,1],
   [0,0,0]],

  [[0,1,0],
   [1,1,1],
   [0,0,0]],

  [[1,1,0],
   [0,1,1],
   [0,0,0]],

  [[0,1,1],
   [1,1,0],
   [0,0,0]],
];

const kick = {
  '01': [[ 0, 0], [-1, 0], [-1, 1], [ 0,-2], [-1,-2]],
  '10': [[ 0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
  '12': [[ 0, 0], [ 1, 0], [ 1,-1], [ 0, 2], [ 1, 2]],
  '21': [[ 0, 0], [-1, 0], [-1, 1], [ 0,-2], [-1,-2]],
  '23': [[ 0, 0], [ 1, 0], [ 1, 1], [ 0,-2], [ 1,-2]],
  '32': [[ 0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]],
  '30': [[ 0, 0], [-1, 0], [-1,-1], [ 0, 2], [-1, 2]],
  '03': [[ 0, 0], [ 1, 0], [ 1, 1], [ 0,-2], [ 1,-2]],
}
const iKick = {
  '01': [[ 0, 0],[-2, 0],[ 1, 0],[-2, 1],[ 1, 2]],
  '10': [[ 0, 0],[ 2, 0],[-1, 0],[ 2, 1],[-1,-2]],
  '12': [[ 0, 0],[-1, 0],[ 2, 0],[-1, 2],[ 2,-1]],
  '21': [[ 0, 0],[ 1, 0],[-2, 0],[ 1,-2],[-2, 1]],
  '23': [[ 0, 0],[ 2, 0],[-1, 0],[ 2, 1],[-1,-2]],
  '32': [[ 0, 0],[-2, 0],[ 1, 0],[-2,-1],[ 1, 2]],
  '30': [[ 0, 0],[ 1, 0],[-2, 0],[ 1,-2],[-2, 1]],
  '03': [[ 0, 0],[-1, 0],[ 2, 0],[-1, 2],[ 2,-1]],
}


// store //////////////////////////////////////////////////////

const __state = {
  score: 0,
  bgm: 0,
  level: 1,
  board: [],
  block: {
    id: 0,
    rotate: 0,
    X: 4,
    Y: 0,
    body: [],
  },
}

const store = createStore((state = __state, action) => {
  switch (action.type) {
    // init --------------------------------------------------
    case 'init_board':
      return Im.Map(state).set('board', initBoard()).toJS()
    case 'select_block':
      const currentId = random(shape.length)
      const currentShape = makeBlock(selectShape(currentId), currentId)
      return Im.fromJS(state)
        .updateIn(['block', 'id'], () => currentId)
        .updateIn(['block', 'body'], () => Im.fromJS(currentShape))
        .toJS()

    // controll --------------------------------------------------
    case 'rotate':
      const rotatedBlockBody = state.block.body.map(action.dir === 1 ? rotateRightLogic : rotateLeftLogic)
      const nextRotate = roop(3)(state.block.rotate, action.dir)
      const rotatePattern = `${state.block.rotate}${nextRotate}`
      const kickedOffset = validRotate(state.block.X, state.block.Y, rotatePattern, rotatedBlockBody, state.board)
      if (!kickedOffset) return state
      return Im.fromJS(state)
        .updateIn(['block', 'body'], () => Im.fromJS(rotatedBlockBody))
        .updateIn(['block', 'X'], v => v + kickedOffset[0])
        .updateIn(['block', 'Y'], v => v + kickedOffset[1])
        .updateIn(['block', 'rotate'], v => nextRotate)
        .toJS()
    case 'move':
      const moveValidX = validX(action.x, state.block.X, state.block.Y, state.block.body, state.board)
      const moveValidY = validY(action.y, state.block.X, state.block.Y, state.block.body, state.board)
      return Im.fromJS(state)
        .updateIn(['block', 'X'], v => !(action.x && moveValidX) ? v : v + action.x)
        .updateIn(['block', 'Y'], v => !(action.y && moveValidY) ? v : v + action.y)
        .toJS()
    default:
      return state
  }
})

const validX = (offsetX = 0, currentX, currentY, block, board) => {
  return chkEveryAry2d(block, (c, x, y) => {
    const nowY = y + currentY
    const nextX = x + currentX + offsetX
    return c === 0 || checkBordCell(nextX, nowY, board)
  })
}

const validY = (offsetY = 0, currentX, currentY, block, board) => {
  return chkEveryAry2d(block, (c, x, y) => {
    const nextY = y + currentY + offsetY
    const nowX = x + currentX
    return c === 0 || checkBordCell(nowX, nextY, board)
  })
}

const validRotate = (currentX, currentY, rotatePattern, block, board) => {
  const len = block.length
  const kickPttern = len !== 3 ? iKick[rotatePattern] : kick[rotatePattern]
  return kickPttern.find((offset) => {
    return chkEveryAry2d(block, (c, x, y) => {
      const nextX = x + currentX + offset[0]
      const nextY = y + currentY + offset[1]
      const is = c === 0 || checkBordCell(nextX, nextY, board)
      return is
    })
  })
}

const checkBordCell = (x, y, board) => !(
  board[y] === undefined ||
  board[y][x] === undefined ||
  board[y][x]
)

// init ---
const makeBlock = (shape, id) => makeAry2d(shape, (c, x, y) => c ? id + 1 : c)
const initBoard = () => arrayPool(ROW).map(() => arrayPool(COL).map(() => 0))
const selectShape = (id) => shape[id] || shape [0]

// controll ---
// rotate
const rotateRightLogic = (l, y, a) => l.map((c, x) => a[a.length - 1 - x][y])
const rotateLeftLogic = (l, y, a) => l.map((c, x) => a[x][a.length - 1 - y])

// util ---
const arrayPool = (num) => Array.apply(null, Array(num))
const random = (num) => Math.floor( Math.random() * num )
const makeAry2d = (a2d, cb) => a2d.map((l, y, a) => l.map((c, x) => cb(c, x, y, a)))
const chkEveryAry2d = (a2d, cb) => a2d.every((l, y, a) => l.every((c, x) => cb(c, x, y, a)))
const roop = (m) =>(c, d) => {
  const res = c + d
  switch (true) {
    case res > m: return 0
    case res < 0: return m
    default: return res;
  }
}


// action //////////////////////////////////////////////////////

const init_board = () => store.dispatch({type: 'init_board'})
const select_block = () => store.dispatch({type: 'select_block'})

const rotate = (dir) => store.dispatch({type: 'rotate', dir})
const move = (x, y) => store.dispatch({type: 'move', x, y})

// main //////////////////////////////////////////////////////

export default () => {
  init_board();
  select_block();
}

store.subscribe(() => {
  const block = store.getState().block;
  block.body.forEach(v => console.log(v))
  console.log(`POS:(${block.X},${block.Y})`)
})

// view //////////////////////////////////////////////////////

const rotateRBtn = document.getElementById('r');
const rotateLBtn = document.getElementById('l');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const downBtn = document.getElementById('down');

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
