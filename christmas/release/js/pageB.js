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
    }, 500, "linear", function() {
        $boy.removeClass("boy-walk-animate")
        setTimeout(function() {
            $girl.addClass("girl-book-getUp");
            setTimeout(function() {
                // $girl.addClass("girl-book-run")
                $cat.addClass("cat-book");
                $girl.addClass("girl-run")
            }, 500)
        }, 500)
        $boy.addClass("boy-take-gift")
        $boy.one(support.animationEnd,function(){
            showCarousel();
        })
    });

   

    /**
     * 显示3d旋转木马
     * @return {[type]} [description]
     */
    function showCarousel(){
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
        carousel.run();       
    }

}
