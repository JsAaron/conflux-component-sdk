/**
 * http://www.jq22.com/yanshi242
 * 慕课网特制
 * 圣诞主题效果
 * @type {Object}
 */

/**
 * 切换页面
 * 模拟镜头效果
 * @return {[type]} [description]
 */
function changePage(element,effect,callback){
    element
        .addClass(effect)
        .one(support.animationEnd, function() {
            callback && callback();
        })
}



var Christmas = function() {
    //页面容器
    var container = $(".container");
    //设置新的页面容器大小
    container.css(config.layer);
    //页面可视区域
	var visualWidth  = container.width()
	var visualHeight = container.height()

    //页面A
    var $pageA = $(".page-a");

	//第一副页面
	var pageA = new PageA($pageA)
	pageA.run(function(){
        changePage($pageA,"effect-out")
    });
    // pageA.change();


    // 



    //3d旋转
    // var carousel = new Carousel($("#carousel"), {
    //     imgUrls: [
    //         "assets/carousel/1.png",
    //         "assets/carousel/2.png",
    //         "assets/carousel/3.png",
    //         "assets/carousel/1.png",
    //         "assets/carousel/2.png",
    //         "assets/carousel/3.png"
    //     ],
    //     videoUrls: [
    //         "assets/carousel/1.mp4",
    //         "assets/carousel/2.mp4",
    //         "assets/carousel/3.mp4"
    //     ]
    // });
    // carousel.run();
};




$(function() {
    //圣诞主题效果，开始
    Christmas()
})
