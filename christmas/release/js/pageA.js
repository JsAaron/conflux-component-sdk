/**
 * 第一副场景页面
 * http://louisremi.github.com/jquery.transform.js/index.html
 * http://www.html5tricks.com/demo/html5-css3-car-animation/index.html
 * http://www.gbtags.com/gb/demoviewer/4387/c9ebbe12-abab-487d-958a-aa79797ddcda/snow.html.htm
 * http://www.html5tricks.com/demo/pure-css3-weather-icon/index.html
 */

function PageA(element) {
    //根元素
    this.$root= element;
    //小男孩
    this.$boy = element.find(".chs-boy");
    //窗户
    this.$window = element.find(".window");    
    this.$leftWin  = this.$window.find(".window-left")
    this.$rightWin = this.$window.find(".window-right")

    //初始化一些场景
    this.init();
}


/**
 * 初始化一些场景
 * @return {[type]} [description]
 */
PageA.prototype.init = function() {
    this.createCloudyCircle();
}


/**
 * 开窗
 * @return {[type]} [description]
 */
PageA.prototype.openWindow = function(callback) {
    var count = 1;
    var complete = function() {
        ++count
        if (count === 2) {
            callback && callback();
        }
    }
    var bind = function(data) {
        data.one(support.transitionEnd, function(event) {
            complete()
        })
    }
    bind(this.$leftWin.addClass("hover"))
    bind(this.$rightWin.addClass("hover"))
}

/**
 * 停止走路
 * @return {[type]} [description]
 */
PageA.prototype.stopWalk = function(){
    this.$boy.addClass("boy-stop-animate")
}


/**
 * 运行下一个动画
 * @return {Function} [description]
 */
PageA.prototype.next = function(options) {
    var dfd = $.Deferred();
    this.$boy.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
}


/**
 * 跑步
 * @return {[type]} [description]
 */
PageA.prototype.run = function(callback){
    // return
    var that = this;
    var next = function() {
        return this.next.apply(this, arguments)
    }.bind(this)

    next({
        "time": 1000,
        "style": {
            "top"    : "1rem",
            "left"   : "1rem",
            "rotateY" : "20deg",
            "scale"  : "0.2"
        }
    })
    .done(function(){
        that.$boy.css("z-index",10);
    })
    .then(function() {
        return next({
                "time": 1000,
                "style": {
                "top": "2rem",
                "left": "5rem",
                "rotateY": "40deg",
                "scale": "0.4"
            }
        })
    })
    .then(function() {
        //转角
       return next({
            "time": 500,
            "style": {
                "top"     :"2.2rem",
                "left"    :"5.5rem",
                "rotateY" : "60deg"
            }
        })
    })
    .then(function() {
        return next({
            "time": 500,
            "style": {
                "top"     :"2.5rem",
                "left"    :"6rem",
                "rotateY" : "80deg"
            }
        })
    })
    .then(function() {
        return next({
            "time": 500,
            "style": {
                "top"     :"2.8rem",
                "left"    :"6rem",
                "rotateY" : "100deg"
            }
        })
    })
    .then(function() {
         //转角结束
        return next({
            "time": 500,
            "style": {
                "top"     :"3rem",
                "left"    :"5.5rem",
                "rotateY" : "120deg"
            }
        })
    })
    .then(function() {
        return next({
            "time": 4000,
            "style": {
                 "left"  :"-4rem",
                 "top"   : "7.2rem",
                 "scale" : "1"
            }
        })
    })  
    .then(function() {
       return next({
            "time": 1000,
            "style": {
                "rotateY" : "0"
            }
        })
    })    
    .then(function() {
        return next({
            "time": 2000,
            "style": {
                "left" : "8.5rem",
            }
        })
    }) 
    .then(function(){
        that.stopWalk();
        that.openWindow(callback);
    })  

}


/**
 * 创建半圆的云svg图
 * @return {[type]} [description]
 */
PageA.prototype.createCloudyCircle = function() {
    //创建SVG元素
    var svg = document.createElement("svg");
    svg.setAttribute("width", "100");
    svg.setAttribute("height", "100");
    //创建circle元素
    var rect = document.createElement("rect");
    rect.setAttribute("cx", "50");
    rect.setAttribute("cy", "50");
    rect.setAttribute("r", "40");
    svg.appendChild(rect);
    // $root.append(svg); 
}

 

