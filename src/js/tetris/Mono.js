const win = window
const doc = document
const canvas = doc.getElementById('canvas')
const ctx = canvas.getContext('2d')
const raf = win.requestAnimationFrame
const interval = win.setInterval
const ratio = win.devicePixelRatio

//////////////////////////////////////////////////
export class Mono {
  constructor() {
    this.Point;
    this.Size;
  }
}

//////////////////////////////////////////////////
export class View {
  constructor() {
    this.awake()
    // 初期化処理
    this.start()
    this.ID = updatePool.push(this.update.bind(this))
    updatePool.push(this.lateUpdate.bind(this))
  }
  awake() {}
  start() {}
  update() {}
  lateUpdate() {}
}

const updatePool = []
const lateUpdatePool = []

const update = () => {
  for (let i = 0; i < updatePool.length; ++i) { updatePool[i]() }
  for (let i = 0; i < lateUpdatePool.length; ++i) { lateUpdatePool[i]() }
  raf(update)
}
raf(update)
