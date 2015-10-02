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

    //翻转的速度单位ms //默认0.6秒
    speed: 600,

    //反转的反向
    //顺时针//逆时针 left or rigth
    direction: 'left'

}
