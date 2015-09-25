/**
 * 翻牌小游戏
 * @type {Object}
 */
var cardGames = function(element) {

    //页面容器
    var container    = $(element);
    //页面可视区域
    var visualWidth  = container.width()
    var visualHeight = container.height()


    //时间设置(时间毫秒）
    var setTime = {
        walkToThird  : 6000, //走第一段路，1/3屏幕宽度所用的时间，走完毕背景动
        walkToMiddle : 6500, //走第二段路，1/2屏幕宽度所用的时间，走到商店
        walkToEnd    : 6500, //走第三段路，走到桥
        
        walkTobridge : 2000, //上桥
        bridgeWalk   : 2000, //桥上走路到中间

        walkToShop   : 1000, //进商店时间
        walkOutShop  : 1000, //出商店时间
        
        openDoorTime : 800, //开门时间
        shutDoorTime : 500, //关门时间
        
        waitRotate   : 850,//男女等待转身的时间
        waitFlower   : 800 //模拟取花的等待时间
    }

};

