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

	//子元素
	var $contentElements;

	/**
	 * 创建结构
	 * @param  {[type]} imgUrl [description]
	 * @return {[type]}        [description]
	 */
	function createStr(imgUrl){
		var str = '<figure style="width:{0};transform:rotateY({1}deg) translateZ({2});position:absolute;">'
						 +'<img src="{3}" style="width:100%;height:100%;">' 
			   	 +'</figure>';

		return String.format(str,
			"2rem",
			start,
			"1.2rem",
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
		//场景元素
		$carousel.css({
			"transform":"scale(0.3)",
			"-webkit-perspective" : "500px",
			"position"            : "absolute",
			"left"                : "7rem",
			"top"                 : "5rem"
		})
		//容器
		$spinner.css({
			"width"           : "2rem",
			"transform-style" : "preserve-3d",
			"transition"      : "1s"
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
		$contentElements = $(contentStr);
		$spinner.append($contentElements)
	}

	//样式
	initStyle();
	//绘制节点
	render();




// var curr = 0
// 		setTimeout(function() {
// 			this.palyVideo(curr, $contentElements.eq(curr))
// 		}.bind(this), 1000)
		


	//旋转次数
	//随机
	//3-10次
	var carouselCount  = 5 ||Math.floor(Math.random() * 1 + 3);
	var _carouselCount = carouselCount;
	this.run = function(callback) {
		// return
		//开始旋转
		this.initTimer = setInterval(function() {	
			if(carouselCount === 1){
				this.destroy();
				callback();
				//当前图片
				//索引0开始
				// var curr = _carouselCount % 3;
				// setTimeout(function() {
				// 	$contentElements
				// 		.find("img")
				// 		.transition({
				// 			"scale": 1.5
				// 		}, 500, 'linear', function() {
								
				// 		});
				// //	palyVideo(curr, $contentElements.eq(curr))
				// }, 1000)
			}
			//开始
			finishInit()
			--carouselCount;
		}.bind(this), 500);
	}

	/**
	 * 选中图片
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	this.pitch = function(callback) {
		$contentElements
			.find("img")
			.transition({
				"scale": 1.5
			}, 2000, 'linear', callback);
	}

	/**
	 * 销毁
	 * @return {[type]} [description]
	 */
	this.destroy = function(){
		clearInterval(this.initTimer);
		this.initTimer = null;
	}	


	/**
	 * 视频播放
	 * @param  {[type]} index   [description]
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	this.palyVideo = function(index, element) {

		var layer = config.layer;

		var str = '<video width= 100% height=100%">'
						 + '<source src="{2}" type="video/mp4" />'
				  + '</video>';

		var $video = $(
			String.format(
				str,
				layer.width,
				layer.height,
				options.videoUrls[index])
		);

		//播放
		$video.on("loadeddata", function() {
			$video[0].play()
		})

		//停止
		$video.on("ended", function() {
			$video[0].pause()
			$video.remove();
		})

		//插入视频
		$(".page-b").append($video)
	}

}




