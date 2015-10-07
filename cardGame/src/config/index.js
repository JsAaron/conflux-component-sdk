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
        front: "images/1.png",
        //背景图,随机分配
        back: ["images/11.png", "images/12.png", "images/13.png"]
    },

    //图片之间的间距,单位PX
    gap:{
        left : 10,
        top  : 15
    }

}
