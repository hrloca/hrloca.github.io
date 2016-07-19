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
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ function(module, exports) {

	'use strict';
	
	// util --------------------------------------------------
	var sum = function sum(a, b) {
	  return a + b;
	};
	var assign = Object.assign;
	var im = function im(obj) {
	  return assign({}, obj);
	};
	var keys = Object.keys;
	
	// application store --------------------------------------------------
	// store method
	var createStore = function createStore() {
	  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var __state = initialState;
	  var _subscribePool = [];
	  var setState = function setState(newOptionalState) {
	    var newState = keys(newOptionalState).reduce(function (a, c) {
	      return a[c] = newOptionalState[c], a;
	    }, im(__state));
	    _subscribePool.forEach(function (v) {
	      return v(im(newState), im(__state));
	    });
	    __state = newState;
	  };
	  var getState = function getState() {
	    return im(__state);
	  };
	  var subscribe = function subscribe(cbfn) {
	    return _subscribePool.push(cbfn);
	  };
	  return { setState: setState, getState: getState, subscribe: subscribe };
	};
	
	// data --------------------------------------------------
	// persistent data
	var data = ['0cf7800a-4fbf-4a8e-b6a3-57a255c2ecea_11.jpg', '1c6d8aa0-0812-4e9b-8a16-3e212ed82e06_6.jpg', '001d4b1b-2dc0-440d-a20d-18703154cb7c_5.jpg', '2e35262e-a9ff-43a9-ba6a-888b5c2f6a60_5.jpg', '3fbc4fe0-9b0a-4189-ad34-bf6cd6d964ba_7.jpg', '4b1cc1b5-c7e5-4c03-a827-a3dec00113cc_5.jpg', '5c2b855a-f386-473c-8f17-59ef272ea16a_5.jpg', '6e374437-475a-49ed-b9fe-77a43af2eb12_5.jpg', '9c3b2185-6965-4466-868e-deb5062102c5_6.jpg', '9c8a51c4-fcd6-46a2-9df1-a7ed51752c7e_7.jpg', '410e18cc-5b28-43ad-91ed-cfa658416632_5.jpg', '59679dbe-aea8-4a71-97b2-d6204b1fe649_6.jpg', '20131220_20.jpg'];
	
	// init --------------------------------------------------
	var imgpath = '/dist/img/wallpaper/';
	var pathData = data.map(function (x) {
	  return imgpath + x;
	});
	
	var initialState = {
	  index: 0,
	  len: pathData.length,
	  pathData: pathData
	};
	
	var store = createStore(initialState);
	
	var next = function next() {
	  var _store$getState = store.getState();
	
	  var index = _store$getState.index;
	  var len = _store$getState.len;
	
	  var nextIndex = len <= index + 1 ? index : index + 1;
	  store.setState({ index: nextIndex });
	};
	
	var prev = function prev() {
	  var _store$getState2 = store.getState();
	
	  var index = _store$getState2.index;
	  var len = _store$getState2.len;
	
	  var nextIndex = index <= 0 ? index : index - 1;
	  store.setState({ index: nextIndex });
	};
	
	var roop = function roop() {
	  var _store$getState3 = store.getState();
	
	  var index = _store$getState3.index;
	  var len = _store$getState3.len;
	
	  var nextIndex = len <= index + 1 ? 0 : index + 1;
	  store.setState({ index: nextIndex });
	};
	
	// view --------------------------------------------------
	
	var _store$getState4 = store.getState();
	
	var paths = _store$getState4.pathData;
	
	// search dom
	
	var $app = document.querySelector('#slider');
	var $next = document.querySelector('#next');
	var $prev = document.querySelector('#prev');
	var $indexDotModule = document.querySelector('.indexDotModule');
	
	// create dom
	var display = document.createElement('div');
	display.classList.add('display');
	var imageView = document.createElement('ul');
	imageView.classList.add('imageView');
	var imageViewListFrag = document.createDocumentFragment();
	var lists = paths.map(function (path) {
	  var li = document.createElement('li');
	  var img = document.createElement('img');
	  img.setAttribute('src', path);
	  img.setAttribute('width', '100%');
	  li.appendChild(img);
	  return li;
	});
	lists.forEach(function (x) {
	  return imageViewListFrag.appendChild(x);
	});
	
	var indexDot = document.createElement('ul');
	indexDot.classList.add('dotModule');
	var dotsFrag = document.createDocumentFragment();
	var dots = paths.map(function (path, i) {
	  var li = document.createElement('li');
	  li.setAttribute('data-index', i);
	  li.addEventListener('click', function (e) {
	    var index = parseInt(e.target.getAttribute('data-index'), 10);
	    store.setState({ index: index });
	  });
	  return li;
	});
	dots.forEach(function (x) {
	  return dotsFrag.appendChild(x);
	});
	
	// append and build dom tree
	indexDot.appendChild(dotsFrag);
	imageView.appendChild(imageViewListFrag);
	display.appendChild(imageView);
	
	$app.appendChild(display);
	$app.appendChild(indexDot);
	
	// get display width from element
	
	var _display$getBoundingC = display.getBoundingClientRect();
	
	var displayWidth = _display$getBoundingC.width;
	
	store.setState({ displayWidth: displayWidth });
	
	imageView.style.transform = 'translateX(0)';
	
	// add event
	$next.addEventListener('click', function () {
	  return next();
	});
	$prev.addEventListener('click', function () {
	  return prev();
	});
	
	var slideImageView = function slideImageView(index, displayWidth) {
	  imageView.style.transform = 'translateX(' + -index * displayWidth + 'px)';
	};
	
	var render = function render(index, displayWidth, prevIndex) {
	  dots[prevIndex].classList.remove('dot--active');
	  dots[index].classList.add('dot--active');
	  slideImageView(index, displayWidth);
	};
	
	store.subscribe(function (state, prev) {
	  render(state.index, state.displayWidth, prev.index);
	});
	
	var timer = setInterval(function () {
	  roop();
	}, 3000);

/***/ }
/******/ ]);
//# sourceMappingURL=slider.js.map