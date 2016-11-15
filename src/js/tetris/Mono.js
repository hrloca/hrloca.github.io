import { resize as _resize, size as _size } from './../util/resize'

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
/*
 * awake()
 * start()
 * update()
 * lateUpdate()
 * */
export class View {
  constructor() {
    this.pixelRatio = ratio
    this.size; // Size
    this.center; // Point

    this.awake()
    // 初期化処理
    this.start()
    this.resize && _resize(this.resize)
    this.update && framePool.push(this.update.bind(this))
    this.lateUpdate && lateframePool.push(this.lateUpdate.bind(this))
  }
  awake() {}
  start() {}
}

const framePool = []
const lateframePool = []
const frame = () => {
  for (let i = 0; i < framePool.length; ++i) { framePool[i]() }
  for (let i = 0; i < lateframePool.length; ++i) { lateframePool[i]() }
  raf(frame)
}
raf(frame)

//////////////////////////////////////////////////
class Item extends View {
  constructor(props) {
    super(props)
  }
}

export const Mono = { Item }
