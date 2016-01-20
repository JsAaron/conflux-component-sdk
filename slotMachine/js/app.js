$(function() {
    'use strict';



    var slot1 = new SlotMachine("#slot-roll-a", {
        fade:true, //启动图片滚动模糊感,
        active: 0,  //首页页码
        delay: 800, //一个周期滚动的时间
        imgUrl: [  //图片的地址，生成对应的列表，按照图片顺序排列
            "./images/slotMachine/roll/slot1.png",
            "./images/slotMachine/roll/slot2.png",
            "./images/slotMachine/roll/slot3.png",
            "./images/slotMachine/roll/slot4.png",
            "./images/slotMachine/roll/slot5.png",
            "./images/slotMachine/roll/slot6.png"
        ]
    })


    var slot2 = new SlotMachine("#slot-roll-b", {
        fade:true, //启动图片滚动模糊感,
        active: 0,  //首页页码
        delay: 800, //一个周期滚动的时间
        imgUrl: [  //图片的地址，生成对应的列表，按照图片顺序排列
            "./images/slotMachine/roll/slot1.png",
            "./images/slotMachine/roll/slot2.png",
            "./images/slotMachine/roll/slot3.png",
            "./images/slotMachine/roll/slot4.png",
            "./images/slotMachine/roll/slot5.png",
            "./images/slotMachine/roll/slot6.png"
        ]
    })


    var slot3 = new SlotMachine("#slot-roll-c", {
        fade:true, //启动图片滚动模糊感,
        active: 0,  //首页页码
        delay: 800, //一个周期滚动的时间
        imgUrl: [  //图片的地址，生成对应的列表，按照图片顺序排列
            "./images/slotMachine/roll/slot1.png",
            "./images/slotMachine/roll/slot2.png",
            "./images/slotMachine/roll/slot3.png",
            "./images/slotMachine/roll/slot4.png",
            "./images/slotMachine/roll/slot5.png",
            "./images/slotMachine/roll/slot6.png"
        ]
    })


    $(".slot-gamepage-lottery").click(function() {
        slot1.run({
            rotate: 5,
            active: 2,
            complete: function() {

            }
        });
    })

})
