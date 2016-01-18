'use strict';

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
        spins: 5, // 旋转次数
        complete: null, // 完成的回调
        direction: 'up' // 运动方向
    }


    /**
     * 构造器
     * @param {[type]} element [description]
     */
    function SlotClass(element) {
        this.element = element;
    }


    _createClass(SlotClass, [{
            /**
             * 初始化,增加头尾部
             * @type {String}
             */
            key: '_initSlot',
            value: function _initSlot() {
                this._$fakeFirstTile = this.$tiles.last().clone();
                this._$fakeLastTile = this.$tiles.first().clone();
                this.$container.prepend(this._$fakeFirstTile);
                this.$container.append(this._$fakeLastTile);
            }

        }, {
            /**
             * 计算初始化值
             * @type {String}
             */
            key: '_initDirection',
            value: function _initDirection() {
                this._direction = {
                    selected: this.settings.direction === 'down' ? 'down' : 'up',
                    up: {
                        key: 'up',
                        initial: this.getTileOffset(this.active),
                        first: 0,
                        last: this.getTileOffset(this.$tiles.length),
                        to: this._maxTop,
                        firstToLast: this.getTileOffset(this.$tiles.length),
                        lastToFirst: 0
                    },
                    down: {
                        key: 'down',
                        initial: this.getTileOffset(this.active),
                        first: this.getTileOffset(this.$tiles.length),
                        last: 0,
                        to: this._minTop,
                        firstToLast: this.getTileOffset(this.$tiles.length),
                        lastToFirst: 0
                    }
                };
            }
        }, {
            /**
             * 运行游戏
             * @type {String}
             */
            key: 'run',
            value: function run() {
            	console.log(this)
            }
        }



    ]);



    return SlotClass;

}();
