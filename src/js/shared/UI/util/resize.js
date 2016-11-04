export default (handler) => {
  return resizeHandler.push(handler) - 1;
}

const resizeHandler = [];
window.addEventListener('resize', (e) => {
  resizeHandler.forEach(handler => handler(e));
});
