/**
 * 第二副场景页面
 *
 */
function PageB(element) {

    var $root = element;
    //圣诞男孩
    var $boy = $root.find(".boy-walk");
    //3d旋转
    var $carousel = $root.find("#carousel");



    $boy.transition({
        "right": "5rem"
    }, 3000, "linear", function() {
        $boy.addClass("boy-walk-stop").removeClass("boy-walk-animate")
    });

    showCarousel();

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
