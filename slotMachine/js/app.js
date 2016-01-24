/**
 * 老虎机主题
 * @param  {[type]} ) {                   GamePage();} [description]
 * @return {[type]}   [description]
 */
$(function() {

    var $hmoepage    = $(".slot-homepage")
    var $enter       = $hmoepage.find(".enter");
    var $help        = $hmoepage.find(".help");
    var $helpContent = $(".help-content");
    var gameObj      = null;

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
     * 游戏配置
     * @type {Object}
     */
    var gameConfig = {

    }


    /**
     * 进入游戏                         
     * @return {[type]}   [description]
     */
    $enter.on(utils.END_EV, function(e) {
        //隐藏主页
        $hmoepage.hide();
        //新建
        if (!gameObj) {
            gameObj = new GamePage(".slot-gamepage");
            //退出游戏
            gameObj.watch("exit", function() {
                $hmoepage.show();
                gameObj.resetGame();
            })
        } else {
            //对象存在
            gameObj.show()
        }
        return false;
    });


    // $enter.trigger(utils.END_EV)

})
