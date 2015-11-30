//////////
// 参数设置 //
//////////

var config = {

    //是否维持缩放比
    keepZoomRatio: true,

    //设置容器尺寸
    //否则默认全屏
    //如果设置，需要输入具体的px值
    layer: {
		'width'  : 600,
		'top'    : 0,
		'left'   : 0
    }
}

//根据页面尺寸维持缩放比
if (config.keepZoomRatio) {
    var proportion = 900/1440
    config.layer.height = config.layer.width * proportion
    // console.log(proportion)
/*    // 原始比例
    var proportionY = 900 / 1440
    var screenHeight = config.layer.height;
    //维持正比缩放的高度
    var zooomHeight = screenHeight * proportionY;
    var zooomTop = (screenHeight - zooomHeight) / 2
    //设置正比缩放的数据
	config.layer.height = zooomHeight;
	config.layer.top    = zooomTop;*/
}

 