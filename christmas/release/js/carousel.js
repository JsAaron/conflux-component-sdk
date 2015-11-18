/**
 * 3d旋转木马
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function Carousel() {

	var imgUrls = [
		"images/carousel/1.jpg",
		"images/carousel/2.jpg",
		"images/carousel/3.jpg",
		"images/carousel/4.jpg",
		"images/carousel/5.jpg",
		"images/carousel/6.jpg",
		"images/carousel/7.jpg"
	]

	var $spinner = $("#spinner");
	var self    = this;
	var angle   = 0;
	//图片数
	var numpics = imgUrls.length;
	//角度
	var degInt  = 360 / numpics;
	var start   = 0;
	var current = 1;

	//角度
	this.rotation = Math.PI / 2;
	this.farScale = 0.5;

	/**
	 * 创建结构
	 * @param  {[type]} imgUrl [description]
	 * @return {[type]}        [description]
	 */
	var createStr = function(imgUrl){
		return '<figure style="transform:rotateY(-' + start + 'deg)">'
				 +'<img src="' + imgUrl + '" alt="">' 
			   +'</figure>';			
	}

 	/**
 	 * 绘制页面节点
 	 * @return {[type]} [description]
 	 */
	this.render = function() {
		//创建内容
		var contentStr = '';
		$.each(imgUrls, function(index, url) {
			contentStr += createStr(url);
			start = start + degInt;
		})
		this.$contentElements = $(contentStr);
		$spinner.append(this.$contentElements)
	}

	/**
	 * 
	 * 初始化开始
	 * @return {[type]} [description]
	 */
	this.finishInit = function() {
		angle = angle - degInt;
		current = current - 1;
		if (current == 0) {
			current = numpics;
		}
		$spinner.css("transform", "rotateY(" + angle + "deg)")
	}

	/**
	 * 销毁
	 * @return {[type]} [description]
	 */
	this.destroy = function(){
		clearInterval(this.initTimer);
		this.initTimer = null;
	}	

	//绘制节点
	this.render();


    this.rotateItem = function(index,element, rotation) {
        var sin = Math.sin(rotation);
        var farScale = this.farScale;
        var scale = farScale + ((1 - farScale) * (sin + 1) * 0.5);
		var style = element.style;
		style.zIndex = "" + (scale * 100) | 0;
		style[support.transform] = "rotateY(-" + (index*degInt) + "deg) scale(" + scale + ")"
    }

	/**
	 * 更新缩放
	 * @return {[type]} [description]
	 */
	this.update = function() {
		var count = this.$contentElements.length;
		var spacing = 2 * Math.PI / count;
		var radians = this.rotation;
		for (var i = 0; i < count; i++) {
			this.rotateItem(i,this.$contentElements[i], radians);
			radians += spacing;
		}
	}

	this.initTimer = setInterval(function() {
		// this.update();
		//开始
		// this.finishInit()
		// this.destroy()
	}.bind(this), 1000);
}




