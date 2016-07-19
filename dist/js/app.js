/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ function(module, exports) {

	'use strict';
	
	// util --------------------------------------------------
	var sum = function sum(a, b) {
	  return a + b;
	};
	
	// data --------------------------------------------------
	// persistent data
	var sushi = [{ price: 100, name: 'まぐろ' }, { price: 150, name: 'かんぱち' }, { price: 100, name: 'サーモン' }, { price: 80, name: 'たまご' }, { price: 200, name: 'つぶがい' }, { price: 400, name: 'うに' }, { price: 300, name: 'いくら' }, { price: 300, name: 'えび' }];
	
	// application store --------------------------------------------------
	// store method
	var setStoreState = function setStoreState(newOptionalState) {
	  var newState = Object.assign({}, __state);
	  __state = Object.keys(newOptionalState).reduce(function (a, c) {
	    return a[c] = newOptionalState[c], a;
	  }, newState);
	  _subscribePool.forEach(function (v) {
	    return v(__state);
	  });
	};
	
	var getStoreState = function getStoreState(key) {
	  return key ? __state[key] : __state;
	};
	
	var subscribeStore = function subscribeStore(cbfn) {
	  _subscribePool.push(cbfn);
	};
	
	var _subscribePool = [];
	
	var store = {
	  setState: setStoreState,
	  getState: getStoreState,
	  subscribe: subscribeStore
	};
	
	// initialize application state(immutable)
	var __state = {
	  current: null,
	  sushi: sushi
	};
	
	// method
	var filteringByMorePrice = function filteringByMorePrice(price) {
	  return sushi.filter(function (sushi) {
	    return sushi.price >= price;
	  });
	};
	
	// view --------------------------------------------------
	// template
	var sushiList_template = function sushiList_template(data) {
	  return '<li class="list-group-item">' + data.name + ': ' + data.price + '円</li>';
	};
	var ul_template = function ul_template(html) {
	  return '<ul>' + html + '</ul>';
	};
	
	// text
	var heading_text = function heading_text(html) {
	  return html + '円以上の寿司！';
	};
	
	// search dom target
	var app = document.getElementById('app');
	var filterSelector = document.getElementById('filterSelector');
	
	// create dom element statically
	var headerNode = document.createElement('header');
	headerNode.classList.add('page-header');
	var headerL1Node = document.createElement('h1');
	var contentsRootNode = document.createElement('div');
	var sushiListRootNode = document.createElement('ul');
	
	// dom append
	headerNode.appendChild(headerL1Node);
	app.appendChild(headerNode);
	contentsRootNode.appendChild(sushiListRootNode);
	app.appendChild(contentsRootNode);
	
	// render
	var render = function render(current, sushi) {
	  var headingText = heading_text(current);
	  var sushiListHTML = sushi.map(sushiList_template).reduce(sum);
	
	  headerL1Node.textContent = headingText;
	  contentsRootNode.innerHTML = sushiListHTML;
	};
	
	// connect view
	store.subscribe(function (_ref) {
	  var current = _ref.current;
	  var sushi = _ref.sushi;
	
	  render(current, sushi);
	});
	
	// init
	var initialValue = filterSelector.selectedOptions[0].value;
	var initialState = {
	  current: initialValue,
	  sushi: filteringByMorePrice(initialValue)
	};
	
	store.setState(initialState);
	
	// change event and set application state.
	filterSelector.addEventListener('change', function (e) {
	  console.log(e);
	  var current = e.target.selectedOptions[0].value;
	  var sushi = filteringByMorePrice(current);
	  store.setState({ current: current, sushi: sushi });
	});

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map