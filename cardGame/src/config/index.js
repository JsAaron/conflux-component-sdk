/**
 * 默认配置文件
 * @type {Object}
 */
module.exports = {

    level: {
        col: 2,
        row: 3
    },

    //图片
    images: {
        //正面图
        front: "images/front.png",
        //背景图,随机分配
        back: ["images/back1.png", "images/back2.png", "images/back3.png"]
    },

    //图片之间的间距,单位PX
    gap:{
        left : 10,
        top  : 30
    },

    //随机
    //1 上下随机
    //2 一顿乱搞
    random: 2

}
