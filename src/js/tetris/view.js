import { resize as _resize, size as _size } from './../util/resize'
import { Mono } from './Mono'

const win = window
const doc = document
const raf = win.requestAnimationFrame
const ratio = win.devicePixelRatio
const canvas = doc.getElementById('canvas')
const ctx = canvas.getContext('2d')

const grid = {
  size: 32,
}

const board = {
  w: grid.size * 10,
  h: grid.size * 20,
}

const drowBoard = () => {
  const wSize = _size()
  const point = [wSize.w / 2 - board.w / 2, wSize.h / 2 - board.h / 2, board.w, board.h]
  ctx.strokeStyle = '#ddd'
  ctx.strokeRect(...point)
  ctx.fillStyle = '#fff'
  ctx.fillRect(...point)
}

const drowBackground = (w, h) => {
  ctx.fillStyle = '#f9f9f9'
  ctx.fillRect(0,0,w,h)
}

export default () => {
  const wSize = _size()
  const w = wSize.w
  const h = wSize.h
  initialCanvasSize(w, h)
  drowBackground(w, h)
  drowBoard(w, h)
}

_resize((e, w, h) => {
  const wSize = _size()
  initialCanvasSize(w, h)
  drowBackground(w, h)
  drowBoard(w, h)
})

const initialCanvasSize = (w, h) => {
  canvas.width = w * ratio
  canvas.height = h * ratio
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  ctx.scale(ratio, ratio)
}
