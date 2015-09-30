
function format(format) {
    var args = [].slice.call(arguments, 1, arguments.length);
    return format.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i];
    });
}


/**
 * 翻牌小游戏
 * @type {Object}
 */
var cardGames = function(element) {

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

    this.images = {
        front : "images/1.png",
        back  : "images/3.jpg"
    }

    this.initCreate();
    this.creatEvent();
};


cardGames.prototype = {


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
        var uls          = [];
        var debrisWidth  = this.debrisWidth;
        var debrisHeight = this.debrisHeight;
        var row          = this.level.row;
        var col          = this.level.col;
        var images       = this.images;

        //布局的原始排序
        this.originalOrder = {};

        //碎片快速索引
        this.$debrisMap = {};

        var uls = [];

        var createStr = function(i,j) {
            var fill = function() {
                return 'width:100%;height:100%;position:absolute;top:0;left:0;background-size:100% 100%;backface-visibility: hidden;'
            }
            var innerdiv = function() {
                return format(
                    '<div style="{0};left;z-index:2;background-image:{1}"></div>'+
                    '<div style="{0};transform: rotateY(180deg);-webkit-transform:rotateY(180deg);background-image:{2};"></div>',
                    fill(), "url('" + images.front + "')", "url('" + images.back + "')"
                )
            }
            var str = format(
                '<li data-page = {0} data-index ={1} '+
                    'style="width:{2}px;height:{3}px;left:{4}px;top:{5}px;'+
                    'background-size:100% 100%;'+
                    'position:absolute;' +
                    'transition: 0.6s;' +
                    'transform-style: preserve-3d;' +
                    'transform:scale(0.9);' +
                    '-webkit-transition: 0.6s;' +
                    '-webkit-transform-style: preserve-3d;' +
                    '-webkit-transform:scale(0.9);"' +
                '>'+ innerdiv() +'</li>', 
                i, j,
                debrisWidth, debrisHeight, j * debrisWidth, i * debrisHeight
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
                $li = createStr(i,j);
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
                page = element.getAttribute('data-page');
                if (page || page == 0) {
                    $(element).css({
                        'transform': 'rotateY(180deg),scale(0.9)'
                    })
                }
            }
        }
    },

    transitionend: function() {

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
        }).on('transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd', function(event) {
            self.transitionend(event)
        });
    }


}
