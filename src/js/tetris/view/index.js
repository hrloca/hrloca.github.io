import { resize, size } from './../../util/resize'
import { view, Mono, Circle, Size, Point, Rectangle } from './Mono'

const bg = new Mono({
 bounds: Rectangle(Point(0, 0), view.size),
 fillColor: '#fafafa'
})

const bord = new Mono({
 bounds: Rectangle(Point(view.center.x - 160, view.center.y - 240), Size(320, 480)),
 strokeColor: '#ddd',
 fillColor: '#fff',
})

view.onResize = () => {
  bg.bounds = Rectangle(
    Point(0, 0),
    Size(size().w, size().h)
  )
  bord.bounds = Rectangle(
    Point(view.center.x - 160, view.center.y - 240),
    Size(320, 480)
  )
}

view.put(bg)
view.put(bord)
