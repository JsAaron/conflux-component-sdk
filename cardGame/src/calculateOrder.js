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
