'use strict';

require('./app.css');

var utils = require('./utils');
var config = require('./config');
var calculate = require('./calculateOrder');

var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';


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
    this.originalOrder = calculate.nature(options.level.row, options.level.col);
    //新是随机排序
    this.randomOrder   = calculate.random(this.originalOrder);
    //一个元素动画2次回调处理
    this.triggerCache  = [];
    //收集回调
    this.trackAnims = {
        elems       : [], //触发的元素
        triggerTime : [], //手动触发
        autoTime    : [] //动画恢复
    };
    //创建
    this.initCreate();
    this.creatEvent();
};


Manager.prototype = {

    initCreate: function() {
        var level = this.options.level;
        this.debrisWidth = this.contentWidth / level.row;
        this.debrisHeight = this.contentHeight / level.col;
        this.initLayer();
    },


    initLayer: function() {
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
