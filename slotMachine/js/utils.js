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

    me.extend = function(target, obj) {
        for (var i in obj) {
            target[i] = obj[i];
        }
    };

    var _transform = _prefixStyle('transform');

    var SUPPORT_TOUCH = ('ontouchstart' in window);

    me.extend(me, {
        RESIZE_EV: 'onorientationchange' in window ? 'orientationchange' : 'resize',
        START_EV: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
        MOVE_EV: SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
        END_EV: SUPPORT_TOUCH ? 'touchend' : 'mouseup',
        CANCEL_EV: SUPPORT_TOUCH ? 'touchcancel' : 'mouseup',
        hasTransform: _transform !== false,
        hasPerspective: _prefixStyle('perspective') in _elementStyle,
        hasTouch: SUPPORT_TOUCH,
        hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
        hasTransition: _prefixStyle('transition') in _elementStyle
    });

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
        animationEnd: ANIMATION_END,
        transitionEnd: TRANSITION_END,
        transform: _transform,
        transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
        transitionDuration: _prefixStyle('transitionDuration'),
        transitionDelay: _prefixStyle('transitionDelay'),
        transformOrigin: _prefixStyle('transformOrigin')
    });

    /**
     * 定义defineProperties
     * [description]
     * @param  {[type]} ) {               
     */
    var _createClass = (function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    me.createClass = _createClass;

    return me;
})();
