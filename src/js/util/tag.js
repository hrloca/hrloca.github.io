export default (elmStr) => {
  return new Dom(elmStr)
}

class Dom {

  constructor(elmStr, parentDom) {
    this.element = elmStr ? document.createElement(elmStr)
      : document.createDocumentFragment()
    this.parentDom = parentDom
    this.childrenNodeStack = []
  }

  text(textStr) {
    this.element.textContent = textStr
    return this
  }

  addClass(className) {
    this.element.classList.add(className)
    return this
  }

  removeClass(className) {
    this.element.classList.remove(className)
    return this
  }

  id(idStr) {
    this.attr('id', idStr)
    return this
  }

  attr(name, value) {
    if (name && value === undefined) {
      return this.element.getAttribute(name)
    }
    this.element.setAttribute(name, value)
    return this
  }

  removeAttr(name) {
    this.element.removeAttribute(name)
    return this
  }

  tag(elmStr) {
    const child = new Dom(elmStr, this)
    this.__pushStack(child)
    return child
  }

  tags(elmStr, arr, cb, num) {
    const children = arr
      .filter((v, i) => i < (num || arr.length))
      .map((v, i) => {
      const child = new Dom(elmStr, this)
      cb(v, i, child)
      return child
    })
    this.childrenNodeStack = this.childrenNodeStack.concat(children)
    return this.childrenNodeStack[this.childrenNodeStack.length - 1]
  }

  append(elmStr) {
    const child = this.tag(elmStr)
    this.element.appendChild(child.element)
    return child
  }

  gat() {
    if (this.parentDom) {
      return  this.parentDom
    } else {
      return this.__connect(this)
    }
  }

  out() {
    return this.element
  }


  // private
  __getAttr() {
    this.element.setAttribute(name, value)
  }

  __pushStack(Dom) {
    this.childrenNodeStack.push(Dom)
  }

  __connect(Dom) {
    Dom.childrenNodeStack.forEach(D => {
      D.parentDom.element.appendChild(D.element)
      this.__connect(D)
    })
    return Dom
  }
}
