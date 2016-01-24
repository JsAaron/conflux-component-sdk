/**
 * 游戏页面
 * @param {[type]} argument [description]
 */

function GamePage(eleName) {

    var $gamePage = $(eleName);

    var findele = function(className) {
        return $gamePage.find(className)
    }

    var $rod           = findele(".slot-gamepage-box-right-rod");
    var $box           = findele(".slot-gamepage-box-left");
    var $lottery       = findele(".slot-gamepage-lottery");
    var $resultPage    = findele(".slot-gamepage-result");
    var $monkeyLeft    = findele(".slot-reslut-monkey-left");
    var $monkeyMiddle  = findele(".slot-reslut-monkey-middle");
    var $monkeyRight   = findele(".slot-reslut-monkey-right");
    var $gem           = findele(".slot-reslut-paper-gem");
    var $dice          = findele(".slot-reslut-paper-dice");
    var $reslutBack    = findele(".slot-reslut-back");
    var $resultLottery = findele(".slot-reslut");
    var $resultNone    = findele(".slot-reslut-none");
    var $envelope      = findele(".slot-reslut-envelope");
    var $header        = findele("header");

    var gameCount = 3; //游戏次数
    var gameComplete;
    var _events = [];
    var slots = []; //实例
    var slotNum = 3;
    var i = 1;


    /**
     * 创建游戏col
     * @param  {[type]} domName [description]
     * @return {[type]}         [description]
     */
    function createSlot(domName) {
        return new SlotMachine("#" + domName, slotGames.conf.games)
    }
    for (; i <= slotNum; i++) {
        slots.push(createSlot("slot-roll-" + i))
    }


    /**
     * 随机
     * @return {[type]} [description]
     */
    function random(n) {
        return Math.floor(Math.random() * n);
    }


    /**
     * 配置文件
     * rotate 转动的圈数
     * active 停留的目标位置(img的索引)
     * @type {Array}
     */
    var config = [{
        rotate: 6,
        active: 2,
    }, {
        rotate: 6,
        active: 2,
    }, {
        rotate: 6,
        active: 2
    }]


    /**
     * 构建完成函数
     * @return {[type]}          [description]
     */
    function createFn(argument) {
        var count = slotNum;
        return function() {
            --count;
            if (!count) {
                setTimeout(function() {
                    --gameCount;
                    var result = false;
                    resultPage(result, gameCount);
                }, 500)
            }
        }
    }

    /**
     * 完成函数
     * @return {[type]} [description]
     */
    gameComplete = createFn();


    /**
     * 控制老虎机动作
     * @param  {[type]} action [description]
     * @return {[type]}        [description]
     */
    function slotsAction(action) {
        slots.forEach(function(slot) {
            slot[action] && slot[action]()
        });
    }


    /**
     * 动作恢复
     * @return {[type]} [description]
     */
    this.resetGame = resetGame = function() {
        $rod.removeClass("rod-up");
        $box.removeClass("box-flash");
        gameComplete = createFn();
        slotsAction("reset")
    }

    /**
     * 状态对象
     * @type {Object}
     */
    var _data = {}
    var collect = utils.createClass({}, [{
        key: 'state',
        set: function(value) {
            getState.request = false;
            _data.state = value;
        },
        get: function() {
            console.log(1)
            return _data.state;
        }
    }])
    
    /**
     * 获取状态
     * @return {[type]} [description]
     */
    function getState() {
        if (!getState.request) {
            getState.request = true;
            slotGames.conf.request(collect);
        }
    }

    getState();


    /**
     * 开始游戏
     * @return {[type]} [description]
     */
    function stateGame() {
        //增加动作
        $rod.addClass("rod-up");
        $box.addClass("box-flash");
        //运行
        setTimeout(function() {
            slots[0].run(config[0], gameComplete);
        }, 300);
        setTimeout(function() {
            slots[1].run(config[1], gameComplete);
        }, 600);
        setTimeout(function() {
            slots[2].run(config[2], gameComplete);
        }, 1000);
    }

    /**
     * 按钮
     * 开始摇奖
     */
    $lottery.on(utils.END_EV, function() {
        console.log(collect.state)
        //如果请求未提交
        if(void 0 == collect.state){
            getState();
            return;
        }
        alert(1)
        stateGame();
    })


    /**
     * 调回主页
     * @param  {[type]} ){                 } [description]
     * @return {[type]}     [description]
     */
    $header.on(utils.END_EV, function() {
        _events[0]();
    })


    /**
     * 显示页面
     * @return {[type]} [description]
     */
    this.show = function() {
        resetGame();
        $gamePage.show();
    }

    /**
     * 监视
     * @return {[type]} [description]
     */
    this.watch = function(name, fn) {
        _events.push(fn)
    }


    /**
     * 销毁
     * @return {[type]} [description]
     */
    this.destroy = function() {
        $lottery.off();
        $header.off();
        $reslutBack.off();
        slotsAction("destroy")
    }

    this.show();

    //=====================================
    //
    //  结果resultPage页面
    //
    //=====================================

    /**
     * 给猴子增加动画
     * @param  {[type]} style [description]
     * @return {[type]}       [description]
     */
    var monkey = function(style) {
        $monkeyLeft[style]("monkey-move")
        $monkeyMiddle[style]("monkey-move mokey-delay-middle")
        $monkeyRight[style]("monkey-move mokey-delay-right")
    }

    /**
     * 增加动画
     * @return {[type]} [description]
     */
    var addBounceIn = function(element) {
        element.addClass("bounceIn")
    }

    /**
     * 移除动画
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    var removeBounceIn = function(element) {
        element.removeClass("bounceIn")
    }


    /**
     * 显示内容
     * @return {[type]}       [description]
     */
    var content = function(state) {
        if (state) {
            $resultLottery.show();
        } else {
            $resultNone.show();
        }
    }

    /**
     * 弹跳动画
     * @return {[type]} [description]
     */
    var bounceIn = function(state) {
        //中奖
        if (state) {
            addBounceIn($gem)
        } else {
            addBounceIn($dice)
        }
    }

    /**
     * 复位结果页面
     * @return {[type]} [description]
     */
    var resetResultPage = function() {
        removeBounceIn($gem);
        removeBounceIn($dice);
        monkey('removeClass')
        $resultLottery.hide();
        $resultNone.hide();
    }


    /**
     * 继续抽奖按钮
     * @return {[type]}      [descriptions]
     */
    $reslutBack.on(utils.END_EV, function(e) {
        e.stopPropagation();
        setTimeout(function() {
            $resultPage.hide();
            resetResultPage();
        }, 500)
    });



    /**
     * 背景处理
     */
    var resultBg = function(state) {
        if (state) {
            $resultPage.addClass("slot-gamepage-result-bg")
        } else {
            $resultPage.addClass("slot-gamepage-result-none-bg")
        }
        $resultPage.show();
    }


    /**
     * 插入文字
     * @return {[type]} [description]
     */
    var appendTitle = function(title) {
        var $p = $("<p>" + title + "</p>");
        $envelope.eq(0).html($p)
        return $p;
    }

    /**
     * 结果页面
     * @return {[type]} [description]
     */
    function resultPage(state, gameCount) {

        var title = gameCount ? "你今天还有剩下" + gameCount + "次机会" : "3次抽奖结束"

        var $p = appendTitle(title)

        //显示内容页面
        content(state);

        //显示结果页面
        resultBg(state);

        //游戏复位
        resetGame();

        //弹跳动画
        setTimeout(function() {
            bounceIn(state)
        }, 1000);

        //猴子动画
        setTimeout(function() {
            monkey('addClass');
            $p.addClass("flipInX")
        }, 2000);
    }

}
