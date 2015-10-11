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

 
exports.load = function(config,loadimages) {
    var images = [];
    var image;
    for(var k in config){
        for(var name in config[k]){
            if(name==='images'){
                image = config[k][name]
                images = images.concat(image.back)
            }
        }
    }

    images = images.concat(loadimages)

    preloadimages(images);
}
