import { resize, size } from './../../util/resize'
import { view, Mono, Circle, Size, Point, Rectangle } from './Mono'

const COLOR_MAP = [
  '#fee',
  '#efe',
  '#eef',
  '#eff',
  '#fef',
  '#ffe',
  '#eee',
]

const bg = new Mono({
 bounds: Rectangle(Point(0, 0), view.size),
 fillColor: '#fafafa'
})

const bord = new Mono({
 bounds: Rectangle(Point(view.center.x - 160, view.center.y - 320), Size(320, 640)),
 strokeColor: '#ddd',
 fillColor: '#fff',
})

// color:string
// shape:array
export class Block extends Mono {
  constructor(props) {
    super(props)
    this.color = props.color
    this.shape = props.shape
    this.blocksize = 32
  }
  drow() {
    this.view.ctx.beginPath()
    this.shape.forEach((ar, y) => {
      ar.forEach((v, x) => {
        if (v) {
          const pointX = this.bounds.point.x + (x * this.blocksize)
          const pointY = this.bounds.point.y + (y * this.blocksize)
          this.view.ctx.strokeStyle = this.strokeColor
          this.view.ctx.fillStyle = this.color
          this.view.ctx.rect(pointX, pointY, this.blocksize, this.blocksize)
        }
      })
    })
    this.view.ctx.closePath()
    this.view.ctx.fill()
    this.view.ctx.stroke()
  }
}

const block = new Block({
  color: COLOR_MAP[5],
  shape: [[1,1,0], [0,1,1], [0,0,0]],
  strokeColor: '#ddd',
})

view.onResize = () => {
  bg.bounds = Rectangle(
    Point(0, 0),
    Size(size().w, size().h)
  )
  bord.point = Point(view.center.x - 160, view.center.y - 320)
}

view.put(bg)
view.put(bord)
view.put(block)
