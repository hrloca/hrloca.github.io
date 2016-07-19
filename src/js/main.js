// util --------------------------------------------------
const sum = (a, b) => a + b;

// data --------------------------------------------------
// persistent data
const sushi = [
  { price: 100, name: 'まぐろ' },
  { price: 150, name: 'かんぱち' },
  { price: 100, name: 'サーモン' },
  { price: 80, name: 'たまご' },
  { price: 200, name: 'つぶがい' },
  { price: 400, name: 'うに' },
  { price: 300, name: 'いくら' },
  { price: 300, name: 'えび' },
];

// application store --------------------------------------------------
// store method
const setStoreState = (newOptionalState) => {
  const newState = Object.assign({}, __state);
  __state = Object.keys(newOptionalState).reduce((a, c) => (a[c] = newOptionalState[c], a), newState);
  _subscribePool.forEach(v => v(__state));
};

const getStoreState = (key) => key ? __state[key] : __state;

const subscribeStore = (cbfn) => {
  _subscribePool.push(cbfn);
}

const _subscribePool = []

const store = {
  setState: setStoreState,
  getState: getStoreState,
  subscribe : subscribeStore
}

// initialize application state(immutable)
let __state = {
  current: null,
  sushi,
};

// method
const filteringByMorePrice = (price) => sushi.filter((sushi) => sushi.price >= price);


// view --------------------------------------------------
// template
const sushiList_template = data => '<li class="list-group-item">' + data.name + ': '  +  data.price + '円</li>';
const ul_template = html => '<ul>' + html + '</ul>';

// text
const heading_text = html => html + '円以上の寿司！';

// search dom target
const app = document.getElementById('app');
const filterSelector = document.getElementById('filterSelector');

// create dom element statically
const headerNode = document.createElement('header');
headerNode.classList.add('page-header')
const headerL1Node = document.createElement('h1');
const contentsRootNode = document.createElement('div');
const sushiListRootNode = document.createElement('ul');

// dom append
headerNode.appendChild(headerL1Node)
app.appendChild(headerNode)
contentsRootNode.appendChild(sushiListRootNode)
app.appendChild(contentsRootNode)

// render
const render = (current, sushi) => {
  const headingText = heading_text(current);
  const sushiListHTML = sushi.map(sushiList_template).reduce(sum);

  headerL1Node.textContent = headingText;
  contentsRootNode.innerHTML = sushiListHTML;
}

// connect view
store.subscribe(({ current, sushi }) => {
  render(current, sushi);
});

// init
const initialValue = filterSelector.selectedOptions[0].value;
const initialState = {
  current: initialValue,
  sushi:filteringByMorePrice(initialValue),
};

store.setState(initialState);

// change event and set application state.
filterSelector.addEventListener('change', (e) => {
  console.log(e)
  const current = e.target.selectedOptions[0].value;
  const sushi = filteringByMorePrice(current);
  store.setState({ current, sushi });
});
