
var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

/**
 * 原始布局
 * @return {[type]} [description]
 */
exports.nature = function(row, col) {
    var order = [];
    var i;
    var j;
    for (i = 0; i < col; i++) {
        for (j = 0; j < row; j++) {
            if (!order[i]) {
                order[i] = [];
            }
            order[i].push(j)
        }
    }
    return order;
}

//随机布局
exports.random = function(originalOrder) {
    var randomOrder = [];
    var beforeOrder;
    var order;
    //计算随机
    var calculate = function(len) {
        return Math.floor(Math.random() * len);
    }

    for (var i = 0, len = originalOrder.length; i < len; i++) {
        randomOrder[i] = [];
        for (var j = 0, orderLen = originalOrder[i].length; j < orderLen; j++) {
            //随机数
            order = calculate(orderLen);
            //去重,保证唯一
            if (randomOrder[i].length > 0) {
                while (jQuery.inArray(order, randomOrder[i]) > -1) {
                    order = calculate(orderLen)
                }
            }
            randomOrder[i].push(order);
        }
    }

    for (i = 0; i < randomOrder.length; i++) {
        order = randomOrder[i];
        if (beforeOrder) {
            //保证不一致
            if (order.toString() == beforeOrder.toString()) {
                return this.random(originalOrder);
            }
        }
        beforeOrder = order;
    }

    return randomOrder;
}


//找到容器ul
exports.findContainer = function(event, appoint) {
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
}

exports.pushArray = function(obj, key, fn) {
    if (!obj[key]) {
        obj[key] = [];
    }
    fn(obj[key])
}

var once = false;
exports._bind = function() {
    this.$container.on('mousedown touchstart', function() {
        this.$container.off('mousedown touchstart')
        this.triggerClick(event)
        console.log(1)
        return false;
    }.bind(this))

    if (!once) {
        once = true;
        this.$container.on(animationend, function(event) {
            this.animCallback(event);
            return false;
        }.bind(this));
    }
}



