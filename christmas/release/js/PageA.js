/**
 * 第一副场景页面
 * http://louisremi.github.com/jquery.transform.js/index.html
 */

function PageA() {

	this.$boy = $('.chs-boy');

    // this.$boy.animate({
    //     'top': '10px',
    //     transform: 'scale(0.6)'
    // }, 3200, function() {
    //     $(this).animate({
    //         'z-index': 5
    //     }, 0, function() {
    //         $(this).animate({
    //             'top': '90px',
    //             transform: 'scale(1)'
    //         }, 2000);
    //     });
    // });

	// console.log( calculationKeyframes(1,1,19))

}


/**
 * 运行下一个动画
 * @return {Function} [description]
 */
PageA.prototype.next = function(options) {
    var dfd = $.Deferred();
    this.$boy.animate({
        "left": options.left,
        "transform": "scale(" + options.scale + ")"
    }, options.time, function() {
        dfd.resolve()
    });
    return dfd;
}

/**
 * 跑步
 * @return {[type]} [description]
 */
PageA.prototype.run = function(){

    var next = function() {
        return this.next.apply(this, arguments)
    }.bind(this)

    next({
        "left"  : "1rem",
        "scale" : 0.5,
        "time"  : 3000
    }).
    done(function() {
        return next({
            "left"  : "5rem",
            "scale" : 0.5,
            "time"  : 5000
        })
    }).
    done(function() {
        return next({
            "left"  : "10rem",
            "scale" : 0.5,
            "time"  : 5000
        })
    })

}






/**
 *  css3关键帧算法
 * @param {[type]} row   [description]
 * @param {[type]} col   [description]
 * @param {[type]} count [description]
 */
function calculationKeyframes(col, row, count) {
    //矩阵生成step的处理
    //  0 1 2
    //  3 4 5
    //  6 7 8
    var keyframes = [];
    var base = 100 / count;
    //首次
    keyframes.push(0 + '% { background-position:0% 0%}')
    for (var i = 0; i < count; i++) {
        //当前行数
        var currRow = Math.ceil((i + 1) / col); //当前行数
        var currCol = Math.floor(i / col); //当前列数  
        var period = currCol * col; //每段数量  
        var x = 100 * (i - period)
        var y = 100 * currCol;
        x = x == 0 ? x : "-" + x;
        y = y == 0 ? y : "-" + y;
        keyframes.push(((i + 1) * base) + '% { background-position: ' + y + '% ' + x + '%}')
    }
    return keyframes.join("")
}