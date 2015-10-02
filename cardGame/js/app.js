/**
 * 翻牌小游戏
 * @type {Object}
 */
;
(function() {

    'use strict';

    //配置文件
    var config = {

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

    var utils = (function () {
        var me = {};

        var _elementStyle = document.createElement('div').style;
        var _vendor = (function () {
            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                transform,
                i = 0,
                l = vendors.length;

            for ( ; i < l; i++ ) {
                transform = vendors[i] + 'ransform';
                if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
            }

            return false;
        })();

        function _prefixStyle (style) {
            if ( _vendor === false ) return false;
            if ( _vendor === '' ) return style;
            return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
        }

        me.getTime = Date.now || function getTime () { return new Date().getTime(); };

        me.extend = function(dest, src, merge) {
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

        me.merge = function(dest, src) {
            return me.extend(dest, src, true);
        }

        me.addEvent = function (el, type, fn, capture) {
            el.addEventListener(type, fn, !!capture);
        };

        me.removeEvent = function (el, type, fn, capture) {
            el.removeEventListener(type, fn, !!capture);
        };

        var _transform = _prefixStyle('transform');

        me.extend(me, {
            hasTransform: _transform !== false,
            hasPerspective: _prefixStyle('perspective') in _elementStyle,
            hasTouch: 'ontouchstart' in window,
            hasPointer: navigator.msPointerEnabled,
            hasTransition: _prefixStyle('transition') in _elementStyle
        });
        me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));
      
        me.extend(me.style = {}, {
            transform: _transform,
            transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
            transitionDuration: _prefixStyle('transitionDuration'),
            transitionDelay: _prefixStyle('transitionDelay'),
            transformOrigin: _prefixStyle('transformOrigin')
        });
       
        me.hasClass = function (e, c) {
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
            return re.test(e.className);
        };
      
        me.addClass = function (e, c) {
            if ( me.hasClass(e, c) ) {
                return;
            }
            var newclass = e.className.split(' ');
            newclass.push(c);
            e.className = newclass.join(' ');
        };

        me.removeClass = function (e, c) {
            if ( !me.hasClass(e, c) ) {
                return;
            }
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
            e.className = e.className.replace(re, ' ');
        };

        me.format = function(content) {
            var args = [].slice.call(arguments, 1, arguments.length);
            return content.replace(/\{(\d+)\}/g, function(m, i) {
                return args[i];
            });
        }
        return me;
    })();


    var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';


    var styleElement = null;
    function css3KeyAnimate() { 
        //插入
        function insertCSSRule(rule) {
            var number, sheet, cssRules;
            if (styleElement) {
                number = 0
                try {
                    sheet = styleElement.sheet;
                    cssRules = sheet.cssRules;
                    number = cssRules.length;
                    sheet.insertRule(rule, number);
                } catch (e) {
                    console.log(e.message + rule);
                }
            } else {
                styleElement = document.createElement("style");
                styleElement.type = 'text/css';
                styleElement.innerHTML = rule;
                document.head.appendChild(styleElement);
            }
        }

        //删除
        function deleteCSSRule(ruleName) {
            if (styleElement) {
                var sheet = styleElement.sheet,
                    cssRules = sheet.cssRules,
                    rule;
                for (var i = 0, n = cssRules.length; i < n; i++) {
                    rule = cssRules[i];
                    if (rule.name === ruleName) {
                        sheet.deleteRule(i);
                        break;
                    }
                }
                if (cssRules.length == 0) {
                    DOC.head.removeChild(styleElement);
                    styleElement = null;
                }
            }
        }

        //设置动画样式
        function setAnimition($element, rule) {
            if (animation) {
                $element.css(animation, rule);
            }
        }

        //添加到样式规则中
        function setKeyframes(rule) {
            if (keyframes) {
                insertCSSRule(keyframes + rule);
            }
        }

        //格式化样式表达式
        function setStep(aniName, time, count, loop) {
            rule = '{0} {1}s steps({2}, end) {3}';
            return String.format(rule, aniName, time, count, loop);
        }

        //设置精灵动画位置
        function setPostion(aniName, x) {
            rule = '{0} {from { background-position:0 0; } to { background-position: -{1}px 0px}}';
            return String.format(rule, aniName, Math.round(x));
        }

        var compileRule = function(ruleObj) {
            var str = "";
            var left = " {"
            var semicolon = ":"
            var right = ";}"
            var createStr = function(className, styleObj) {
                var styles = [];
                for (var key in styleObj) {
                    styles.push(key + semicolon + styleObj[key])
                }
                return className + left + styles.join(";") + right;;
            }
            for (var key in ruleObj) {
                str += createStr(key, ruleObj[key])
            }
            return str;
        }


        var styleRule = {
            '.cd-gallery .cd-item-wrapper > li': {
                '-webkit-backface-visibility': 'hidden',
                'backface-visibility': 'hidden',
                'border-radius': '0.25em',
                'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.1)'
            },
            '.cd-gallery li.is-selected': {
                'z-index': '3 !important'
            },
            '.cd-gallery li.is-visible': {
                'position': 'relative',
                'z-index': 5
            },
            '.cd-gallery .cd-item-wrapper > li img':{
                'display'       :'block',
                'width'         :'100%',
                'border-radius' :'0.25em'
            },
            '.cd-gallery li.is-hidden':{
                'position'          : 'absolute',
                'top'               : 0,
                'left'              : 0,
                'height'            : '100%',
                'width'             : '100%',
                'z-index'           : '1',
                '-webkit-transform' : 'rotateY(180deg)',
                '-moz-transform'    : 'rotateY(180deg)',
                '-ms-transform'     : 'rotateY(180deg)',
                '-o-transform'      : 'rotateY(180deg)',
                'transform'         : 'rotateY(180deg)'
            },
            '.cd-item-wrapper.is-switched .is-visible':{
                '-webkit-transform' : 'rotateY(180deg)',
                '-moz-transform'    : 'rotateY(180deg)',
                '-ms-transform'     : 'rotateY(180deg)',
                '-o-transform'      : 'rotateY(180deg)',
                'transform'         : 'rotateY(180deg)',
                '-webkit-animation' : 'cd-rotate 0.5s',
                '-moz-animation'    : 'cd-rotate 0.5s',
                'animation'         : 'cd-rotate 0.5s'
            },
            '.cd-item-wrapper.is-switched .is-hidden':{
                '-webkit-transform' : 'rotateY(0)',
                '-moz-transform'    : 'rotateY(0)',
                '-ms-transform'     : 'rotateY(0)',
                '-o-transform'      : 'rotateY(0)',
                'transform'         : 'rotateY(0)',
                '-webkit-animation' : 'cd-rotate-inverse 0.5s',
                '-moz-animation'    : 'cd-rotate-inverse 0.5s',
                'animation'         : 'cd-rotate-inverse 0.5s',
                'opacity'           : 0
            },
            '.cd-item-wrapper.is-switched .is-selected':{
                'opacity': 1
            }
        }

        var baseStyle = utils.format( compileRule(styleRule))


        /**
         *  css3关键帧算法
         */
        function calculationKeyframes(col, row, count) {
            //矩阵生成step的处理
            //  0 1 2
            //  3 4 5
            //  6 7 8
            var keyframes = [];
            var base = 100 / count;
            //首次
            keyframes.push(0 + '% { background-position:0% 0%}')
            for (var i = 0; i < count; i++) {
                //当前行数
                var currRow = Math.ceil((i + 1) / col); //当前行数
                var currCol = Math.floor(i / col); //当前列数  
                var period = currCol * col; //每段数量  
                var x = 100 * (i - period)
                var y = 100 * currCol;
                x = x == 0 ? x : "-" + x;
                y = y == 0 ? y : "-" + y;
                keyframes.push(((i + 1) * base) + '% { background-position: ' + x + '% ' + y + '%}')
            }
            return keyframes.join("")
        }


        insertCSSRule(baseStyle)

        // setAnimition($element, rule1);
        // setKeyframes(rule2);
        // $element.on(ANIMATION_EV, callback);
    }

    css3KeyAnimate();


    //原始布局
    function calculateOrder(row, col) {
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
    function calculateRandom(originalOrder) {
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
                    return calculateRandom(originalOrder);
                }
            }
            beforeOrder = order;
        }

        return randomOrder;
    }

    var Manager = function(element, options) {
        //页面容器
        var $container = this.$container = $(element);
        this.options = utils.merge(options, config);
        //区域尺寸
        this.contentWidth = parseInt($container.css('width'))
        this.contentHeight = parseInt($container.css('Height'))

        //触发翻转动画
        this.trigger = [];
        //布局的原始排序
        this.originalOrder = calculateOrder(options.level.row, options.level.col);
        //新是随机排序
        this.randomOrder   = calculateRandom(this.originalOrder);
        //一个元素动画2次回调处理
        this.triggerCache = [];
         //收集回调
        this.trackAnims = {
            elems       : [], //触发的元素
            triggerTime : [], //手动触发
            autoTime    : [] //动画恢复
        }
        //创建
        this.initCreate();
        this.creatEvent();
    };


    Manager.prototype = {

        initCreate: function() {
            var level = this.options.level;
            this.debrisWidth  = this.contentWidth / level.row;
            this.debrisHeight = this.contentHeight / level.col;
            this.initLayer();
        },


        initLayer: function() {
            var index;
            var $ul;
            var $li;
            var uls           = [];
            var debrisWidth   = this.debrisWidth;
            var debrisHeight  = this.debrisHeight;
            var level         = this.options.level
            var row           = level.row;
            var col           = level.col;
            var images        = this.options.images;
            var randomOrder   = this.randomOrder;
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
                    'width'    : this.contentWidth,
                    'height'   : debrisHeight,
                    'overflow' : 'hidden', //1111111
                    'position' : 'relative' //1111111
                });
                //增加样式
                $ul.addClass('cd-gallery cd-container')
                for (var j = 0; j < row; j++) {
                    $li = createStr(i, j);
                    $ul.append($li)
                    this.pushArray(this.originalOrder, i, function(arr) {
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
        },

        getPos: function(element) {
            return {
                'col': parseInt(element.getAttribute('data-col')),
                'row': parseInt(element.getAttribute('data-row'))
            }
        },

        //找到容器ul
        findContainer: function(event, appoint) {
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
        },

        pushArray: function(obj, key, fn) {
            if (!obj[key]) {
                obj[key] = [];
            }
            fn.call(this, obj[key])
        },

        runAnim: function(element, status) {
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
        },

        checkRepeat: function(element, pos) {
            var elem, elems;
            if (elems = this.trigger[pos.col]) {
                if ('Lock' == elems[elems.length - 1]) {
                    return true;
                }
            }
        },

        triggerClick: function(event) {
            var element, pos;
            if (element = this.findContainer(event, 'img')) {
                pos = this.getPos(element);
                if (this.checkRepeat(element, pos)) {
                    return;
                }
                this.pushArray(this.trigger, pos.col, function(arr) {
                    arr.push(element, 'Lock');
                })
                this.runAnim(element);
                this.trackAnims.elems.push(element);
            }
        },

        resetProperties: function(context, filter, callback) {
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
        },


        //检测回调的唯一性
        checkUnique: function(event) {
            var ul = this.findContainer(event);
            var index = this.triggerCache.indexOf(ul);
            if (~index) {
                this.triggerCache.splice(index, 1)
                return false;
            }
            this.triggerCache.push(ul);
            return true;
        },

        animCallback: function(event) {
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
            parent = this.findContainer(event)
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

        },

        creatEvent: function() {
            this.$container.on('mousedown touchstart', function(event) {
                event.preventDefault();
                this.triggerClick(event)
            }.bind(this)).on(animationend, function(event) {
                event.preventDefault();
                this.animCallback(event);
            }.bind(this));
        }
    }


    window['CardGames'] = Manager;

})();
