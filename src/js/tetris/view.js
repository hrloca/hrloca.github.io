import { resize, size } from './../util/resize'
import { project, view, Mono, Circle, Size, Point, Rectangle } from './Mono'

const background = new Mono({
 bounds: new Rectangle(new Point(0, 0), view.size),
 fillColor: '#fafafa'
})

const mono = new Mono({
  bounds: new Rectangle(new Point(320, 480), new Size(128, 128)),
  strokeColor: '#ddd',
  fillColor: '#fff',
})

const maru = new Circle({
  fillColor: '#fee',
  strokeColor: '#ddd',
  radius: 64,
  center: new Point(500, 700),
})

mono.update = function() {
  this.bounds = new Rectangle(
    new Point(this.bounds.point.x + 0.2, this.bounds.point.y + 0.2),
    new Size(this.bounds.size.w + 0.2, this.bounds.size.h - 0.2)
  )
}

maru.update = function() {
  this.radius = this.radius + 0.2
  this.center = new Point(this.center.x - 0.2, this.center.y - 0.2)
}

view.drow(background)
view.drow(mono)
view.drow(maru)
view.onResize = () => {
  background.bounds = new Rectangle(
    new Point(0, 0),
    new Size(size().w, size().h)
  )
}

