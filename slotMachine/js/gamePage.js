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
    
    var gameCount = slotGames.conf.count; //游戏次数
    var gameComplete;
    var _events = [];
    var slots = []; //实例
    var slotNum = 3; //图片
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
    var randomOrder = [];

    function random(len) {
        //计算随机
        var calculate = function() {
            return Math.floor(Math.random() * len);
        }
        for (var i = 0, len; i < len; i++) {
            var order = calculate();
            if (randomOrder.length > 0) {
                while (jQuery.inArray(order, randomOrder) > -1) {
                    order = calculate(len) //如果重复了，再次随机,直到每一个都唯一
                }
            }
            randomOrder.push(order);
        }
        return randomOrder;
    }


    /**
     * 构建完成函数
     * @return {[type]}          [description]
     */
     var createFn = function() {
        var count = slotNum;
        return function() {
            --count;
            if (!count) {
                setTimeout(function() {
                    stateGame.state = false;
                    --gameCount;
                    resultPage(collect.state, gameCount);
                }, 800)
            }
        }
    }

    /**
     * 完成函数
     * @return {[type]} [description]
     */
    gameComplete = createFn();


    /**
     * 默认配置文件
     * @type {Array}
     */
    var config = [];
    var actives = random(3);
    actives.forEach(function(active,index){
        config[index] = {
            rotate   : slotGames.conf.games.rotate, //转动圈数
            active   : active //停留页面
            // delay    : index * 1000 //动画延时
        }
    })

    /**
     * 状态对象
     * @type {Object}
     */
    var _data = {};
    var collect = utils.createClass({}, [{
        key: 'state',
        set: function(state) {
            getState.request = false;
            _data.state = state;
            updateConf();
            if (stateGame.click) {
                stateGame();
            }
        },
        get: function() {
            return _data.state;
        }
    }, {
        key: 'active',
        set: function(value) {
            _data.active = value;
            updateConf(value); //更新配置文件
        },
        get: function() {
            return _data.active;
        }
    }])


    /**
     * 更新配置文件
     * @return {[type]} [description]
     */
    function updateConf() {
        if (collect.state && collect.active) { //成功
           config.forEach(function(data){
                data.active = collect.active
           })
        }
    }


    /**
     * 控制老虎机动作
     * @param  {[type]} action [description]
     * @return {[type]}        [description]
     */
    function slotsAction(action, options) {
        slots.forEach(function(slot, index) {
            if (options) {
                slot[action] && slot[action](options[index], gameComplete)
            } else {
                slot[action] && slot[action]()
            }
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
        if (stateGame.state) {
            return;
        }
        stateGame.state = true;
        //增加动作
        $rod.addClass("rod-up");
        $box.addClass("box-flash");
        //运行
        slotsAction("run", config)
    }

    /**
     * 按钮
     * 开始摇奖
     */
    $lottery.on("click", function() {
        //如果请求未提交
        if (void 0 == collect.state) {
            stateGame.click = true;
            return;
        }
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
        if(!gameCount)return;
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
