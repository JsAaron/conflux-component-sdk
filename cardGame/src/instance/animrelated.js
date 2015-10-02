/**
 * 动画回调处理
 */

var depend = require('./depend');


exports.resetProperties = function(context, filter, callback) {
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
}


//检测回调的唯一性
exports.checkUnique = function(event) {
    var ul = depend.findContainer(event);
    var index = this.triggerCache.indexOf(ul);
    if (~index) {
        this.triggerCache.splice(index, 1)
        return false;
    }
    this.triggerCache.push(ul);
    return true;
}

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

}
