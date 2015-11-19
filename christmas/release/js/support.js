//================================================
//格式化字符串
var slice = Array.prototype.slice

function toArray(a, i, j) {
    return slice.call(a, i || 0, j || a.length);
}
/**
 * 返回true,如果传递的值不是未定义。
 * @param {Mixed}
 * @return {Boolean}
 */
function isDefined(v) {
    return typeof v !== 'undefined';
}

/**
 * 拷贝对象，跳过已存在的
 * @param  {[type]} o [接受方对象]
 * @param  {[type]} c [源对象]
 * @return {[type]}   [description]
 */
function applyIf(o, c) {
    if (o) {
        for (var p in c) {
            //跳过已存在
            if (!isDefined(o[p])) {
                o[p] = c[p];
            }
        }
    }
    return o;
}
/**
 * @class String
 * 格式化字符串
 */
applyIf(String, {
    format: function(format) {
        var args = toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function(m, i) {
            return args[i];
        });
    }
});



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



