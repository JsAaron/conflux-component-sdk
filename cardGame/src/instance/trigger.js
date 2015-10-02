
var depend = require('./depend');

/**
 * 手动触发
 */
exports.getPos = function(element) {
    return {
        'col': parseInt(element.getAttribute('data-col')),
        'row': parseInt(element.getAttribute('data-row'))
    }
}

exports.runAnim = function(element, status) {
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
}

exports.checkRepeat = function(element, pos) {
    var elem, elems;
    if (elems = this.trigger[pos.col]) {
        if ('Lock' == elems[elems.length - 1]) {
            return true;
        }
    } 
}

exports.triggerClick = function(event) {
    var element, pos;
    if (element = depend.findContainer(event, 'img')) {
        pos = this.getPos(element);
        if (this.checkRepeat(element, pos)) {
            return;
        }
        depend.pushArray(this.trigger, pos.col, function(arr) {
            arr.push(element, 'Lock');
        })
        this.runAnim(element);
        this.trackAnims.elems.push(element);
    }
}
