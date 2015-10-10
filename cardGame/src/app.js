'use strict';

var CardGames = require('./cardGames');
var utils = require('./utils');

//游戏时间
var GameTime = 30000; //ms单位 
//每次游戏关数
var GameCount = 3;
//允许玩的游戏次数
var AllowPlayCount  = 0;

//开始时间
var startTime = 0
//玩的次数
var playCount = 0;
var $homePage        = $('.home-page');
var $contentPage     = $('.content-page');
var $lotteryPage     = $('.lottery-page');
var $winningPage     = $('.winning-page');
var $element         = $('.banner-right .score');
var $lotteryPlay     = $('.lottery-play');
var $lotteryIntegral = $('.lottery-integral-right');
var $lotteryTime     = $('.lottery-time-right');
var $winningShow     = $('.winning-show em');

function preloadimages(arr) {
    var newimages = []
    var arr = (typeof arr != "object") ? [arr] : arr //确保参数总是数组
    for (var i = 0; i < arr.length; i++) {
        newimages[i] = new Image()
        newimages[i].src = arr[i]
    }
}
preloadimages(['images/back1.jpg','images/back2.jpg','images/back3.jpg','images/front.jpg'])


/**
 * 音乐
 * @return {[type]} [description]
 */
var A = function() {
    var instance = null; //存放不同音轨的一个实例
    return {
        paly: function(url) {
            var audio;
            if (instance) {
                audio = instance;
                audio.src = url;
            } else {
                audio = new Audio(url);
            }
            audio.autoplay = true;
            audio.play();
            //更新音轨
            instance = audio;
        }
    }
}();


/**
 * 分数更新
 * @type {Number}
 */
var integral = function() {
    var $element = $('.banner-right .score');
    var score = 0;
    //更新分数
    var update = function() {
        $element.text(score);
    }
    return {
        add: function() {
            score += 10;
            update();
            A.paly('music/score.mp3');
        },
        reduce: function() {
            score -= 3;
            if (score < 1) {
                score = 0;
            }
            update();
        },
        reset: function() {
            score = 0;
            update();
        },
        get: function() {
            return score;
        }
    }
}();

/**
 * 倒计时处理
 * @return {[type]} [description]
 */
var slidebox = new function() {
    var timer;
    var $dotWrap = $('.dot-wrap');
    var $ems = $dotWrap.find('em')
    var vernier = $ems.length;
    var rate = GameTime / vernier;
    var self = this;
    var timercallabck = null;

    function clear() {
        clearTimeout(timer)
        timer = null;
    }

    function updatedot() {
        var em;
        if (em = $ems[--vernier]) {
            em.style.backgroundColor = '#BCDFF4';
        }
        if (!em) {
            clear()
            overTime(timercallabck);
            return;
        }
    }

    function run() {
        timer = setTimeout(function() {
            updatedot();
            timer && run();
        }, rate)
    }

    self.start = function() {
        run();
    }

    self.destroy = function() {
        clear();
        vernier = $ems.length;
        $ems.css('backgroundColor', '#FFED42')
    }

    self.watch = function(timeout, callback) {
        timercallabck = callback;
    }

}

/**
 * 超时处理
 * @return {[type]} [description]
 */
function overTime(callback) {
    var l = layer.open({
        // style: 'border:none; background-color:#78BA32; color:#fff;',
        className: 'popuo-login',
        btn: ['OK'],
        content: '游戏超时，请重新开始游戏！',
        yes: function(elem) {
            callback();
            resetGames();
            layer.close(l)
            l = null;
        }
    })
}

//游戏次数
var GameTotal = 0;
//内容节点class名
var className = '.content-page-card';

/**
 * 开始游戏
 * @return {[type]} [description]
 */
function createGames() {
    slidebox.start();
    ++GameTotal;
    var cardGames = new CardGames(className)
    cardGames.$watch('success', integral.add)
    cardGames.$watch('fail', integral.reduce)
    cardGames.$watch('complete', function() {
        slidebox.destroy();
        cardGames.destroy();
        selectGame()
    });
    //超时回调
    slidebox.watch('timeout', function() {
        slidebox.destroy();
        cardGames.destroy();
    })
}


/**
 * 选择游戏
 * @return {[type]} [description]
 */
function selectGame() {
    //游戏结束
    if (GameTotal >= GameCount) {
        lotteryPage();
        return;
    }
    //继续游戏
    createGames();
}

Number.prototype.formatTime = function() {
    // 计算
    var h = 0,
        i = 0,
        s = parseInt(this);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
        if (i > 60) {
            h = parseInt(i / 60);
            i = parseInt(i % 60);
        }
    }
    // 补零
    var zero = function(v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(h), zero(i), zero(s)].join(":");
};

/**
 * 尾页
 * @return {[type]} [description]
 */
function lotteryPage() {

    ++playCount;
    $lotteryPage.find("li:lt(" + playCount + ")").removeClass('unachieved').addClass('achieved')

    $lotteryPage.css('visibility', 'visible')
    $contentPage.css('visibility', 'hidden');
    $winningPage.css('visibility', 'hidden');

    A.paly('music/through.mp3');

    //得分处理
    $lotteryIntegral.text(integral.get())
    var time = Math.round((utils.getTime() - startTime) / 60)
    $lotteryTime.text(Number(time).formatTime());


    //限制玩的次数
    if (playCount === AllowPlayCount) {
        $lotteryPlay.off();
    }
}


function visible($element) {
    $element.css('visibility', 'visible');
}

function hidden($element) {
    $element.css('visibility', 'hidden');
}

/**
 * 重设游戏
 * @return {[type]} [description]
 */
function resetGames() {
    integral.reset();
    hidden($contentPage);
    visible($homePage)
}

/**
 * 开始页面
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function startContent(e) {
    createGames('.content-page-card');
    visible($contentPage)
    $homePage.addClass('animated zoomOutUp')
        .on('webkitAnimationEnd animationend', function() {
            $homePage.off();
            hidden($homePage)
            $homePage.removeClass('animated zoomOutUp')
        })
}

/**
 * 开始按钮
 * @return {[type]}    [description]
 */
var $startButton = $('.start-button')
$startButton.on('touchstart', function(e) {
    startTime = utils.getTime();
    startContent(e);
    // setTimeout(function() {
    //     $startButton.removeClass('start-button-hover');
    // }, 1000)
})


/**
 * 再玩一次
 * @param  {[type]} ){                 } [description]
 * @return {[type]}     [description]
 */
$lotteryPlay.on('touchstart mousedown', function() {
    hidden($lotteryPage)
    resetGames();
});


$(".winning-button").on('touchstart mousedown', function() {
    hidden($winningPage);
    hidden($lotteryPage)
    resetGames();
});


/**
 * 点击抽奖
 * @type {[type]}
 */
var $lotteryLottery = $('.lottery-lottery');//抽奖
$lotteryLottery.on('touchstart mousedown',function() {
    hidden($lotteryPage);
    visible($winningPage);
    $winningShow.text("100元礼品卷").addClass('animated flash')
});


/**
 * 测试代码
 * @type {[type]}
 */
var test = false;

if(test){
    GameTime = 300000;
    startTime = utils.getTime();
    setTimeout(function() {
        lotteryPage()
    }, 100)
    visible($contentPage)
    $homePage.addClass('animated zoomOutUp')
        .on('webkitAnimationEnd animationend', function() {
            $homePage.off();
            hidden($homePage)
            $homePage.removeClass('animated zoomOutUp')
        })
}
