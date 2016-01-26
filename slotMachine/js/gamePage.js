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
    
    var gameCount      = slotGames.conf.count; //游戏次数
    var gameComplete;
    var _events        = [];
    var slots          = []; //实例
    var slotNum        = 3; //图片
    var i              = 1;


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
                    --gameCount;
                    resultPage(collect.state, gameCount , function(){
                        resetGame();
                    });
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
     * 默认配置文件
     * 随机页面
     * @type {Array}
     */
    var config = [];
    var actives = random(3);
    actives.forEach(function(active, index) {
        config[index] = {
            rotate: slotGames.conf.games.rotate, //转动圈数
            active: active //停留页面
                // delay    : index * 1000 //动画延时
        }
    })


    /**
     * 状态对象
     * @type {Object}
     */
    var _data = {};
    var collect = utils.createClass({}, [{
        /**
         * 显示中奖页面
         * @type {String}
         */
        key: 'state',
        set: function(state) {
            _data.state = state;
            updateConf();
            getState.request = false;
        },
        get: function() {
            return _data.state;
        }
    }, {
        /**
         * 老虎机中奖图片
         * @type {String}
         */
        key: 'active',
        set: function(value) {
            _data.active = value;
            updateConf(); //更新配置文件
        },
        get: function() {
            return _data.active;
        }
    }, {
        /**
         * 礼品编号
         * @type {String}
         */
        key: 'prize',
        set: function(value) {
            _data.prize = value;
        },
        get: function() {
            return _data.prize;
        }
    }])


    /**
     * 更新配置文件
     * @return {[type]} [description]
     */
    function updateConf() {
        if (collect.state && collect.active) { //成功
            actives.forEach(function(active, index) {
                config[index]['active'] = collect.active;
            })
        }
    }


    /**
     * 可点击
     * @return {[type]} [description]
     */
    function clickable() {
        //还在获取中
        if (getState.request) {
            return false;
        }
        if (collect.state) {
            //页面与礼品编号必须存在
            if (collect.active && collect.prize) {
                return true;
            }
        } else {
            //失败页面
            return true;
        }
        return true
    }


    /**
     * 控制老虎机动作
     * @param  {[type]} action [description]
     * @return {[type]}        [description]
     */
    function slotsAction(action, flag) {
        slots.forEach(function(slot, index) {
            if (flag) {
                // if(index==0)
                    slot[action] && slot[action](config[index], gameComplete)
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
        stateGame.state = false;
        slotsAction("reset")
    }


    /**
     * 获取状态
     * @return {[type]} [description]
     */
    function getState() {
        if (!getState.request) {
            //如果发送了请求
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
        // $box.addClass("box-flash");
        //运行
        slotsAction("run", true)
    }


    /**
     * 开始摇奖
     * @return {[type]}   [description]
     */
    $lottery.on("click", function(e) {
        if (clickable()) {
            stateGame();
        }
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
        if (!gameCount) return;
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
     * 礼品出现
     * @return {[type]} [description]
     */
    var gift = function(prize) {
        // var $gift = $(".slot-gift")
        // var element = $gift.find(".slot-gift-" + active)
        setTimeout(function(){
            alert('礼品编号prize：' + prize)
        },2000)
    }

    /**
     * 结果页面
     * @return {[type]} [description]
     */
    function resultPage(state, gameCount, cb) {

        var title = gameCount ? "你今天还有剩下" + gameCount + "次机会" : "3次抽奖结束"

        var $p = appendTitle(title)

        //显示内容页面
        content(state);

        //显示结果页面
        resultBg(state);

        /**
         * 奖品处理
         * prize 对应奖品图片的标记
         */
        if (collect.active && collect.prize) {
            gift(collect.prize);
        }

        //切换后回调
        setTimeout(function() {
            cb();
        }, 0)

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
