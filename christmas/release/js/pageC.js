/**
 * 场景3
 */
function PageC() {

	//雪橇鹿
	this.$deer = $(".deer");

	this.$window   = $(".page-c .window");    
    this.$leftWin  = this.$window.find(".window-left");
    this.$rightWin = this.$window.find(".window-right");
    this.$sceneBg  = this.$window.find(".window-scene-bg");
    this.$closeBg  = this.$window.find(".window-close-bg");

    //背景切换
    this.$sceneBg.transition({
        opacity:0,
    },3000);
    this.$closeBg.css("transform","translateZ(0)")
    this.$closeBg.transition({
        opacity:1
    },5000);
	var that = this;
    //关门动作
	this.closeWindow(function(){
        //小鹿运动
        (function(){
            that.run();
        }).defer(3000)
    });
}


/**
 * 关闭窗
 * @return {[type]} [description]
 */
PageC.prototype.closeWindow = function(callback) {

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
    bind(this.$leftWin.addClass("close"))
    bind(this.$rightWin.addClass("close"))
}


/**
 * 运行下一个动画
 * @return {Function} [description]
 */
PageC.prototype.next = function(options) {
    var dfd = $.Deferred();
    this.$deer.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
}


/**
 * 跑步
 * @return {[type]} [description]
 */
PageC.prototype.run = function(callback){
    var that = this;
    var next = function() {
        return this.next.apply(this, arguments)
    }.bind(this)

    this.$deer.addClass("deer-animate");

    next({
        "time": 5000,
        "style": {
            "top": "4rem",
            "right": "-6rem",
            "scale": "1"
        }
    })    
    .then(function() {
       return next({
            "time":100,
            "style": {
               "rotateY" : "-180",
               "scale": "0.8"
            }
        })
    })    
    .then(function() {
        return next({
            "time": 10000,
            "style": {
                "top"   :"2rem",
                "right": "15rem",
                "scale": "0.2"
            }
        })
    }) 
}

window.onload = function(){

new PageC()
}
