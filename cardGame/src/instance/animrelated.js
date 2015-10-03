/**
 * 动画回调处理
 */

var depend = require('./depend');


/**
 * 检测回调的唯一性
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
var checkUnique = function(event) {
    var ul = depend.findContainer(event);
    var index = this.trackAnims.cache.indexOf(ul);
    if (~index) {
        this.trackAnims.cache.splice(index, 1)
        return false;
    }
    this.trackAnims.cache.push(ul);
    return true;
}

/**
 * 状态值
 * @type {Object}
 */
var stateValue = {
    'back'  :'front',
    'front' :'back'
};


/**
 * 重设新的状态
 * @return {[type]} [description]
 */
var restoreState = function(elem,filter){
    //重设值的状态
    elem[0].setAttribute('data-type' , stateValue[filter])
}

/**
 * 恢复属性
 * @param  {[type]} context [description]
 * @param  {[type]} parent  [description]
 * @param  {[type]} filter  [description]
 * @return {[type]}         [description]
 */
var restoreProperties = function(elem, parent, filter) {
    var related = {
        front: function() {
            elem.removeClass('is-visible is-selected').addClass('is-hidden');
        },
        back: function() {
            elem.addClass('is-visible').removeClass('is-hidden is-selected');
        }
    }
    related[filter]();
    parent.removeClass('is-switched')
    //设置状态值
    restoreState(elem,filter);
}


/**
 * 动画回调
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
exports.animCallback = function(event) {
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
    parent = depend.findContainer(event)
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
        elem.removeAttribute('data-status');
        filter = elem.getAttribute('data-type')
        restoreProperties($elem,$parent,filter);
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
    restoreProperties($elem, $parent, filter)


    //保证只回调一次
    if (checkUnique.call(this,event)) {
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
    function unlock() {
        if (level.col == isLock) {
            elems = self.trigger;
            for (i = 0; i < self.trigger.length; i++) {
                self.trigger[i].length = 0;
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

}
