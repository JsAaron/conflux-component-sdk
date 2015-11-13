/**
 * 第一副场景页面
 * http://louisremi.github.com/jquery.transform.js/index.html
 */

function PageA() {

	this.$boy = $('.chs-boy');

    this.$boy.animate({
        'top': '10px',
        transform: 'scale(0.6)'
    }, 3200, function() {
        $(this).animate({
            'z-index': 5
        }, 0, function() {
            $(this).animate({
                'top': '90px',
                transform: 'scale(1)'
            }, 2000);
        });
    });

}
