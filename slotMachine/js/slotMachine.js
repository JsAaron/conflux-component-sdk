/**
 * 基于jQuery编写的老虎机
 */


'use strict';

/**
 * requestAnimationFrame
 * @type {[type]}
 */
var rAF = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };

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
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();


/**
 * 老虎机游戏类
 * @return {[type]} [description]
 */
var SlotMachine = function() {
    /**
     * 默认参数
     * @type {Object}
     */
    var defaults = {
            active: 0, //选中的元素
            delay: 200, // 动画延时
            randomize: null, //随机函数
            complete: null, // 完成的回调
            direction: 'up' // 运动方向
        },
        //定义css样式
        FX_FAST = 'slotMachineBlurFast',
        FX_NORMAL = 'slotMachineBlurMedium',
        FX_SLOW = 'slotMachineBlurSlow',
        FX_GRADIENT = 'slotMachineGradient',
        FX_STOP = FX_GRADIENT;


    //增加easeOutBounce效果
    if (typeof $.easing.easeOutBounce !== 'function') {
        $.extend($.easing, {
            easeOutBounce: function easeOutBounce(x, t, b, c, d) {
                if ((t /= d) < 1 / 2.75) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < 2 / 2.75) {
                    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
                } else if (t < 2.5 / 2.75) {
                    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
                } else {
                    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
                }
            }
        });
    }


    /**
     * 创建列表
     * @return {[type]} [description]
     */
    function createli(imgUrl) {
        var str = '';
        imgUrl.forEach(function(url, index) {
            str += '<li style="background-image:url(' + url + ');"></li>';
        })
        return str;
    }

    /**
     * 构造器
     * @param {[type]} element [description]
     */
    function SlotClass(slot, options) {

        //设置参数
        this.settings = $.extend({}, defaults, options);
        this.defaults = defaults;

        //jQuery元素
        this.$slot = $(slot);

        var structure = '<ul>' + createli(options.imgUrl) + '</ul>'
        var $structure = $(structure);

        //溢出包裹元素
        this.$container = $structure;
        //卷滚子元素
        this.$slotRolls = this.$container.children();

        this.$slot.append($structure)

        //活动页面
        this.active = this.settings.active;
        //希望的目标结果
        this.futureActive = null;

        //溢出高度
        this._maxTop = -this.$container.height();

        //增加前后节点
        this._addSlotRolls();

        //最小高度
        //outerHeight包括border与padding
        this._minTop = -this._$slotRollsFirst.outerHeight();

        //计算翻动坐标参数
        this._initDirection();

        //当前可视区元素
        this._marginTop = this.direction.initial;

        //状态
        this.running = false;
        this.stopping = false;

        console.log(this)
    }


    _createClass(SlotClass, [{
            /**
             * 初始化,增加头尾部
             * @type {String}
             */
            key: '_addSlotRolls',
            value: function _initSlot() {
                this._$slotRollsFirst = this.$slotRolls.last().clone();
                this._$slotRollsLast = this.$slotRolls.first().clone();
                this.$container.prepend(this._$slotRollsFirst);
                this.$container.append(this._$slotRollsLast);
            }

        }, {
            /**
             * 计算出运动的取值
             * @type {String}
             */
            key: '_initDirection',
            value: function _initDirection() {
                var slotRollsNum = this.$slotRolls.length;
                console.log(this.active)
                this._direction = {
                    //方向
                    selected: this.settings.direction === 'down' ? 'down' : 'up',
                    //下
                    up: {
                        key: 'up',
                        initial: this.getOffset(this.active),
                        first: 0,
                        last: this.getOffset(slotRollsNum),
                        to: this._maxTop,
                        firstToLast: this.getOffset(slotRollsNum),
                        lastToFirst: 0
                    },
                    //上
                    down: {
                        key: 'down',
                        initial: this.getOffset(this.active),
                        first: this.getOffset(slotRollsNum),
                        last: 0,
                        to: this._minTop,
                        firstToLast: this.getOffset(slotRollsNum),
                        lastToFirst: 0
                    }
                };
            }
        }, {
            /**
             * 运行游戏
             * rotate 圈速
             * active 期望的目标
             * complete 完成回调
             * @type {String}
             */
            key: 'run',
            value: function run(options) {
                options = options || {};

                var rotate = options.rotate,
                    complete = options.complete,
                    active = options.active;

                //旋转衔接延时
                var delay = this.settings.delay;

                //期待的目标元素
                //传递传毒
                //通过随机获取
                if (this.futureActive === null) {
                    this.futureActive = active || this.custom;
                }

                //运行标志
                this.running = true;
                this._fade = true;

                //增加朦胧度
                //修正动画的速率
                if (rotate) {
                    switch (rotate) {
                        case 1:
                        case 2:
                            this._animationFX = FX_SLOW;
                            break;
                        case 3:
                        case 4:
                            this._animationFX = FX_NORMAL;
                            delay /= 1.5;
                            break;
                        default:
                            this._animationFX = FX_FAST;
                            delay /= 2;
                    }
                } else {
                    this._animationFX = FX_FAST;
                    delay /= 2;
                }

                //执行动画
                this.$container.animate({
                    marginTop: this.direction.to
                }, delay, 'linear', function cb() {
                    //重置初始值
                    this._marginTop = this.direction.first;
                    if (rotate - 1 <= 0) {
                        // this.stop();
                    } else {
                        this.run({
                            rotate: rotate - 1,
                            active: active
                        });
                    }
                }.bind(this));

            }
        }, {
            /**
             * 停止游戏
             * @type {String}
             */
            key: 'stop',
            value: function stop() {
                if (!this.running) {
                    return;
                }
                //停止动画队列
                this.$container.clearQueue().stop(true, false);
                //重新设置反弹
                this._animationFX = FX_SLOW;
                this.running = true;
                this.stopping = true;


                this.active = this.visibleTile;



                if (this.futureActive > this.active) {
                    if (this.active === 0 && this.futureActive === this.$slotRolls.length - 1) {
                        this._marginTop = this.direction.firstToLast;
                    }

                } else if (this.active === this.$slotRolls.length - 1 && this.futureActive === 0) {
                    this._marginTop = this.direction.lastToFirst;
                }

                this.active = this.futureActive;
                var delay = this.settings.delay * 3;



                this.$container.animate({
                    marginTop: this.getOffset(this.active)
                }, delay, 'easeOutBounce', (function cb() {

                    this.stopping = false;
                    this.running = false;
                    this.futureActive = null;


                }).bind(this));

            }

        }, {
            key: 'raf',
            value: function raf(cb, timeout) {
                var startTime = new Date().getTime(),
                    _rafHandler = function _rafHandler() {
                        var drawStart = new Date().getTime(),
                            diff = drawStart - startTime;
                        if (diff < timeout) {
                            rAF(_rafHandler);
                        } else if (typeof cb === 'function') {
                            cb();
                        }
                    };
                rAF(_rafHandler);
            }

        }, {
            /**
             * 处理活动页面页码
             * @type {String}
             */
            key: 'active',
            get: function get() {
                return this._active;
            },
            /**
             * 过滤页码可靠性
             * @param {[type]} index [description]
             */
            set: function set(index) {
                this._active = index;
                if (index < 0 || index >= this.$slotRolls.length) {
                    this._active = 0;
                }
            }
        }, {
            key: 'visibleTile',
            get: function get() {
                var firstTileHeight = this.$slotRolls.first().height(),
                    rawContainerMargin = this.$container.css('margin-top'),
                    containerMargin = parseInt(rawContainerMargin.replace(/px/, ''), 10);

                return Math.abs(Math.round(containerMargin / firstTileHeight)) - 1;
            }
        }, {
            /**
             *【指令】
             * 随机算法
             * @type {String}
             */
            key: 'random',
            get: function get() {
                return Math.floor(Math.random() * this.$slotRolls.length);
            }
        }, {
            /**
             * 【指令】
             * 基于自定义随机函数得到随机元素
             * 1 外部
             * 2 内部
             * @type {String}
             */
            key: 'custom',
            get: function get() {
                var choosen = void 0;
                //外部传递
                if (typeof this.settings.randomize === 'function') {
                    var index = this.settings.randomize.call(this, this.active);
                    if (index < 0 || index >= this.$slotRolls.length) {
                        index = 0;
                    }
                    choosen = index;
                } else {
                    //内部随机
                    choosen = this.random;
                }

                return choosen;
            }
        }, {
            /**
             * 【指令】
             * 获取当前的位置坐标
             * @type {String}
             */
            key: 'getOffset',
            value: function getOffset(index) {
                var offset = 0,
                    i = 0;
                for (i; i < index; i++) {
                    offset += this.$slotRolls.eq(i).outerHeight();
                }
                return this._minTop - offset;
            }

        }, {

            /**
             * 【指令】
             * 观察direction对象
             * get 获取
             * set 设置
             * @type {String}
             */
            key: 'direction',
            /**
             * 获取当前可视元素
             * @return {[type]} [description]
             */
            get: function get() {
                return this._direction[this._direction.selected];
            },
            set: function set(direction) {
                alert('direction')
            }
        }, {
            key: '_fxClass',
            set: function set(FX_SPEED) {
                var classes = [FX_FAST, FX_NORMAL, FX_SLOW].join(' ');

                this.$slotRolls.removeClass(classes).addClass(FX_SPEED);
            }

            /**
             * @desc PRIVATE - Set CSS classes to make speed effect
             * @param string FX_SPEED - Element speed [FX_FAST_BLUR||FX_NORMAL_BLUR||FX_SLOW_BLUR||FX_STOP]
             * @param string||boolean fade - Set fade gradient effect
             */

        },{
            /**
             * 【指令】
             * 增加模糊度
             * @type {String}
             */
            key: '_animationFX',
            set: function set(FX_SPEED) {
                var delay = this.settings.delay / 4,
                    $elements = this.$container.add(this.$slotRolls);
                this.raf(function cb() {
                    this._fxClass = FX_SPEED;
                    if (this.fade !== true || FX_SPEED === FX_STOP) {
                        $elements.removeClass(FX_GRADIENT);
                    } else {
                        $elements.addClass(FX_GRADIENT);
                    }
                }.bind(this), delay);
            }

        }, {
            /**
             * 【指令】
             * 设置container的margin-top值
             * @type {String}
             */
            key: '_marginTop',
            set: function set(margin) {
                this.$container.css('margin-top', margin);
            }

        }

    ]);



    return SlotClass;

}();
