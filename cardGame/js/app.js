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

    this.imageSrc = "images/1.png"

    console.log(this)

    //初始化创建
    this.initCreate();

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
        var uls = [];
        var debrisWidth = this.debrisWidth;
        var debrisHeight = this.debrisHeight;
        var row = this.level.row;
        var col = this.level.col;

        //布局的原始排序
        this.originalOrder = {};

        //碎片快速索引
        this.$debrisMap = {};

        var uls = [];
        //生成 row * col 的矩阵
        for (var i = 0; i < col; i++) {
            $ul = $(document.createElement('ul')).css({
                'width': this.contentWidth,
                'height': this.contentHeight / 2

            });
            for (var j = 0; j < row; j++) {
                $li = $(document.createElement('li')).css({
                    'width'             : (debrisWidth) + 'px',
                    'height'            : (debrisHeight) + 'px',
                    'left'              : j * debrisWidth + 'px',
                    'top'               : i * debrisHeight + 'px',
                    'backgroundImage'   : "url('" + this.imageSrc + "')",
                    'backgroundSize'    : '100% 100%',
                    'position'          : 'absolute',
                    '-webkit-transform' : 'scale(0.9)'
                });
                $ul.append($li)

                if(!this.originalOrder[i]){
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

    }



}