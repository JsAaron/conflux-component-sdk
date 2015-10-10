function preloadimages(arr) {
    var newimages = []
    var arr = (typeof arr != "object") ? [arr] : arr //确保参数总是数组
    for (var i = 0; i < arr.length; i++) {
        newimages[i] = new Image()
        newimages[i].src = arr[i]
        newimages[i].onload = function(src){
        	console.log('图片加载完毕: '+ src )
        }(arr[i])
    }
}

 
exports.load = function() {
    preloadimages([
        'images/back1.jpg',
        'images/back2.jpg',
        'images/back3.jpg',
        'images/front.jpg',
        'images/lottery-grade.jpg',
        'images/lottery.jpg',
        'images/winning.jpg'
    ]);
}
