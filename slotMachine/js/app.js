$(function() {
    'use strict';


    var element = $(".slot-gamepage-roll")

    var slot = new SlotMachine(element)


    $(".slot-gamepage-button").click(function() {
        console.log(slot)
        // slot.run();
    })

})
