import raf from 'rafl'
import _ from 'lodash'

const win = window || {};
const doc = document || { documentElement: {} };

export const scrollTo = (el, pos = 0) => +el.scrollTop === pos ? el : (el.scrollTop = pos, el);

export default class scroll {

  constructor(el) {
    this.elem = el || scrollDoc();
    this.target = el || doc;
    this.target.addEventListener('scroll', this.handler.bind(this))
    this.subscriber = [];
    this.onStopHandlers = [];

    this.onStopHandler = _.debounce(() => {
      this.onStopHandlers.length === 1 ? this.onStopHandlers[0](this.top()) : this.onStopHandlers.forEach(cb => cb(this.top()))
    }, 250);
  }

  static make(el) {
    return new scroll(el);
  }

  handler(e) {
    this.subscriber.length === 1 ? this.subscriber[0](this.top()) : this.subscriber.forEach(cb => cb(this.top()));
    this.onStopHandler();
  }

  top() {
    return this.elem.scrollTop;
  }

  subscribe(cb) {
    this.subscriber.push(cb);
  }

  onStop(cb) {
    this.onStopHandlers.push(cb);
  }

  to(to = 0, opt = {}) {
    const start = +new Date
    const from = this.elem.scrollTop;
    const ease = opt.ease || inOutSine;
    const duration = opt.duration || 350;
    const cb = opt.cb || (() => {});
    const anim = () => {
      const now = +new Date;
      const time = Math.min(1, ((now - start) / duration));
      const eased = ease(time);
      this.elem.scrollTop = (eased * (to - from)) + from;
      time < 1 ? raf(anim) : cb(null, this.elem.scrollTop);
    }
    raf(anim);
  }

}

const inOutSine = (n) => .5 * (1 - Math.cos(Math.PI * n))

const detectScrollElem = () => {
  const startScrollTop = win.pageYOffset;
  doc.documentElement.scrollTop = startScrollTop + 1;
  if (window.pageYOffset > startScrollTop) {
    doc.documentElement.scrollTop = startScrollTop;
    return doc.documentElement;
  }
  return doc.body;
}

const scrollElem = typeof win.pageYOffset === 'undefined' ?  doc.documentElement : null;
const scrollDoc = () => scrollElem || detectScrollElem();

