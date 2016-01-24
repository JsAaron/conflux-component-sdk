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

    function createSlot(domName) {
        return new SlotMachine("#" + domName, {
            fade: true, //启动图片滚动模糊感,
            mode: 1, //用的left模式, 0/1
            active: 0, //首页页码
            delay: 500, //一个周期滚动的时间
            imgUrl: [ //图片的地址，生成对应的列表，按照图片顺序排列
                "./images/slotMachine/roll/1.png",
                "./images/slotMachine/roll/2.png",
                "./images/slotMachine/roll/3.png",
                "./images/slotMachine/roll/1.png",
                "./images/slotMachine/roll/2.png",
                "./images/slotMachine/roll/3.png"
            ]
        })
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
     * 动作恢复
     * @return {[type]} [description]
     */
    this.resetGame = resetGame = function() {
        $rod.removeClass("rod-up");
        $box.removeClass("box-flash");
        gameComplete = createFn();
        slots.forEach(function(slot) {
            slot.reset()
        });
    }


    /**
     * 按钮
     * 开始摇奖
     */
    $lottery.on(utils.END_EV, function() {
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

        var title = gameCount 
            ? "你今天还有剩下" + gameCount + "次机会"
            : "3次抽奖结束"
 
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
