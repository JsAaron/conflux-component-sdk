(function() {
    var $homePage = $('.home-page');
    var $contentPage = $('.content-page');

    var $element = $('.banner-right')

    //目前分数
    var score = 0;
    //更新分数
    var update = function() {
        $element.text(score);
    }
    var add = function() {
        score += 10;
        update();
    }
    var reduce = function() {
        score -= 3;
        if (score < 1) {
            score = 0;
        }
        update();
    }
    update();

    $('.start-button').on('click', function(e) {
        startContent(e)
    })
    startContent()


    function createGames(className) {
        var cardGames = new CardGames(className)
        cardGames.$watch('success', add)
        cardGames.$watch('fail', reduce)
        cardGames.$watch('complete', function() {
            cardGames.destroy();
            createGames(className);
        })
    }


    function startContent(e) {
        createGames('.content-page-card');
        $contentPage.css('visibility', 'visible');
        $homePage.hide()
    }

})()
