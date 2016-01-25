/**
 * 游戏配置
 * @type {Object}
 */
slotGames.conf = {
    /**
     * //游戏最大可玩次数
     * @type {Number}
     */
    count: 3,
    /**
     * 游戏具体配置
     * @type {Array}
     */
    games: {
        /**
         * 通过css的方式增加一个svg定义的渐变效果
         * 让图片产生模糊
         * @type {Boolean}
         */
        fade: true,
        /**
         * 模式
         * 0 常规修改magin-top的方式
         * 1 css3 transform模式
         * 如果不选,默认会根据支持度切换
         * @type {Number}
         */
        mode: 1,
        /**
         * 一个周期滚动的时间
         * @type {Number}
         */
        duration: 500,
        /**
         * 图片的地址，生成对应的列表，按照图片顺序排列
         * @type {Array}
         */
        imgUrl: [
            "./images/slotMachine/roll/1.png",
            "./images/slotMachine/roll/2.png",
            "./images/slotMachine/roll/3.png",
            "./images/slotMachine/roll/1.png",
            "./images/slotMachine/roll/2.png",
            "./images/slotMachine/roll/3.png"
        ],
        /**
         * 初始化显示第几张图片
         * 0 是默认第一张,按照games.photo是索引排序
         * @type {Number}
         */
        active: 0,
        /**
         * 圈数
         * @type {Number}
         */
        rotate: 10
    },
    /**
     * 每次执行游戏需要发送的请求
     * res.state
     *   res.state = true  //进入正确页面
     *   res.state = false //进入错误页面
     *
     * res.active 
     *   可以设置游戏停留的图片停留的目标图片
     *   从0开始索引
     *  
     * @return {[type]} [description]
     */
    request: function(res) {
        //模拟异步ajax请求
        //修改状态
        setTimeout(function() {
            res.state = false
            res.active = 1
        }, 1000)
    }
}
