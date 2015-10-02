/**
 * 冒泡事件
 */

var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

exports._initEvent = function() {
    this.$container.on('mousedown touchstart', function(event) {
        event.preventDefault();
        this.triggerClick(event)
    }.bind(this)).on(animationend, function(event) {
        event.preventDefault();
        this.animCallback(event);
    }.bind(this));
}
