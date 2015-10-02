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
/******/ 	__webpack_require__.p = "./release/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var utils = __webpack_require__(5);
	
	var Manager = function(element, options) {
	    this._init(element, options);
	};
	
	
	var m = Manager.prototype ;
	
	utils.extend(m,__webpack_require__(6));
	utils.extend(m,__webpack_require__(9));
	utils.extend(m,__webpack_require__(10));
	utils.extend(m,__webpack_require__(11));
	utils.extend(m,__webpack_require__(12));
	
	 
	window['CardGames'] = Manager;
	module.exports = Manager

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./app.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".cd-gallery li.is-visible {\n  position: relative;\n  z-index: 5; }\n\n.cd-item-wrapper > li {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  border-radius: 0.25em;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }\n\n.cd-gallery li.is-hidden {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 1;\n  -webkit-transform: rotateY(180deg);\n  -moz-transform: rotateY(180deg);\n  -ms-transform: rotateY(180deg);\n  -o-transform: rotateY(180deg);\n  transform: rotateY(180deg); }\n\n.cd-gallery .cd-item-wrapper > li {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  border-radius: 0.25em;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }\n\n.cd-gallery .cd-item-wrapper > li img {\n  display: block;\n  width: 100%;\n  border-radius: 0.25em; }\n\nimg {\n  max-width: 100%; }\n\n.cd-item-wrapper.is-switched .is-visible {\n  -webkit-transform: rotateY(180deg);\n  -moz-transform: rotateY(180deg);\n  -ms-transform: rotateY(180deg);\n  -o-transform: rotateY(180deg);\n  transform: rotateY(180deg);\n  -webkit-animation: cd-rotate 0.5s;\n  -moz-animation: cd-rotate 0.5s;\n  animation: cd-rotate 0.5s; }\n\n.cd-item-wrapper.is-switched .is-hidden {\n  -webkit-transform: rotateY(0);\n  -moz-transform: rotateY(0);\n  -ms-transform: rotateY(0);\n  -o-transform: rotateY(0);\n  transform: rotateY(0);\n  -webkit-animation: cd-rotate-inverse 0.5s;\n  -moz-animation: cd-rotate-inverse 0.5s;\n  animation: cd-rotate-inverse 0.5s;\n  opacity: 0; }\n\n.cd-gallery .cd-item-wrapper.is-switched .is-selected {\n  opacity: 1; }\n\nhtml * {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/* -------------------------------- \r\n\r\nxkeyframes \r\n\r\n-------------------------------- */\n@-webkit-keyframes cd-rotate {\n  0% {\n    -webkit-transform: perspective(800px) rotateY(0); }\n  70% {\n    -webkit-transform: perspective(800px) rotateY(200deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -webkit-transform: perspective(800px) rotateY(180deg); } }\n\n@-moz-keyframes cd-rotate {\n  0% {\n    -moz-transform: perspective(800px) rotateY(0); }\n  70% {\n    -moz-transform: perspective(800px) rotateY(200deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -moz-transform: perspective(800px) rotateY(180deg); } }\n\n@keyframes cd-rotate {\n  0% {\n    -webkit-transform: perspective(800px) rotateY(0);\n    -moz-transform: perspective(800px) rotateY(0);\n    -ms-transform: perspective(800px) rotateY(0);\n    -o-transform: perspective(800px) rotateY(0);\n    transform: perspective(800px) rotateY(0); }\n  70% {\n    -webkit-transform: perspective(800px) rotateY(200deg);\n    -moz-transform: perspective(800px) rotateY(200deg);\n    -ms-transform: perspective(800px) rotateY(200deg);\n    -o-transform: perspective(800px) rotateY(200deg);\n    transform: perspective(800px) rotateY(200deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -webkit-transform: perspective(800px) rotateY(180deg);\n    -moz-transform: perspective(800px) rotateY(180deg);\n    -ms-transform: perspective(800px) rotateY(180deg);\n    -o-transform: perspective(800px) rotateY(180deg);\n    transform: perspective(800px) rotateY(180deg); } }\n\n@-webkit-keyframes cd-rotate-inverse {\n  0% {\n    -webkit-transform: perspective(800px) rotateY(-180deg); }\n  70% {\n    -webkit-transform: perspective(800px) rotateY(20deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -webkit-transform: perspective(800px) rotateY(0); } }\n\n@-moz-keyframes cd-rotate-inverse {\n  0% {\n    -moz-transform: perspective(800px) rotateY(-180deg); }\n  70% {\n    -moz-transform: perspective(800px) rotateY(20deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -moz-transform: perspective(800px) rotateY(0); } }\n\n@keyframes cd-rotate-inverse {\n  0% {\n    -webkit-transform: perspective(800px) rotateY(-180deg);\n    -moz-transform: perspective(800px) rotateY(-180deg);\n    -ms-transform: perspective(800px) rotateY(-180deg);\n    -o-transform: perspective(800px) rotateY(-180deg);\n    transform: perspective(800px) rotateY(-180deg); }\n  70% {\n    -webkit-transform: perspective(800px) rotateY(20deg);\n    -moz-transform: perspective(800px) rotateY(20deg);\n    -ms-transform: perspective(800px) rotateY(20deg);\n    -o-transform: perspective(800px) rotateY(20deg);\n    transform: perspective(800px) rotateY(20deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -webkit-transform: perspective(800px) rotateY(0);\n    -moz-transform: perspective(800px) rotateY(0);\n    -ms-transform: perspective(800px) rotateY(0);\n    -o-transform: perspective(800px) rotateY(0);\n    transform: perspective(800px) rotateY(0); } }\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var utils = {};
	
	var _elementStyle = document.createElement('div').style;
	var _vendor = (function() {
	    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
	        transform,
	        i = 0,
	        l = vendors.length;
	
	    for (; i < l; i++) {
	        transform = vendors[i] + 'ransform';
	        if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
	    }
	
	    return false;
	})();
	
	function _prefixStyle(style, Joining) {
	    Joining = Joining || ''
	    if (_vendor === false) return false;
	    if (_vendor === '') return style;
	    return _vendor + Joining + style.charAt(0).toUpperCase() + style.substr(1);
	}
	
	utils.getTime = Date.now || function getTime() {
	    return new Date().getTime();
	};
	
	utils.extend = function(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	};
	
	utils.merge = function(dest, src) {
	    return utils.extend(dest, src, true);
	}
	
	utils.addEvent = function(el, type, fn, capture) {
	    el.addEventListener(type, fn, !!capture);
	};
	
	utils.removeEvent = function(el, type, fn, capture) {
	    el.removeEventListener(type, fn, !!capture);
	};
	
	var _transform = _prefixStyle('transform');
	
	utils.extend(utils, {
	    hasTransform: _transform !== false,
	    hasPerspective: _prefixStyle('perspective') in _elementStyle,
	    hasTouch: 'ontouchstart' in window,
	    hasPointer: navigator.msPointerEnabled,
	    hasTransition: _prefixStyle('transition') in _elementStyle
	});
	utils.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));
	
	utils.extend(utils.style = {}, {
	    transform: _transform,
	    transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
	    transitionDuration: _prefixStyle('transitionDuration'),
	    transitionDelay: _prefixStyle('transitionDelay'),
	    transformOrigin: _prefixStyle('transformOrigin')
	});
	
	utils.hasClass = function(e, c) {
	    var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
	    return re.test(e.className);
	};
	
	utils.addClass = function(e, c) {
	    if (utils.hasClass(e, c)) {
	        return;
	    }
	    var newclass = e.className.split(' ');
	    newclass.push(c);
	    e.className = newclass.join(' ');
	};
	
	utils.removeClass = function(e, c) {
	    if (!utils.hasClass(e, c)) {
	        return;
	    }
	    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
	    e.className = e.className.replace(re, ' ');
	};
	
	utils.format = function(content) {
	    var args = [].slice.call(arguments, 1, arguments.length);
	    return content.replace(/\{(\d+)\}/g, function(m, i) {
	        return args[i];
	    });
	}
	
	
	var TRANSITION_END = 'transitionend';
	var ANIMATION_END = 'animationend';
	var KEYFRAMES = '@keyframes ';
	
	(function() {
	    var vendors = _prefixStyle('animation', '-');
	    var TRANSITION_END_NAMES = {
	        "moz": "transitionend",
	        "webkit": "webkitTransitionEnd",
	        "ms": "MSTransitionEnd",
	        "o": "oTransitionEnd"
	    };
	    var ANIMATION_END_NAMES = {
	        "moz": "animationend",
	        "webkit": "webkitAnimationEnd",
	        "ms": "MSAnimationEnd",
	        "o": "oAnimationEnd"
	    };
	    if (!vendors) return;
	    vendors = vendors.split('-');
	    if (!vendors[1]) return;
	    TRANSITION_END = TRANSITION_END_NAMES[vendors[0]];
	    ANIMATION_END = ANIMATION_END_NAMES[vendors[0]];
	    KEYFRAMES = '@-' + vendors[1] + '-keyframes ';
	})();
	
	utils.extend(utils.style, {
	    keyframes: KEYFRAMES,
	    animationend: ANIMATION_END,
	    transitionend: TRANSITION_END
	})
	    
	
	module.exports = utils;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	var utils  = __webpack_require__(5); 
	var config = __webpack_require__(7);
	var depend = __webpack_require__(8);
	   	  	
	/**
	 * 初始化数据
	 */
	exports._init = function(element,options) {
	    //页面容器
	    var $container = this.$container = $(element);
	    this.options = utils.merge(options, config);
	    //区域尺寸
	    this.contentWidth = parseInt($container.css('width'))
	    this.contentHeight = parseInt($container.css('Height'))
	
	    //触发翻转动画
	    this.trigger = [];
	    //布局的原始排序
		this.originalOrder = depend.nature(options.level.row, options.level.col);
		//新是随机排序
		this.randomOrder   = depend.random(this.originalOrder);
	    //一个元素动画2次回调处理
	    this.triggerCache = [];
	    //收集回调
	    this.trackAnims = {
	        elems: [], //触发的元素
	        triggerTime: [], //手动触发
	        autoTime: [] //动画恢复
	    };
	
	    //开始构建
	    this._initCreate();
	    //构建事件
	    this._initEvent();
	}
	 

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * 默认配置文件
	 * @type {Object}
	 */
	module.exports = {
	
	    level: {
	        col: 2,
	        row: 3
	    },
	
	    //图片
	    images: {
	        //正面图
	        front: "images/1.png",
	        //背景图,随机分配
	        back: ["images/11.png", "images/12.png", "images/13.png"]
	    },
	
	    //翻转的速度单位ms //默认0.6秒
	    speed: 600,
	
	    //反转的反向
	    //顺时针//逆时针 left or rigth
	    direction: 'left'
	
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * 原始布局
	 * @return {[type]} [description]
	 */
	exports.nature = function(row, col) {
	    var order = [];
	    var i;
	    var j;
	    for (i = 0; i < col; i++) {
	        for (j = 0; j < row; j++) {
	            if (!order[i]) {
	                order[i] = [];
	            }
	            order[i].push(j)
	        }
	    }
	    return order;
	}
	
	//随机布局
	exports.random = function(originalOrder) {
	    var randomOrder = [];
	    var beforeOrder;
	    var order;
	    //计算随机
	    var calculate = function(len) {
	        return Math.floor(Math.random() * len);
	    }
	
	    for (var i = 0, len = originalOrder.length; i < len; i++) {
	        randomOrder[i] = [];
	        for (var j = 0, orderLen = originalOrder[i].length; j < orderLen; j++) {
	            //随机数
	            order = calculate(orderLen);
	            //去重,保证唯一
	            if (randomOrder[i].length > 0) {
	                while (jQuery.inArray(order, randomOrder[i]) > -1) {
	                    order = calculate(orderLen)
	                }
	            }
	            randomOrder[i].push(order);
	        }
	    }
	
	    for (i = 0; i < randomOrder.length; i++) {
	        order = randomOrder[i];
	        if (beforeOrder) {
	            //保证不一致
	            if (order.toString() == beforeOrder.toString()) {
	                return this.random(originalOrder);
	            }
	        }
	        beforeOrder = order;
	    }
	
	    return randomOrder;
	}
	
	
	//找到容器ul
	exports.findContainer = function(event, appoint) {
	    var elem, elementName;
	    if (elem = event.target) {
	        //指定元素
	        if (appoint && appoint != elem.nodeName.toLowerCase()) {
	            return;
	        }
	        while ((elem = elem['parentNode']) && elem.nodeType !== 9) {
	            if (elem.nodeType === 1) {
	                elementName = elem.nodeName.toLowerCase();
	                if (elementName == 'ul') {
	                    return elem;
	                }
	            }
	        }
	    }
	}
	
	exports.pushArray = function(obj, key, fn) {
	    if (!obj[key]) {
	        obj[key] = [];
	    }
	    fn(obj[key])
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	var utils = __webpack_require__(5);
	var depend = __webpack_require__(8);
	/**
	 * 动态布局
	 */
	 
	exports._initCreate = function() {
	    var level = this.options.level;
	    this.debrisWidth = this.contentWidth / level.row;
	    this.debrisHeight = this.contentHeight / level.col;
	    this._initLayer();
	}
		
	
	exports._initLayer = function() {
	    var index;
	    var $ul;
	    var $li;
	    var uls = [];
	    var debrisWidth = this.debrisWidth;
	    var debrisHeight = this.debrisHeight;
	    var level = this.options.level
	    var row = level.row;
	    var col = level.col;
	    var images = this.options.images;
	    var randomOrder = this.randomOrder;
	    var contentHeight = this.contentHeight;
	
	    var createStr = function(i, j) {
	        var innerdiv = function() {
	            return utils.format(
	                '<ul data-col={0} data-row={1} class="cd-item-wrapper" style="position:relative;">' +
		               	'<li data-type="front" class="is-visible"> ' +
		                	'<img src="{2}" width="{4}" height="{5}">' +
		                '</li>' +
		                '<li data-type="back" class="is-hidden">' +
		                	'<img src="{3}" width="{4}" height="{5}">' +
		                '</li>' +
	                '</ul>',
	                i, j,
	                images.front,
	                images.back[randomOrder[i][j]],
	                debrisWidth,
	                debrisHeight
	            )
	        }
	        var str = utils.format(
	            '<li style="' +
	            'width:{0}px;' +
	            'height:{1}px;' +
	            'left:{2}px;' +
	            'position:absolute;' +
	            '">' + innerdiv() +
	            '</li>',
	            debrisWidth,
	            debrisHeight,
	            j * debrisWidth
	        )
	        return $(str)
	    }
	
	    //生成 row * col 的矩阵
	    for (var i = 0; i < col; i++) {
	        $ul = $(document.createElement('ul')).css({
	            'width': this.contentWidth,
	            'height': debrisHeight,
	            'overflow': 'hidden', //1111111
	            'position': 'relative' //1111111
	        });
	        //增加样式
	        $ul.addClass('cd-gallery cd-container')
	        for (var j = 0; j < row; j++) {
	            $li = createStr(i, j);
	            $ul.append($li)
	            depend.pushArray(this.originalOrder, i, function(arr) {
	                arr.push(j);
	            })
	        }
	        uls.push($ul)
	    }
	    var $fragment = $(document.createElement('createDocumentFragment'));
	    $.each(uls, function(index, ul) {
	        $fragment.append(ul)
	    })
	    this.$container.append($fragment[0].childNodes);
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * 冒泡事件
	 */
	
	var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
	
	exports._initEvent = function() {
	    this.$container.on('mousedown touchstart', function(event) {
	        event.preventDefault();
	        this.triggerClick(event)
	    }.bind(this)).on(animationend, function(event) {
	        event.preventDefault();
	        this.animCallback(event);
	    }.bind(this));
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	var depend = __webpack_require__(8);
	
	/**
	 * 手动触发
	 */
	exports.getPos = function(element) {
	    return {
	        'col': parseInt(element.getAttribute('data-col')),
	        'row': parseInt(element.getAttribute('data-row'))
	    }
	}
	
	exports.runAnim = function(element, status) {
	    var $element = $(element)
	    $element.find('.is-hidden').addClass('is-selected')
	    $element.addClass('is-switched');
	    if (status) {
	        //给每一个li ->anim  增加状态
	        var $children = $element.children();
	        $children.each(function(i, elem) {
	            elem.setAttribute('data-status', status)
	        })
	    }
	}
	
	exports.checkRepeat = function(element, pos) {
	    var elem, elems;
	    if (elems = this.trigger[pos.col]) {
	        if ('Lock' == elems[elems.length - 1]) {
	            return true;
	        }
	    } 
	}
	
	exports.triggerClick = function(event) {
	    var element, pos;
	    if (element = depend.findContainer(event, 'img')) {
	        pos = this.getPos(element);
	        if (this.checkRepeat(element, pos)) {
	            return;
	        }
	        depend.pushArray(this.trigger, pos.col, function(arr) {
	            arr.push(element, 'Lock');
	        })
	        this.runAnim(element);
	        this.trackAnims.elems.push(element);
	    }
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 动画回调处理
	 */
	
	var depend = __webpack_require__(8);
	
	
	exports.resetProperties = function(context, filter, callback) {
	    var related = {
	        front: function() {
	            context.removeClass('is-visible is-selected').addClass('is-hidden');
	        },
	        back: function() {
	            context.addClass('is-visible').removeClass('is-hidden is-selected');
	        }
	    }
	    related[filter]();
	    callback && callback.call(this)
	}
	
	
	//检测回调的唯一性
	exports.checkUnique = function(event) {
	    var ul = depend.findContainer(event);
	    var index = this.triggerCache.indexOf(ul);
	    if (~index) {
	        this.triggerCache.splice(index, 1)
	        return false;
	    }
	    this.triggerCache.push(ul);
	    return true;
	}
	
	exports.animCallback = function(event) {
	    var ul,
	        $ul,
	        pos,
	        elem,
	        $elem,
	        elems,
	        level,
	        index,
	        filter,
	        parent,
	        $parent;
	
	    level = this.options.level;
	
	    elem = event.target;
	    parent = depend.findContainer(event)
	    $elem = $(elem);
	    $parent = $(parent);
	
	
	    //////////////////////////////////
	    ///
	    ///  自动动画：
	    ///     比较动画后，不一致自动还原
	    ///     
	    ///===============================
	    var status = elem.getAttribute('data-status');
	    if (status === 'autoRestore') {
	        elem.setAttribute('data-status', '');
	        filter = elem.getAttribute('data-type')
	        var related = {
	            back: function() {
	                $elem.removeClass('is-visible is-selected').addClass('is-hidden');
	            },
	            front: function() {
	                $elem.addClass('is-visible').removeClass('is-hidden is-selected');
	            }
	        }
	        related[filter]();
	        $parent.removeClass('is-switched')
	        return;
	    }
	
	
	    //////////////////////////////////
	    ///
	    ///  过滤：
	    ///  1 每个元素动画的2个li回调
	    ///  2 每col都运行了动画
	    ///     
	    ///===============================
	
	
	    //处理动画元素
	    //每个li元素都会执行
	    filter = elem.getAttribute('data-type')
	    this.resetProperties($elem, filter, function() {
	        $parent.removeClass('is-switched')
	    })
	
	    //保证只回调一次
	    if (this.checkUnique(event)) {
	        return false;
	    }
	
	    //收集触发回调
	    //合并所有的触发
	    //每一列col必须都要触发一次
	    this.trackAnims.triggerTime.push(elem)
	    if (this.trackAnims.triggerTime.length !== level.col) {
	        return;
	    }
	    this.trackAnims.triggerTime.length = 0;
	
	
	    //////////////////////////////////
	    ///
	    ///  过滤后：
	    ///   检查lock的数量与col是否一致
	    ///   触发点全部解锁
	    ///     
	    ///===============================
	
	    var i;
	    var self = this;
	    var isLock = 0; //已经锁定数量
	
	    //找到每一个col中的lock
	    //确保数量
	    if (elems = this.trigger) {
	        for (i = 0; i < elems.length; i++) {
	            elem = elems[i];
	            if (typeof elem === 'undefined') {
	                continue;
	            }
	            if (elem[elem.length - 1] === 'Lock') {
	                isLock++
	            }
	        }
	    }
	
	    //全部解锁
	    var unlock = function() {
	        if (level.col == isLock) {
	            elems = self.trigger;
	            for (i = 0; i < elems.length; i++) {
	                elem = elems[i];
	                elem.pop(elem.length)
	            }
	        } else {
	            alert('lock错误')
	        }
	    }
	
	
	    //////////////////////////////////
	    ///
	    ///  运行：
	    ///     
	    ///===============================
	
	
	    //得到正确索引
	    var standardElement;
	    //动作
	    var succeed = true;
	    //获取定位坐标
	    var getIndex = function(element) {
	        var pos = self.getPos(element);
	        return self.randomOrder[pos.col][pos.row];
	    };
	
	    elems = this.trackAnims.elems;
	
	    var clean = function() {
	        unlock();
	        self.trackAnims.elems.length = 0
	    }
	
	    if (elems.length == level.col) {
	        //取出第一个对比值
	        standardElement = elems[0];
	        index = getIndex(standardElement)
	            //开始比对
	        for (i = 1; i < elems.length; i++) {
	            elem = elems[i];
	            if (index != getIndex(elem)) {
	                succeed = false;
	                break;
	            }
	        }
	        if (succeed) {
	            elems.forEach(function(elem) {
	                //完成
	                $(elem).css({
	                    'transition-delay': '100ms',
	                    'transition-duration': '2000ms',
	                    opacity: 0
	                })
	            })
	            clean()
	        } else { //失败
	            setTimeout(function() {
	                elems.forEach(function(elem, index) {
	                    self.runAnim(elem, 'autoRestore')
	                })
	                clean()
	            }, 100);
	        }
	    }
	
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map