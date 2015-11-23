/**
 * 第二副场景页面
 *
 */
function PageB(element) {

    var $element  = element;
    //圣诞男孩
    var $boy      = $element.find(".boy-walk");
    //3d旋转
    var $carousel = $element.find("#carousel");
    //女孩
    var $girl     = $element.find(".girl-book");
    //猫
    var $cat      = $element.find(".cat");

    /**
     * 小女孩动作
     * @return {[type]} [description]
     */
    var girlAction = {
        //小女起立
        standUp: function() {
            var dfd = $.Deferred();
            $girl.addClass("girl-standUp");
            setTimeout(function() {
                $cat.addClass("cat-book");
                $girl.addClass("girl-book-run");
                setTimeout(function() {
                    dfd.resolve()
                }, 1000)
            }, 500)
            return dfd;
        },
        walk: function(callback) {
            var dfd  = $.Deferred();
            //小女孩走路
            $girl.addClass("girl-walk");
            $girl.transition({
                "left": "4.5rem"
            }, 500, "linear", function() {
                dfd.resolve()
            })
            return dfd;
        },
        stopWalk: function() {
            $girl.addClass("walk-stop")
        },
        //继续走路
        runWalk: function() {
            $girl.addClass("walk-run")
        },
        //选择3d
        choose:function(callback){
            $girl.addClass("girl-choose")
            girlAction.runWalk();
            $girl.one(support.animationEnd, function() {
                callback();
            })
        },
        reset:function(){
            $girl.removeClass("girl-choose")
        }
    }

    /**
     * 小男孩动作
     * @return {[type]} [description]
     */
    var boyAction = {
        //走路
        walk: function() {
            var dfd  = $.Deferred();
            $boy.transition({
                "right": "5rem"
            }, 100, "linear", function() {
                dfd.resolve()
            });
            return dfd;
        },
        //停止走路
        stopWalk: function() {
            $boy.addClass("walk-stop");
        },
        //解开包裹
        unwrapp:function(){
            var dfd  = $.Deferred();
            $boy.addClass("boy-unwrapp");
            //开始执行
            boyAction.runWalk();
            $boy.one(support.animationEnd, function() {
                dfd.resolve();
            })
            return dfd;
        },
        //继续走路
        runWalk: function() {
            $boy.addClass("walk-run")
        },
        //创建3d旋转
        createCarousel: function() {
            //3d旋转
            var carousel = new Carousel($carousel, {
                imgUrls: [
                    "images/carousel/1.png",
                    "images/carousel/2.png",
                    "images/carousel/3.png"
                ],
                videoUrls: [
                    "images/carousel/1.mp4",
                    "images/carousel/2.mp4",
                    "images/carousel/3.mp4"
                ]
            });
            return carousel;
        }
    }


    /**
     * 获取礼物
     * @return {[type]} [description]
     */
    function getGift(count, carousel, complete) {
        //运行3次
        carousel.run(count);
        //小女孩选择动作
        girlAction.choose(function() {
            //选中视频
            carousel.selected(function() {
                //播放视频
                carousel.palyVideo({
                    //加载开始
                    load: function() {
                        //小女孩动作还原
                        girlAction.reset();
                        //旋转动作还原
                        carousel.reset();
                    },
                    //完成
                    complete: complete
                });
            });
        })
    }


    //开始走路
    boyAction.walk()
        .then(function() {
            //停止走路
            boyAction.stopWalk();
        })
        .then(function() {
            //女孩起身
            return girlAction.standUp()
        })
        .then(function() {
            //女孩走路
            return girlAction.walk();
        })
        .then(function() {
            //女孩停止走路
            return girlAction.stopWalk();
        })
        .then(function() {
            //解开包裹
            return boyAction.unwrapp();
        })
        .then(function(){
            //3d木马
            var carousel = boyAction.createCarousel();
            //旋转起点
            var start = carousel.numpics;
            //终点，旋转3次
            var end = start + 3;
            //播放
            var play = function() {
                //获取礼物
                getGift(start, carousel, function() {
                    ++start;
                    check();
                });
            }
            //检测播放次数
            var check = function() {
                //只旋转3次
                if (start >= end) {
                    return
                }
                play();
            }
            play();
        })

 
}

