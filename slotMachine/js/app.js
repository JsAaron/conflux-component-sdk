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


    function SlotClass(element) {
    	console.log(element)
    }


    _createClass([{
        key: '_initSlot',
        value: function _initSlot() {
            this._$fakeFirstTile = this.$tiles.last().clone();
            this._$fakeLastTile = this.$tiles.first().clone();
            this.$container.prepend(this._$fakeFirstTile);
            this.$container.append(this._$fakeLastTile);
        }
    }, {
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



    }]);


    return SlotClass;
}();


var element = $(".slot-gamepage-roll")

new SlotMachine(element)