/**
 * 3d旋转木马
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function Carousel(carousel,options) {
	//图片
	var imgUrls = options.imgUrls;
	//场景元素
	var $carousel = carousel;
	//容器元素
	var $spinner =  carousel.find("#spinner");
	var angle   = 0;
	//图片数
	var numpics = imgUrls.length;
	//角度
	var rotate  = 360 / numpics;
	var start   = 0;
	var current = 1;

	/**
	 * 创建结构
	 * @param  {[type]} imgUrl [description]
	 * @return {[type]}        [description]
	 */
	function createStr(imgUrl){
		var str = '<figure style="width:{0};transform:rotateY({1}deg) translateZ({2});overflow:hidden;position:absolute;">'
						 +'<img src="{3}" style="width:100%;height:100%;">' 
			   	 +'</figure>';

		return String.format(str,
			"2rem",
			start,
			"1.9rem",
			imgUrl
		)
	}

	/**
	 * 
	 * 初始化开始
	 * @return {[type]} [description]
	 */
	 function finishInit() {
		angle = angle - rotate;
		current = current - 1;
		if (current == 0) {
			current = numpics;
		}
		$spinner.css("transform", "rotateY(" + angle + "deg)")
	}

	/**
	 * 初始化样式
	 * @return {[type]} [description]
	 */
	function initStyle(){
		//场景
		$carousel.css({
			"-webkit-perspective" : "500px",
			"position"            : "absolute",
			"left"                : "5rem",
			"top"                 : "5rem"
		})
		//容器
		$spinner.css({
			"width"           : "2rem",
			"transform-style" : "preserve-3d",
			"transition"      : "2s"
		})
	}

 	/**
 	 * 绘制页面节点
 	 * @return {[type]} [description]
 	 */
	function render() {
		//创建内容
		var contentStr = '';
		$.each(imgUrls, function(index, url) {
			contentStr += createStr(url);
			start = start + rotate;
		})
		this.$contentElements = $(contentStr);
		$spinner.append(this.$contentElements)
	}

	//样式
	initStyle();
	//绘制节点
	render();

	this.run = function() {
		//开始旋转
		this.initTimer = setInterval(function() {
			//开始
			finishInit()
		}.bind(this), 1000);
	}

	/**
	 * 销毁
	 * @return {[type]} [description]
	 */
	this.destroy = function(){
		clearInterval(this.initTimer);
		this.initTimer = null;
	}	

}




