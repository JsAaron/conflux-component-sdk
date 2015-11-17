/**
 * 旋转木马
 * @param  {[type]} argument [description]
 * @return {[type]}          [description]
 */
function carousel() {
	
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

	var angle   = 0;
	var numpics = imgUrls.length;
	var degInt  = 360 / numpics;
	var start   = 0;
	var current = 1;


	/**
	 * 创建结构
	 * @param  {[type]} imgUrl [description]
	 * @return {[type]}        [description]
	 */
	var createStr = function() {
		//结构
		var create = function(imgUrl){
			return '<figure style="transform:rotateY(-' + start + 'deg)">'
					 +'<img src="' + imgUrl + '" alt="">' 
				   +'</figure>';			
		}
		//创建内容
		var contentStr = '';
		$.each(imgUrls,function(index,url){
			contentStr += create(url);
			start = start + degInt;
		})
		$spinner.append($(contentStr))
	}


	createStr();
	
	setInterval(function() {
		angle = angle - degInt;
		current = current - 1;
		if (current == 0) {
			current = numpics;
		}
		$spinner.css("transform", "rotateY(" + angle + "deg)")
	}, 1000)



}


