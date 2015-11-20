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

    //观察者
    var observer = new Observer();

    //页面容器
    var container = $(".container");
    //设置新的页面容器大小
    container.css(config.layer);
    //页面可视区域
	var visualWidth  = container.width()
	var visualHeight = container.height()

    //页面容器元素
    var $pageA = $(".page-a");
    var $pageB = $(".page-b");

    //页面对象
    var objA,objB,objC;


     objB = new PageB($pageB)

    return
	//第一副页面
    objA = new PageA($pageA)
    objA.run(function() {
         observer.publish("completeA");
    });

    //页面A执行完毕
    observer.subscribe("completeA", function() {
        changePage($pageA, "effect-out", function() {
            observer.publish("changePage");
        })
    })

    //切换页面完毕
    observer.subscribe("changePage", function() {
        //处理页面B
        objB = new PageB($pageB)
    })





};




$(function() {
    //圣诞主题效果，开始
    Christmas()
})
