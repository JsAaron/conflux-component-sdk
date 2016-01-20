   var utils = (function() {
       var me = {};

       var _elementStyle = document.createElement('div').style;
       var TRANSITION_END = 'transitionend',
           ANIMATION_END = 'animationend',
           _cache = {};

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

       function _prefixStyle(style) {
           if (_vendor === false) return false;
           if (_vendor === '') return style;
           return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
       }

       me.getTime = Date.now || function getTime() {
           return new Date().getTime();
       };

       me.extend = function(target, obj) {
           for (var i in obj) {
               target[i] = obj[i];
           }
       };


       var _transform = _prefixStyle('transform');

       me.extend(me, {
           hasTransform: _transform !== false,
           hasPerspective: _prefixStyle('perspective') in _elementStyle,
           hasTouch: 'ontouchstart' in window,
           hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
           hasTransition: _prefixStyle('transition') in _elementStyle
       });

       // This should find all Android browsers lower than build 535.19 (both stock browser and webview)
       me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));



       (function() {
           var vendors, TRANSITION_END_NAMES, ANIMATION_END_NAMES;
           vendors = _prefixStyle('animation'),
               TRANSITION_END_NAMES = {
                   "moz": "transitionend",
                   "webkit": "webkitTransitionEnd",
                   "ms": "MSTransitionEnd",
                   "o": "oTransitionEnd"
               }
           ANIMATION_END_NAMES = {
               "moz": "animationend",
               "webkit": "webkitAnimationEnd",
               "ms": "MSAnimationEnd",
               "o": "oAnimationEnd"
           };

           if (!vendors) return;
           vendors = vendors.split('-');
           if (!vendors[1]) return;

           TRANSITION_END = TRANSITION_END_NAMES[vendors[1]];
           ANIMATION_END = ANIMATION_END_NAMES[vendors[1]];
           KEYFRAMES = '@-' + vendors[1] + '-keyframes ';
       })();


       me.extend(me.style = {}, {
           animationEnd             : ANIMATION_END,
           transitionEnd            : TRANSITION_END,
           transform                : _transform,
           transitionTimingFunction : _prefixStyle('transitionTimingFunction'),
           transitionDuration       : _prefixStyle('transitionDuration'),
           transitionDelay          : _prefixStyle('transitionDelay'),
           transformOrigin          : _prefixStyle('transformOrigin')
       });

       return me;
   })();


   $(function() {
       'use strict';




       var slot1 = new SlotMachine("#slot-roll-a", {
           fade: true, //启动图片滚动模糊感,
           mode:0,
           active: 0, //首页页码
           delay: 800, //一个周期滚动的时间
           imgUrl: [ //图片的地址，生成对应的列表，按照图片顺序排列
               "./images/slotMachine/roll/slot1.png",
               "./images/slotMachine/roll/slot2.png",
               "./images/slotMachine/roll/slot3.png",
               "./images/slotMachine/roll/slot4.png",
               "./images/slotMachine/roll/slot5.png",
               "./images/slotMachine/roll/slot6.png"
           ]
       })


       var slot2 = new SlotMachine("#slot-roll-b", {
           fade: true, //启动图片滚动模糊感,
           active: 0, //首页页码
           delay: 800, //一个周期滚动的时间
           imgUrl: [ //图片的地址，生成对应的列表，按照图片顺序排列
               "./images/slotMachine/roll/slot1.png",
               "./images/slotMachine/roll/slot2.png",
               "./images/slotMachine/roll/slot3.png",
               "./images/slotMachine/roll/slot4.png",
               "./images/slotMachine/roll/slot5.png",
               "./images/slotMachine/roll/slot6.png"
           ]
       })


       var slot3 = new SlotMachine("#slot-roll-c", {
           fade: true, //启动图片滚动模糊感,
           active: 0, //首页页码
           delay: 800, //一个周期滚动的时间
           imgUrl: [ //图片的地址，生成对应的列表，按照图片顺序排列
               "./images/slotMachine/roll/slot1.png",
               "./images/slotMachine/roll/slot2.png",
               "./images/slotMachine/roll/slot3.png",
               "./images/slotMachine/roll/slot4.png",
               "./images/slotMachine/roll/slot5.png",
               "./images/slotMachine/roll/slot6.png"
           ]
       })


       $(".slot-gamepage-lottery").click(function() {
           slot1.run({
               rotate: 6,
               active: 2,
               complete: function() {

               }
           });
       })

   })
