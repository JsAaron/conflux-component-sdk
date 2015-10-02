/**
 * 翻牌小游戏
 * @type {Object}
 */
;(function() {

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


    var _cache = {};
    var _style = document.documentElement.style;
    function prefixStyle(attr) {
        var vendors = ['webkit', 'Moz', 'ms', 'o'];

        var name;
        if (_cache[attr]) {
            return _cache[attr];
        }

        if (attr in _style) {
            return _cache[attr] = attr;
        }
        //需要加前缀
        vendors.forEach(function(v) {
            if (jQuery.camelCase(v + '-' + attr) in _style) {
                name = '-' + v + '-' + attr;
                return _cache[attr] = name;
            }
        })
        return name;
    }

    var transform = prefixStyle('transform');
    var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';


    function format(format) {
        var args = [].slice.call(arguments, 1, arguments.length);
        return format.replace(/\{(\d+)\}/g, function(m, i) {
            return args[i];
        });
    }


    config.rotateY = config.direction === 'left' ? '180deg' : '-180deg';


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

        //区域尺寸
        this.contentWidth = parseInt($container.css('width'))
        this.contentHeight = parseInt($container.css('Height'))

        //布局
        var level = this.level = {
            row: 3, //横行
            col: 2 //竖列
        }

        //触发翻转动画
        this.trigger = [];
        //临时记录
        this.tempCompare = [];
        //布局的原始排序
        this.originalOrder = calculateOrder(level.row, level.col);
        //新是随机排序
        this.randomOrder = [];

        //收集回调
        this.trackAnims ={
            trigger : [], //手动触发
            auto    : []  //动画恢复
        }

        //创建
        this.initCreate();
        this.creatEvent();
    };


    Manager.prototype = {

        initCreate: function() {
            this.debrisWidth = this.contentWidth / this.level.row;
            this.debrisHeight = this.contentHeight / this.level.col;
            //随机
            this.randomOrder = calculateRandom(this.originalOrder);
            //布局
            this.initLayer();
        },


        initLayer: function() {
            var index;
            var $ul;
            var $li;
            var uls = [];
            var debrisWidth  = this.debrisWidth;
            var debrisHeight = this.debrisHeight;
            var row          = this.level.row;
            var col          = this.level.col;
            var images       = config.images;
            var randomOrder  = this.randomOrder;

            var createStr = function(i, j) {
                var innerdiv = function() {
                    return format(
                        '<ul data-col={0} data-row={1} class="cd-item-wrapper" style="position:relative;">'+
                            '<li data-type="front" class="is-visible"> '+
                                '<img src="{2}" width="{4}" height="{5}">' +
                            '</li>' +
                            '<li data-type="back" class="is-hidden">'+
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
                var str = format(
                    '<li style="' +
                        'width:{2}px;' +
                        'height:{3}px;' +
                        'left:{4}px;' +
                        'position:absolute;' +
                    '">' 
                        + innerdiv() + 
                    '</li>',
                    i, j,
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
                    'height': this.contentHeight / 2,
                    'overflow':'hidden',//1111111
                    'position':'relative' //1111111
                });
                $ul.addClass('cd-gallery cd-container')
                for (var j = 0; j < row; j++) {
                    $li = createStr(i, j);
                    $ul.append($li)
                    this.isArray(this.originalOrder, i, function(arr) {
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
                'col' : parseInt(element.getAttribute('data-col')),
                'row' : parseInt(element.getAttribute('data-row'))
            }
        },

        //找到容器ul
        findContainer: function(event) {
            var elem, elementName;
            if (elem = event.target) {
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

        isArray: function(obj, key, fn) {
            if (!obj[key]) {
                obj[key] = [];
            }
            fn.call(this, obj[key])
        },

        repeatClick: function(element, pos) {
            var elem,elems;
            //当前行
            if (elems = this.trigger[pos.col]) {
                for (var i = 0; i < elems.length; i++) {
                    elem = elems[i];
                    //元素本身与锁定触发后元素
                    if (elem === 'Lock') {
                        return true;
                    }
                }
            }
        },

        runAnim: function(element) {
            $(element).find('.is-hidden').addClass('is-selected')
            $(element).addClass('is-switched')
        },

        onClick: function(event) {
            var element, pos;
            if (element = this.findContainer(event)) {
                pos = this.getPos(element);
                if (this.repeatClick(element,pos)) {
                    return;
                }
                this.runAnim(element);
                this.isArray(this.trigger, pos.col, function(arr) {
                    arr.push(element);
                    arr.push('Lock')
                })
                this.tempCompare.push(element);
            }
        },

        resetReverse: function(element, filter) {
            var related = {
                front: function() {
                    element.removeClass('is-visible is-selected').addClass('is-hidden');
                },
                back: function() {
                    element.addClass('is-visible').removeClass('is-hidden is-selected');
                }
            }
            related[filter]();
        },


        animationend: function(e) {
            var elem, 
                ul,
                pos, 
                elems,
                index,
                filter,
                standardElement;

            if (ul = this.findContainer(e)) {
                //自动动画
                if (ul.getAttribute('data-restore')) {
                    ul.setAttribute('data-restore', false);
                    //收集自动回调
                    this.trackAnims.auto.push(e.target)
                    if (this.trackAnims.auto.length <= 1) {
                        //多动画去从重
                        return;
                    }
                    //复位
                    this.trackAnims.auto.forEach(function(elem) {
                        filter = elem.getAttribute('data-type')

                        var related = {
                            back: function() {
                                $(elem).removeClass('is-visible is-selected').addClass('is-hidden');
                            },
                            front: function() {
                                $(elem).addClass('is-visible').removeClass('is-hidden is-selected');
                            }
                        }
                        related[filter]();

                        // this.resetReverse($(elem), filter)
                    }.bind(this));
                    $(ul).removeClass('is-switched')
                    this.trackAnims.auto = [];
                    return;
                }

                //手动动画
                filter = event.target.getAttribute('data-type')
                this.resetReverse($(event.target), filter)
                $(ul).removeClass('is-switched')
            }


            // console.log($elem)
            //收集回调
            this.trackAnims.trigger.push(e.target)
            if (this.trackAnims.trigger.length <= 1) {
                return;
            }


            var self = this;
            var isLock = 0; //已经锁定数量

            //保证有效
            if(!this.tempCompare.length){
                return
            }

            //当前行
            if (elems = this.trigger) {
                for (var i = 0; i < elems.length; i++) {
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
            if(this.level.col === isLock){
                for (i = 0; i < elems.length; i++) {
                    elem = elems[i];
                    elem.pop(elem.length)
                }
            }
            //得到正确索引
            var getIndex = function(element) {
                var pos = self.getPos(element);
                return self.randomOrder[pos.col][pos.row];
            }

            //动作
            var succeed = true;
            var tempCompare = this.tempCompare;
            if (tempCompare.length == this.level.col) {
                //取出第一个对比值
                standardElement = this.tempCompare[0];
                index = getIndex(standardElement)
                for (i = 1; i < this.tempCompare.length; i++) {
                    elem = this.tempCompare[i];
                    if (index != getIndex(elem)) {
                        succeed = false;
                        break;
                    }
                }
                if (succeed) { //成功
                    tempCompare.forEach(function(elem){
                        $(elem).css({
                            'transition-delay'    : '100ms',
                            'transition-duration' : '2000ms',
                            opacity: 0
                        })
                    })
                    this.tempCompare = [];
                } else { //失败
                    setTimeout(function() {
                        tempCompare.forEach(function(elem, index) {

                            // if (index > 0) return

                            $(elem).find('.is-hidden').addClass('is-selected')
                            $(elem).addClass('is-switched')
                            $(elem).attr('data-restore', true)

                            this.tempCompare = [];
                        }.bind(this))
                    }.bind(this), 500)
                }
            }
        },

        creatEvent: function() {
            var self = this;
            this.$container.on('mousedown touchstart', function(event) {
                event.preventDefault();
                self.onClick(event)
            }).on(animationend, function(event) {
                event.preventDefault();
                self.animationend(event);
            });
        }
    }


    window['CardGames'] = Manager;

})();
