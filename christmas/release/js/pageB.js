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



    $boy.transition({
        "right": "5rem"
    }, 1000, "linear", function() {

        //小男孩停止走路
        $boy.addClass("walk-stop")

        setTimeout(function() {
            //小女起立
            $girl.addClass("girl-standUp");
            setTimeout(function() {
                //走路
                $girl.addClass("girl-book-run")
                //猫书
                $cat.addClass("cat-book");
                //小女孩走路
                $girl.addClass("girl-walk")
                    .transition({
                        "left": "5.5rem"
                    }, 1000, "linear", function() {
                        $girl.addClass("walk-stop")
                    })
            }, 1000)
        }, 500)


        //打开包裹
        $boy
        .addClass("walk-stop")
        .addClass("boy-unwrapp")
        .addClass("walk-run")
        .one(support.animationEnd, function() {
            showCarousel()
            setTimeout(function(){
                 $girl.addClass("girl-choose").addClass("walk-run")
            },1500)
        })
    });



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
