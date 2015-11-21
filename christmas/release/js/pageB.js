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
                "left": "5.5rem"
            }, 1000, "linear", function() {
                dfd.resolve()
            })
            return dfd;
        },
        stopWalk: function() {
            $girl.addClass("walk-stop")
            return this;
        },
        //继续走路
        runWalk: function() {
            $girl.addClass("walk-run")
        },
        //选择3d
        choose:function(){
            $girl.addClass("girl-choose");
            return this;
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
            }, 1000, "linear", function() {
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
            $boy.one(support.animationEnd, function() {
                dfd.resolve();
            })
            return dfd;
        },
        //继续走路
        runWalk: function() {
            $boy.addClass("walk-run")
        }
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
            //开始执行
            boyAction.runWalk();
            //解开包裹
            return boyAction.unwrapp();
        })
        .then(function(){
            showCarousel()
            setTimeout(function() {
                girlAction.choose().runWalk();
            }, 1500)
        })



    /**
     * 显示3d旋转木马
     * @return {[type]} [description]
     */
    function showCarousel(callback){
         //3d旋转
        var carousel = new Carousel($carousel, {
            imgUrls: [
                "assets/carousel/1.png",
                "assets/carousel/2.png",
                "assets/carousel/3.png"
            ],
            videoUrls: [
                "assets/carousel/1.mp4",
                "assets/carousel/2.mp4",
                "assets/carousel/3.mp4"
            ]
        });
        carousel.run(callback);       
    }

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
            keyframes.push(((i + 1) * base) + '% { background-position: ' + x + '% ' + y + '%}')
        }
        return keyframes.join("")
    }
