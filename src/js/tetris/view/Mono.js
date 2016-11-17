import { resize as resize, size as size } from './../../util/resize'

const win = window
const doc = document
const canvas = doc.getElementById('canvas')
const ctx = canvas.getContext('2d')
const raf = win.requestAnimationFrame
const interval = win.setInterval
const ratio = win.devicePixelRatio

//////////////////////////////////////////////////
export const Point = (x, y) => ({x, y})

//////////////////////////////////////////////////
export const Size = (w, h) => ({w, h})

//////////////////////////////////////////////////
export const Rectangle = (point, size) => ({point, size})

//////////////////////////////////////////////////
export const project = {
}

//////////////////////////////////////////////////
const _view = {
  element: canvas,
  ctx: ctx,
  pixelRatio: ratio,
  center: Point(0, 0),
  size: Size(0, 0),
  isFullScreen: true,
  setSize() { // () -> undf
    _view.element.width = _view.size.w * _view.pixelRatio
    _view.element.height = _view.size.h * _view.pixelRatio
    _view.element.style.width = `${_view.size.w}px`
    _view.element.style.height = `${_view.size.h}px`
    _view.ctx.scale(_view.pixelRatio, _view.pixelRatio)
  },
  resizePool: [],
  clickPool: [],
  framePool: [],
  drowPool: [],

  frame() {
    for (let i = 0; i < _view.framePool.length; ++i) { _view.framePool[i]() }
    _view.drowPool.length && drowing()
    raf(_view.frame)
  },

  resize() {
    for (let i = 0; i < _view.resizePool.length; ++i) { _view.resizePool[i]() }
  },
}
export const view = {
  // (mono:Mono) -> Number
  put(mono) {
    return _view.drowPool.push(mono.drow.bind(mono))
  },
  // -> Number
  get pixelRatio() {
    return _view.pixelRatio
  },
  // -> Size
  get center() {
    return Point(_view.size.w / 2, _view.size.h / 2)
  },
  // -> Size
  get size() {
    return _view.size
  },
  set fullscreen(bool) {
    _view.framePool.push(fn)
  },
  // (size:Size)
  set size(size) {
    _view.size = size
    _view.setSize()
  },
  // (fn:Function)
  set onFrame(fn) {
    _view.framePool.push(fn)
  },
  // (fn:Function)
  set onResize(fn) {
    _view.resizePool.push(fn)
  },
  // (fn:Function)
  set onClick(fn) {
    _view.clickPool.push(fn)
  },
}

raf(_view.frame)
resize(_view.resize)

_view.element.addEventListener('click', (e) => {
  for (let i = 0; i < _view.clickPool.length; ++i) { _view.clickPool[i](e) }
})

const drowing = () => {
  _view.ctx.clearRect(0, 0, view.size.w, view.size.h)
  for (let i = 0; i < _view.drowPool.length; ++i) { _view.drowPool[i]() }
}

if (_view.isFullScreen) {
  view.size = Size(size().w, size().h)
  view.onResize = () => {
    view.size = Size(size().w, size().h)
  }
}

//////////////////////////////////////////////////
export class Mono {
  constructor({
    bounds = Rectangle(Point(320, 400), Size(64, 64)),
    strokeColor = '#eee',
    fillColor = '#fff',
  } = {}) {
    // String
    this.id
    // String
    this.className
    // Point
    this.pivot
    // Point
    this.posision
    // Rectangle
    this.bounds = bounds

    // style
    // #000;
    this.strokeColor = strokeColor;
    // #000;
    this.fillColor = fillColor;
    // 1 1 1 1 #000;
    this.shadowColor = 'rgba(0,0,0,0.2)';
    this.shadowBlur = 8;
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;

    // view
    this.view = view
  }

  set update(fn) {
    this.view.onFrame = fn.bind(this)
  }

  drow() {
    ctx.beginPath()
    ctx.rect(this.bounds.point.x, this.bounds.point.y, this.bounds.size.w, this.bounds.size.h)
    ctx.closePath()
    ctx.strokeStyle = this.strokeColor
    ctx.fillStyle = this.fillColor

    // ctx.shadowColor = this.shadowColor;
    // ctx.shadowBlur = this.shadowBlur;
    // ctx.shadowOffsetX = this.shadowOffsetX;
    // ctx.shadowOffsetY = this.shadowOffsetY;

    ctx.stroke()
    ctx.fill()
  }

}

export class Circle extends Mono {
  constructor(props) {
    super(props)
    this.radius = props.radius || 32;
    this.center = props.center || Point(300, 200);
  }

  drow() {
    ctx.beginPath()
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI*2, false);
    ctx.closePath()
    ctx.strokeStyle = this.strokeColor
    ctx.fillStyle = this.fillColor
    ctx.stroke()
    ctx.fill()
  }

}

