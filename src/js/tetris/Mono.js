import { resize as resize, size as size } from './../util/resize'

const win = window
const doc = document
const canvas = doc.getElementById('canvas')
const ctx = canvas.getContext('2d')
const raf = win.requestAnimationFrame
const interval = win.setInterval
const ratio = win.devicePixelRatio

//////////////////////////////////////////////////
export class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

//////////////////////////////////////////////////
export class Size {
  constructor(w, h) {
    this.w = w
    this.h = h
  }
}

//////////////////////////////////////////////////
export class Rectangle {
  constructor(point, size) {
    this.point = point
    this.size = size
  }
}


//////////////////////////////////////////////////
export const project = {
}

//////////////////////////////////////////////////
const _view = {
  element: canvas,
  ctx: ctx,
  pixelRatio: ratio,
  center: new Point(0, 0),
  size: new Size(0, 0),
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
    _view.ctx.clearRect(0, 0, view.size.w, view.size.h)
    drowing()
    raf(_view.frame)
  },
  resize() {
    for (let i = 0; i < _view.resizePool.length; ++i) { _view.resizePool[i]() }
    if (_view.isFullScreen) {
      view.size = new Size(size().w, size().h)
    }
  },
}

raf(_view.frame)
resize(_view.resize)

_view.element.addEventListener('click', (e) => {
  for (let i = 0; i < _view.clickPool.length; ++i) { _view.clickPool[i](e) }
})

const drowing = () => {
  for (let i = 0; i < _view.drowPool.length; ++i) { _view.drowPool[i]() }
}

export const view = {
  // -> Number
  drow(mono) {
    return _view.drowPool.push(mono.drow.bind(mono))
  },
  // -> Number
  get pixelRatio() {
    return _view.pixelRatio
  },
  // -> Size
  get center() {
    return new Point(_view.size.w / 2, _view.size.h / 2)
  },
  // -> Size
  get size() {
    return _view.size
  },
  set fullscreen(bool) {
    _view.framePool.push(fn)
  },
  // (Size)
  set size(size) {
    _view.size = size
    _view.setSize()
  },
  // (Function)
  set onFrame(fn) {
    _view.framePool.push(fn)
  },
  // (Function)
  set onResize(fn) {
    _view.resizePool.push(fn)
  },
  // (Function)
  set onClick(fn) {
    _view.clickPool.push(fn)
  },
}

_view.isFullScreen && (view.size = new Size(size().w, size().h));

//////////////////////////////////////////////////
export class Mono {
  constructor({
    bounds = new Rectangle(new Point(320, 400), new Size(64, 64)),
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
    _view.ctx.beginPath()
    _view.ctx.rect(this.bounds.point.x, this.bounds.point.y, this.bounds.size.w, this.bounds.size.h)
    _view.ctx.closePath()
    _view.ctx.strokeStyle = this.strokeColor
    _view.ctx.fillStyle = this.fillColor

    _view.ctx.shadowColor = this.shadowColor;
    _view.ctx.shadowBlur = this.shadowBlur;
    _view.ctx.shadowOffsetX = this.shadowOffsetX;
    _view.ctx.shadowOffsetY = this.shadowOffsetY;

    _view.ctx.stroke()
    _view.ctx.fill()
  }

}

export class Circle extends Mono {
  constructor(props) {
    super(props)
    this.radius = props.radius || 32;
    this.center = props.center || new Point(300, 200);
  }

  drow() {
    _view.ctx.beginPath()
    _view.ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI*2, false);
    _view.ctx.closePath()
    _view.ctx.strokeStyle = this.strokeColor
    _view.ctx.fillStyle = this.fillColor
    _view.ctx.stroke()
    _view.ctx.fill()
  }

}

