/**
 * 游戏页面
 * @param {[type]} argument [description]
 */
function GamePage() {

    var slots = [];
    var slotNum = 3;
    var i = 1;

    var createSlot = function(domName) {
        return new SlotMachine("#" + domName, {
            fade: true, //启动图片滚动模糊感,
            mode: 0,
            active: 0, //首页页码
            delay: 500, //一个周期滚动的时间
            imgUrl: [ //图片的地址，生成对应的列表，按照图片顺序排列
                "./images/slotMachine/roll/1.png",
                "./images/slotMachine/roll/2.png",
                "./images/slotMachine/roll/3.png",
                "./images/slotMachine/roll/slot4.png",
                "./images/slotMachine/roll/slot5.png",
                "./images/slotMachine/roll/slot6.png"
            ]
        })
    }

    for (; i <= slotNum; i++) {
        slots.push(createSlot("slot-roll-" + i))
    }

    var completeCount = function() {
        var count = slotNum;
        return function() {
            --count;
            if (!count) {
                alert(1)
            }
        }
    }();

    $(".slot-gamepage-lottery").on(utils.START_EV, function() {
        $(".slot-gamepage-box-right-circle").css({
            top: '35%',
            transform: 'scale(0.7)',
            transitionTimingFunction: 'linear',
            transitionDuration: '800ms'
        })
        slots[0].run({
            rotate: 6,
            active: 2,
            complete: completeCount
        });
        setTimeout(function() {
            slots[1].run({
                rotate: 6,
                active: 2,
                complete: completeCount
            });
        }, 500);
        setTimeout(function() {
            slots[2].run({
                rotate: 6,
                active: 2,
                complete: completeCount
            });
        }, 1000);
    })
}
