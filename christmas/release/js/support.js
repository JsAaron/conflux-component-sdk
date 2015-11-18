/**
 * css3 游览器支持
 * @type {Object}
 */
var support = {
	transform: (function() {
		var vendors = ['webkit', 'moz', 'ms'];
		var style = document.createElement("div").style;
		var trans = 'transform' in style ? 'transform' : undefined;

		for (var i = 0, count = vendors.length; i < count; i++) {
			var prop = vendors[i] + 'Transform';
			if (prop in style) {
				trans = prop;
				break;
			}
		}
		return trans;
	})()
}