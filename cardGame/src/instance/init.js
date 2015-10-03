
var utils  = require('../utils'); 
var config = require('../config');
var depend = require('./depend');
   	  	
/**
 * 初始化数据
 */
exports._init = function(element,options) {
    //页面容器
    var $container = this.$container = $(element);
    this.options = utils.merge(options, config);
    //区域尺寸
    this.contentWidth = parseInt($container.css('width'))
    this.contentHeight = parseInt($container.css('Height'))

    //触发翻转动画
    this.trigger = [];
    //布局的原始排序
	this.originalOrder = depend.nature(options.level.row, options.level.col);
	//新是随机排序
	this.randomOrder   = depend.random(this.originalOrder);

    //收集回调
    this.trackAnims = {
        cache:[], //一个元素动画2次回调处理
        elems: [], //触发的元素
        triggerTime: [], //手动触发
        autoTime: [] //动画恢复
    };

    //开始构建
    this._initCreate();
    //构建事件
    this._initEvent();
}
 