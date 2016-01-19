$(function() {
    'use strict';



    var slot = new SlotMachine("#slot-roll-a", {
        active: 1, 
        delay: 500,
        imgUrl: [
            "./images/slotMachine/roll/slot1.png",
            "./images/slotMachine/roll/slot2.png",
            "./images/slotMachine/roll/slot3.png",
            "./images/slotMachine/roll/slot4.png",
            "./images/slotMachine/roll/slot5.png",
            "./images/slotMachine/roll/slot6.png"
        ]
    })


    $(".slot-gamepage-button").click(function() {
        slot.run({
            rotate: 3,
            active: 3,
            complete: function() {

            }
        });
    })

})
