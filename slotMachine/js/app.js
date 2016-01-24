/**
 * 游戏开始
 * @return {[type]} [description]
 */
function slotGames() {

    var $hmoepage    = $(".slot-homepage");
    var $helpContent = $(".help-content");
    var $enter       = $hmoepage.find(".enter");
    var $help        = $hmoepage.find(".help");

    /**
     * 活动介绍
     * @return {[type]}   [description]
     */
    $help.on(utils.END_EV, function() {
        $helpContent.show();
        $(".help-back").on(utils.END_EV, function() {
            $helpContent.hide();
        });
        return false;
    });


    /**
     * 进入游戏                         
     * @return {[type]}   [description]
     */
    $enter.on(utils.END_EV, function(e) {
        //隐藏主页
        $hmoepage.hide();
        //游戏页面
        var gameObj = new GamePage(".slot-gamepage");
        //退出游戏
        gameObj.watch("exit", function() {
            $hmoepage.show();
            gameObj.destroy();
        })
        return false;
    });


    $enter.trigger(utils.END_EV)

}



/**
 * 老虎机主题
 * @return {[type]}   [description]
 */
$(function() {
    slotGames();
})
