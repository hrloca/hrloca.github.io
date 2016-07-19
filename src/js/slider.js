// util --------------------------------------------------
const sum = (a, b) => a + b;
const assign = Object.assign
const im = (obj) => assign({}, obj)
const keys = Object.keys

// application store --------------------------------------------------
// store method
const createStore = (initialState = {}) => {
  let __state = initialState
  const _subscribePool = []
  const setState = (newOptionalState) => {
    const newState = keys(newOptionalState).reduce((a, c) => (a[c] = newOptionalState[c], a), im(__state))
    _subscribePool.forEach(v => v(im(newState), im(__state)))
    __state = newState
  };
  const getState = () => im(__state)
  const subscribe = (cbfn) => _subscribePool.push(cbfn)
  return  { setState, getState, subscribe }
}


// data --------------------------------------------------
// persistent data
const data = [
  '0cf7800a-4fbf-4a8e-b6a3-57a255c2ecea_11.jpg',
  '1c6d8aa0-0812-4e9b-8a16-3e212ed82e06_6.jpg',
  '001d4b1b-2dc0-440d-a20d-18703154cb7c_5.jpg',
  '2e35262e-a9ff-43a9-ba6a-888b5c2f6a60_5.jpg',
  '3fbc4fe0-9b0a-4189-ad34-bf6cd6d964ba_7.jpg',
  '4b1cc1b5-c7e5-4c03-a827-a3dec00113cc_5.jpg',
  '5c2b855a-f386-473c-8f17-59ef272ea16a_5.jpg',
  '6e374437-475a-49ed-b9fe-77a43af2eb12_5.jpg',
  '9c3b2185-6965-4466-868e-deb5062102c5_6.jpg',
  '9c8a51c4-fcd6-46a2-9df1-a7ed51752c7e_7.jpg',
  '410e18cc-5b28-43ad-91ed-cfa658416632_5.jpg',
  '59679dbe-aea8-4a71-97b2-d6204b1fe649_6.jpg',
  '20131220_20.jpg',
];


// init --------------------------------------------------
const imgpath = '/dist/img/wallpaper/'
const pathData = data.map(x => imgpath + x)

const initialState = {
  index: 0,
  len: pathData.length,
  pathData
}

const store = createStore(initialState)

const next = () => {
  const { index, len } = store.getState()
  const nextIndex = len <= index + 1 ? index : index + 1
  store.setState({ index: nextIndex })
}

const prev = () => {
  const { index, len } = store.getState()
  const nextIndex = index <= 0 ? index : index - 1
  store.setState({ index: nextIndex })
}

const roop = () => {
  const { index, len } = store.getState()
  const nextIndex = len <= index + 1 ? 0 : index + 1
  store.setState({ index: nextIndex })
}


// view --------------------------------------------------

const { pathData: paths } = store.getState()

// search dom
const $app = document.querySelector('#slider')
const $next = document.querySelector('#next')
const $prev = document.querySelector('#prev')
const $indexDotModule = document.querySelector('.indexDotModule')

// create dom
const display = document.createElement('div')
display.classList.add('display')
const imageView = document.createElement('ul')
imageView.classList.add('imageView')
const imageViewListFrag = document.createDocumentFragment()
const lists = paths.map(path => {
  const li = document.createElement('li')
  const img = document.createElement('img')
  img.setAttribute('src', path)
  img.setAttribute('width', '100%')
  li.appendChild(img)
  return li
})
lists.forEach(x => imageViewListFrag.appendChild(x))

const indexDot = document.createElement('ul')
indexDot.classList.add('dotModule')
const dotsFrag = document.createDocumentFragment()
const dots = paths.map((path, i) => {
  const li = document.createElement('li')
  li.setAttribute('data-index', i)
  li.addEventListener('click', (e) => {
   const index = parseInt(e.target.getAttribute('data-index') ,10)
   store.setState({ index })
  })
  return li
})
dots.forEach(x => dotsFrag.appendChild(x))


// append and build dom tree
indexDot.appendChild(dotsFrag)
imageView.appendChild(imageViewListFrag)
display.appendChild(imageView)

$app.appendChild(display)
$app.appendChild(indexDot)

// get display width from element
const { width: displayWidth } = display.getBoundingClientRect()
store.setState({ displayWidth })

imageView.style.transform = 'translateX(0)'

// add event
$next.addEventListener('click', () => next())
$prev.addEventListener('click', () => prev())

const slideImageView = (index, displayWidth) => {
  imageView.style.transform = 'translateX(' + (-index * displayWidth) + 'px)'
}

const render = (index, displayWidth, prevIndex) => {
  dots[prevIndex].classList.remove('dot--active')
  dots[index].classList.add('dot--active')
  slideImageView(index, displayWidth)
}

store.subscribe((state, prev) => {
  render(state.index, state.displayWidth, prev.index)
})

const timer = setInterval(() => {
  roop()
}, 3000)
