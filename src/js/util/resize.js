const win = window

const resizeHandler = [];

export const resize = (handler) => {
  return resizeHandler.push(handler) - 1
}

export const size = () => {
  const w = win.innerWidth
  const h = win.innerHeight
  return {w,h}
}

window.addEventListener('resize', (e) => {
  const wSize = size()
  resizeHandler.forEach(handler => handler(e, wSize.w, wSize.h))
})

