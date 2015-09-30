/**
 * 翻牌小游戏
 * @type {Object}
 */
(function() {

    'use strict';


    //配置文件
    var config = {

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
        _.each(vendors, function(v) {
            if (jQuery.camelCase(v + '-' + attr) in _style) {
                name = '-' + v + '-' + attr;
                return _cache[attr] = name;
            }
        })
        return name;
    }

    var transform = prefixStyle('transform');
    var transitionend = 'transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd';


    function format(format) {
        var args = [].slice.call(arguments, 1, arguments.length);
        return format.replace(/\{(\d+)\}/g, function(m, i) {
            return args[i];
        });
    }


    config.rotateY = config.direction === 'left' ? '180deg' : '-180deg';


    function cardGames() {

    }



    var Manager = function(element, options) {

        //页面容器
        var $container = $(element);
        this.$container = $container;

        //区域尺寸
        this.contentWidth = parseInt($container.css('width'))
        this.contentHeight = parseInt($container.css('Height'))

        //区域布局
        var offset = $container.offset()
        this.contentLeft = offset.left;
        this.contentTop = offset.top

        //触发翻转动画
        this.trigger = [];

        this.initCreate();
        this.creatEvent();
    };


    Manager.prototype = {

        initCreate: function() {
            this.level = {
                row: 3, //横行
                col: 2 //竖列
            }
            this.debrisWidth = this.contentWidth / this.level.row;
            this.debrisHeight = this.contentHeight / this.level.col;
            //初始化布局
            this.initLayer();
        },

        initLayer: function() {
            var index;
            var $ul;
            var $li;
            var uls = [];
            var debrisWidth = this.debrisWidth;
            var debrisHeight = this.debrisHeight;
            var row = this.level.row;
            var col = this.level.col;
            var images = config.images;

            //布局的原始排序
            this.originalOrder = {};

            //碎片快速索引
            this.$debrisMap = {};

            var uls = [];

            var createStr = function(i, j) {
                var fill = function() {
                    return 'width:100%;height:100%;position:absolute;top:0;left:0;background-size:100% 100%;backface-visibility: hidden;'
                }
                var innerdiv = function() {
                    return format(
                        '<div style="{0};left;z-index:2;background-image:{1}"></div>' +
                        '<div style="{0};{4}:rotateY({2});background-image:{3};"></div>',
                        fill(),
                        "url('" + images.front + "')",
                        config.rotateY,
                        "url('" + images.back[j] + "')",
                        transform
                    )
                }
                var str = format(
                    '<li data-page = {0} data-index ={1} ' +
                    'style="width:{2}px;height:{3}px;left:{4}px;top:{5}px;' +
                    'background-size:100% 100%;' +
                    'position:absolute;' +
                    '{6}-style: preserve-3d;' +
                    '{6}:scale(0.9);"' +
                    '>' + innerdiv() + '</li>',
                    i, j,
                    debrisWidth, debrisHeight, j * debrisWidth, i * debrisHeight,
                    transform
                )
                return $(str)
            }

            //生成 row * col 的矩阵
            for (var i = 0; i < col; i++) {
                $ul = $(document.createElement('ul')).css({
                    'width': this.contentWidth,
                    'height': this.contentHeight / 2
                });
                for (var j = 0; j < row; j++) {
                    $li = createStr(i, j);
                    $ul.append($li)
                    if (!this.originalOrder[i]) {
                        this.originalOrder[i] = [];
                    }
                    this.originalOrder[i].push(j)
                }
                uls.push($ul)
            }

            var $fragment = $(document.createElement('createDocumentFragment'));
            $.each(uls, function(index, ul) {
                $fragment.append(ul)
            })
            this.$container.append($fragment[0].childNodes);
        },

        onClick: function(event) {
            var element, elementName, page;
            element = event.target;
            if (element && (element = element.parentNode)) {
                elementName = element.nodeName.toLowerCase();
                if (elementName == 'li') {
                    $(element).css({
                        'transition-duration': config.speed + 'ms',
                        transform: 'rotateY(' + config.rotateY + '),scale(0.9)'
                    })
                    this.trigger.push(element);
                }
            }
        },

        transitionend: function(e) {

        },

        creatEvent: function() {
            var stopBehavior = function(event) {
                event.preventDefault();
                event.stopPropagation();
            }
            var self = this;
            this.$container.on('mousedown touchstart', function(event) {
                stopBehavior(event)
                self.onClick(event)
            }).on(transitionend, function(event) {
                self.transitionend(event)
            });
        }
    }

    window['cardGames'] = Manager;
})();
