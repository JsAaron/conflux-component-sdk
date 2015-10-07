(function() {
    var $homePage = $('.home-page');
    var $contentPage = $('.content-page');


    $('.start-button').on('click', function(e) {
        startContent(e)
    })
    startContent()

    function startContent(e) {
        var cardGames = new CardGames('.content-page-card')
        cardGames.$watch('success', function() {

        })
        cardGames.$watch('fail', function() {

        })
        $contentPage.css('visibility', 'visible');
        $homePage.hide()
    }

})()
